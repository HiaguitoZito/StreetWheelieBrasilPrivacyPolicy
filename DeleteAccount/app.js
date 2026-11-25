import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const DELETE_URL = "https://swb-usermanager.villagamesgroup.com/user/delete";
const loginView = document.getElementById("login-view");
const deleteView = document.getElementById("delete-view");
const successView = document.getElementById("success-view");
const loginForm = document.getElementById("login-form");
const deleteForm = document.getElementById("delete-form");
const loginButton = document.getElementById("login-button");
const googleButton = document.getElementById("google-button");
const deleteButton = document.getElementById("delete-button");
const signOutButton = document.getElementById("sign-out-button");
const loginError = document.getElementById("login-error");
const deleteError = document.getElementById("delete-error");
const accountEmail = document.getElementById("account-email");
const t = (key, params) => window.i18n.t(key, params);
let loginBusy = false;
let deleteBusy = false;
let signedInEmail = "";

document.getElementById("year").textContent = new Date().getFullYear();

function showView(view) {
  loginView.hidden = view !== "login";
  deleteView.hidden = view !== "delete";
  successView.hidden = view !== "success";
}

// Errors are stored as translation keys so they can be re-translated when the language changes.
function renderError(element) {
  const params = element.dataset.errorParams ? JSON.parse(element.dataset.errorParams) : undefined;
  element.textContent = t(element.dataset.errorKey, params);
}

function showError(element, key, params) {
  element.dataset.errorKey = key;
  element.dataset.errorParams = params ? JSON.stringify(params) : "";
  renderError(element);
  element.hidden = false;
}

function clearError(element) {
  delete element.dataset.errorKey;
  delete element.dataset.errorParams;
  element.textContent = "";
  element.hidden = true;
}

function renderDynamicText() {
  accountEmail.textContent = signedInEmail || t("yourAccount");
  loginButton.firstChild.textContent = t(loginBusy ? "signingIn" : "continueEmail");
  deleteButton.firstChild.textContent = t(deleteBusy ? "sendingRequest" : "deleteButton");
  for (const element of [loginError, deleteError]) {
    if (element.dataset.errorKey) renderError(element);
  }
}

window.i18n.onChange(renderDynamicText);

function authErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "errInvalidCredential";
    case "auth/account-exists-with-different-credential":
      return "errDifferentCredential";
    case "auth/popup-closed-by-user":
      return "errPopupClosed";
    case "auth/popup-blocked":
      return "errPopupBlocked";
    case "auth/operation-not-allowed":
      return "errOperationNotAllowed";
    case "auth/unauthorized-domain":
      return "errUnauthorizedDomain";
    case "auth/too-many-requests":
      return "errTooManyRequests";
    case "auth/network-request-failed":
      return "errNetwork";
    default:
      return "errSignInFailed";
  }
}

function setLoginBusy(busy) {
  loginBusy = busy;
  loginButton.disabled = busy;
  googleButton.disabled = busy;
  loginButton.firstChild.textContent = t(busy ? "signingIn" : "continueEmail");
}

async function start() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    document.getElementById("setup-notice").hidden = false;
    return;
  }

  try {
    const auth = getAuth(initializeApp(firebaseConfig));
    let completed = false;
    let deleting = false;
    let sessionPrepared = false;

    onAuthStateChanged(auth, (user) => {
      if (!sessionPrepared || completed || deleting) return;
      clearError(loginError);
      clearError(deleteError);
      loginForm.reset();
      deleteForm.reset();
      if (user) {
        signedInEmail = user.email || "";
        accountEmail.textContent = signedInEmail || t("yourAccount");
        showView("delete");
      } else {
        showView("login");
      }
    });

    // Prepare a short-lived session in the background. Event handlers are
    // installed immediately so a slow initialization can never leave dead buttons.
    const sessionReady = (async () => {
      try {
        await setPersistence(auth, inMemoryPersistence);
        await signOut(auth);
      } catch (error) {
        showError(loginError, "errSessionPrepare");
      } finally {
        sessionPrepared = true;
        document.documentElement.dataset.firebaseReady = "true";
        showView("login");
      }
    })();

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearError(loginError);
      setLoginBusy(true);
      try {
        await sessionReady;
        await signInWithEmailAndPassword(auth, loginForm.elements.email.value.trim(), loginForm.elements.password.value);
      } catch (error) {
        showError(loginError, authErrorMessage(error));
      } finally {
        setLoginBusy(false);
      }
    });

    googleButton.addEventListener("click", async () => {
      clearError(loginError);
      setLoginBusy(true);
      try {
        await sessionReady;
        await signInWithPopup(auth, new GoogleAuthProvider());
      } catch (error) {
        showError(loginError, authErrorMessage(error));
      } finally {
        setLoginBusy(false);
      }
    });

    deleteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearError(deleteError);
      const user = auth.currentUser;
      if (!user) {
        showError(deleteError, "errSessionEnded");
        return;
      }
      const confirmation = deleteForm.elements.confirmation.value.trim();
      const confirmWord = t("confirmWord");
      if (confirmation !== confirmWord && confirmation !== "DELETE") {
        showError(deleteError, "errTypeExactly", { word: confirmWord });
        return;
      }

      deleteButton.disabled = true;
      signOutButton.disabled = true;
      deleteBusy = true;
      deleteButton.firstChild.textContent = t("sendingRequest");
      deleting = true;
      try {
        const token = await getIdToken(user, true);
        const response = await fetch(DELETE_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw Object.assign(new Error("Session rejected"), { i18nKey: "errSessionRejected" });
          }
          throw Object.assign(new Error("Deletion failed"), { i18nKey: "errDeleteFailed" });
        }

        completed = true;
        try { await signOut(auth); } catch { /* The request was already accepted. */ }
        deleteForm.reset();
        showView("success");
      } catch (error) {
        console.error("Account deletion request failed:", error);
        showError(deleteError, error instanceof TypeError
          ? "errCors"
          : error.i18nKey || "errDeleteGeneric");
      } finally {
        deleting = false;
        deleteBusy = false;
        deleteButton.disabled = false;
        signOutButton.disabled = false;
        deleteButton.firstChild.textContent = t("deleteButton");
      }
    });

    signOutButton.addEventListener("click", async () => {
      signOutButton.disabled = true;
      try {
        await signOut(auth);
      } catch {
        showError(deleteError, "errSignOut");
      } finally {
        signOutButton.disabled = false;
      }
    });
  } catch (error) {
    document.documentElement.dataset.firebaseReady = "true";
    setLoginBusy(false);
    showError(loginError, "errFirebaseStart");
  }
}

start();
