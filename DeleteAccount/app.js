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

const DELETE_URL = "https://api.villagamesgroup.com/user/delete";
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

document.getElementById("year").textContent = new Date().getFullYear();

function showView(view) {
  loginView.hidden = view !== "login";
  deleteView.hidden = view !== "delete";
  successView.hidden = view !== "success";
}

function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

function clearError(element) {
  element.textContent = "";
  element.hidden = true;
}

function authErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password is incorrect.";
    case "auth/account-exists-with-different-credential":
      return "This email uses a different sign-in method. Try the other option.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Allow pop-ups for this website, then try Google sign-in again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in Firebase.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Authentication.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    case "auth/network-request-failed":
      return "Could not connect. Please check your internet connection.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

function setLoginBusy(busy) {
  loginButton.disabled = busy;
  googleButton.disabled = busy;
  loginButton.firstChild.textContent = busy ? "Signing in… " : "Continue with email ";
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
        document.getElementById("account-email").textContent = user.email || "your account";
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
        showError(loginError, "The secure sign-in session could not be prepared. Refresh and try again.");
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
        showError(deleteError, "Your session ended. Please sign in again.");
        return;
      }
      if (deleteForm.elements.confirmation.value.trim() !== "DELETE") {
        showError(deleteError, "Type DELETE exactly to confirm.");
        return;
      }

      deleteButton.disabled = true;
      signOutButton.disabled = true;
      deleteButton.firstChild.textContent = "Sending request… ";
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
            throw new Error("Your session was not accepted. Please sign out and sign in again.");
          }
          throw new Error("The deletion request could not be completed. Please try again later.");
        }

        completed = true;
        try { await signOut(auth); } catch { /* The request was already accepted. */ }
        deleteForm.reset();
        showView("success");
      } catch (error) {
        console.error("Account deletion request failed:", error);
        showError(deleteError, error instanceof TypeError
          ? "The browser could not call the deletion API. Check the API’s CORS settings for this website and try again."
          : error.message || "The deletion request failed. Please try again.");
      } finally {
        deleting = false;
        deleteButton.disabled = false;
        signOutButton.disabled = false;
        deleteButton.firstChild.textContent = "Delete my account ";
      }
    });

    signOutButton.addEventListener("click", async () => {
      signOutButton.disabled = true;
      try {
        await signOut(auth);
      } catch {
        showError(deleteError, "Could not sign out. Please try again.");
      } finally {
        signOutButton.disabled = false;
      }
    });
  } catch (error) {
    document.documentElement.dataset.firebaseReady = "true";
    setLoginBusy(false);
    showError(loginError, "Firebase could not start. Check the web app configuration.");
  }
}

start();
