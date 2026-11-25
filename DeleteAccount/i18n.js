// Translations for the delete-account page (English, Portuguese, Spanish).
// Loaded as a classic script before app.js; exposes window.i18n.
(function () {
  const translations = {
    en: {
      htmlLang: "en",
      pageTitle: "Delete account | Villa Games Group",
      metaDescription: "Securely request deletion of your Villa Games Group account.",
      accountSupport: "ACCOUNT SUPPORT",
      accountDeletion: "ACCOUNT DELETION",
      complete: "COMPLETE",
      signInTitle: "Sign in to continue",
      signInDescription: "To protect your account, please sign in before requesting deletion.",
      setupNotice: "Firebase is not configured yet. Add your web app settings in firebase-config.js.",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Your password",
      continueEmail: "Continue with email ",
      signingIn: "Signing in… ",
      or: "OR",
      continueGoogle: "Continue with Google",
      deleteTitle: "Delete your account?",
      signedInAs: "Signed in as",
      permanentNotice: ". This action is permanent and cannot be undone.",
      beforeContinue: "Before you continue",
      beforeContinueText: "Your deletion request will be sent to Villa Games Group. You’ll be signed out after it’s accepted.",
      typeLabel: "Type",
      toConfirm: "to confirm",
      confirmWord: "DELETE",
      deleteButton: "Delete my account ",
      sendingRequest: "Sending request… ",
      cancelSignOut: "Cancel and sign out",
      successTitle: "Request received.",
      successText: "Villa Games Group accepted your account deletion request. You can close this page.",
      footerTagline: "YOUR ACCOUNT, YOUR CONTROL",
      yourAccount: "your account",
      languageLabel: "Language",

      errFileProtocol: "Open this page through a local web server. Firebase cannot run when the HTML file is opened directly.",
      errSignInLoad: "The sign-in service could not load. Check your connection and refresh the page.",
      errSessionPrepare: "The secure sign-in session could not be prepared. Refresh and try again.",
      errFirebaseStart: "Firebase could not start. Check the web app configuration.",
      errInvalidCredential: "The email or password is incorrect.",
      errDifferentCredential: "This email uses a different sign-in method. Try the other option.",
      errPopupClosed: "Google sign-in was cancelled.",
      errPopupBlocked: "Allow pop-ups for this website, then try Google sign-in again.",
      errOperationNotAllowed: "This sign-in method is not enabled in Firebase.",
      errUnauthorizedDomain: "This domain is not authorized in Firebase Authentication.",
      errTooManyRequests: "Too many attempts. Please wait and try again.",
      errNetwork: "Could not connect. Please check your internet connection.",
      errSignInFailed: "Sign-in failed. Please try again.",
      errSessionEnded: "Your session ended. Please sign in again.",
      errTypeExactly: "Type {word} exactly to confirm.",
      errSessionRejected: "Your session was not accepted. Please sign out and sign in again.",
      errDeleteFailed: "The deletion request could not be completed. Please try again later.",
      errCors: "The browser could not call the deletion API. Check the API’s CORS settings for this website and try again.",
      errDeleteGeneric: "The deletion request failed. Please try again.",
      errSignOut: "Could not sign out. Please try again."
    },

    pt: {
      htmlLang: "pt-BR",
      pageTitle: "Excluir conta | Villa Games Group",
      metaDescription: "Solicite com segurança a exclusão da sua conta Villa Games Group.",
      accountSupport: "SUPORTE DA CONTA",
      accountDeletion: "EXCLUSÃO DE CONTA",
      complete: "CONCLUÍDO",
      signInTitle: "Entre para continuar",
      signInDescription: "Para proteger sua conta, entre antes de solicitar a exclusão.",
      setupNotice: "O Firebase ainda não foi configurado. Adicione as configurações do seu app web em firebase-config.js.",
      emailLabel: "Endereço de e-mail",
      emailPlaceholder: "voce@exemplo.com",
      passwordLabel: "Senha",
      passwordPlaceholder: "Sua senha",
      continueEmail: "Continuar com e-mail ",
      signingIn: "Entrando… ",
      or: "OU",
      continueGoogle: "Continuar com o Google",
      deleteTitle: "Excluir sua conta?",
      signedInAs: "Conectado como",
      permanentNotice: ". Esta ação é permanente e não pode ser desfeita.",
      beforeContinue: "Antes de continuar",
      beforeContinueText: "Sua solicitação de exclusão será enviada à Villa Games Group. Você será desconectado depois que ela for aceita.",
      typeLabel: "Digite",
      toConfirm: "para confirmar",
      confirmWord: "EXCLUIR",
      deleteButton: "Excluir minha conta ",
      sendingRequest: "Enviando solicitação… ",
      cancelSignOut: "Cancelar e sair",
      successTitle: "Solicitação recebida.",
      successText: "A Villa Games Group aceitou sua solicitação de exclusão de conta. Você pode fechar esta página.",
      footerTagline: "SUA CONTA, SEU CONTROLE",
      yourAccount: "sua conta",
      languageLabel: "Idioma",

      errFileProtocol: "Abra esta página por um servidor web local. O Firebase não funciona quando o arquivo HTML é aberto diretamente.",
      errSignInLoad: "Não foi possível carregar o serviço de login. Verifique sua conexão e atualize a página.",
      errSessionPrepare: "Não foi possível preparar a sessão segura de login. Atualize a página e tente novamente.",
      errFirebaseStart: "Não foi possível iniciar o Firebase. Verifique a configuração do app web.",
      errInvalidCredential: "O e-mail ou a senha estão incorretos.",
      errDifferentCredential: "Este e-mail usa outro método de login. Tente a outra opção.",
      errPopupClosed: "O login com o Google foi cancelado.",
      errPopupBlocked: "Permita pop-ups neste site e tente entrar com o Google novamente.",
      errOperationNotAllowed: "Este método de login não está ativado no Firebase.",
      errUnauthorizedDomain: "Este domínio não está autorizado no Firebase Authentication.",
      errTooManyRequests: "Muitas tentativas. Aguarde um pouco e tente novamente.",
      errNetwork: "Não foi possível conectar. Verifique sua conexão com a internet.",
      errSignInFailed: "Falha ao entrar. Tente novamente.",
      errSessionEnded: "Sua sessão terminou. Entre novamente.",
      errTypeExactly: "Digite {word} exatamente para confirmar.",
      errSessionRejected: "Sua sessão não foi aceita. Saia e entre novamente.",
      errDeleteFailed: "Não foi possível concluir a solicitação de exclusão. Tente novamente mais tarde.",
      errCors: "O navegador não conseguiu chamar a API de exclusão. Verifique as configurações de CORS da API para este site e tente novamente.",
      errDeleteGeneric: "A solicitação de exclusão falhou. Tente novamente.",
      errSignOut: "Não foi possível sair. Tente novamente."
    },

    es: {
      htmlLang: "es",
      pageTitle: "Eliminar cuenta | Villa Games Group",
      metaDescription: "Solicita de forma segura la eliminación de tu cuenta de Villa Games Group.",
      accountSupport: "SOPORTE DE CUENTA",
      accountDeletion: "ELIMINACIÓN DE CUENTA",
      complete: "COMPLETADO",
      signInTitle: "Inicia sesión para continuar",
      signInDescription: "Para proteger tu cuenta, inicia sesión antes de solicitar la eliminación.",
      setupNotice: "Firebase aún no está configurado. Agrega los ajustes de tu app web en firebase-config.js.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Tu contraseña",
      continueEmail: "Continuar con correo ",
      signingIn: "Iniciando sesión… ",
      or: "O",
      continueGoogle: "Continuar con Google",
      deleteTitle: "¿Eliminar tu cuenta?",
      signedInAs: "Sesión iniciada como",
      permanentNotice: ". Esta acción es permanente y no se puede deshacer.",
      beforeContinue: "Antes de continuar",
      beforeContinueText: "Tu solicitud de eliminación se enviará a Villa Games Group. Se cerrará tu sesión cuando sea aceptada.",
      typeLabel: "Escribe",
      toConfirm: "para confirmar",
      confirmWord: "ELIMINAR",
      deleteButton: "Eliminar mi cuenta ",
      sendingRequest: "Enviando solicitud… ",
      cancelSignOut: "Cancelar y cerrar sesión",
      successTitle: "Solicitud recibida.",
      successText: "Villa Games Group aceptó tu solicitud de eliminación de cuenta. Puedes cerrar esta página.",
      footerTagline: "TU CUENTA, TU CONTROL",
      yourAccount: "tu cuenta",
      languageLabel: "Idioma",

      errFileProtocol: "Abre esta página mediante un servidor web local. Firebase no funciona si el archivo HTML se abre directamente.",
      errSignInLoad: "No se pudo cargar el servicio de inicio de sesión. Revisa tu conexión y actualiza la página.",
      errSessionPrepare: "No se pudo preparar la sesión segura de inicio de sesión. Actualiza la página e inténtalo de nuevo.",
      errFirebaseStart: "No se pudo iniciar Firebase. Revisa la configuración de la app web.",
      errInvalidCredential: "El correo o la contraseña son incorrectos.",
      errDifferentCredential: "Este correo usa otro método de inicio de sesión. Prueba la otra opción.",
      errPopupClosed: "Se canceló el inicio de sesión con Google.",
      errPopupBlocked: "Permite las ventanas emergentes en este sitio e inténtalo de nuevo con Google.",
      errOperationNotAllowed: "Este método de inicio de sesión no está habilitado en Firebase.",
      errUnauthorizedDomain: "Este dominio no está autorizado en Firebase Authentication.",
      errTooManyRequests: "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
      errNetwork: "No se pudo conectar. Revisa tu conexión a internet.",
      errSignInFailed: "Error al iniciar sesión. Inténtalo de nuevo.",
      errSessionEnded: "Tu sesión terminó. Inicia sesión de nuevo.",
      errTypeExactly: "Escribe {word} exactamente para confirmar.",
      errSessionRejected: "Tu sesión no fue aceptada. Cierra sesión e inicia sesión de nuevo.",
      errDeleteFailed: "No se pudo completar la solicitud de eliminación. Inténtalo más tarde.",
      errCors: "El navegador no pudo llamar a la API de eliminación. Revisa la configuración de CORS de la API para este sitio e inténtalo de nuevo.",
      errDeleteGeneric: "La solicitud de eliminación falló. Inténtalo de nuevo.",
      errSignOut: "No se pudo cerrar la sesión. Inténtalo de nuevo."
    }
  };

  const STORAGE_KEY = "swb-delete-language";
  const listeners = [];

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch { /* storage may be unavailable */ }
    const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const candidate of candidates) {
      const base = String(candidate || "").toLowerCase().split("-")[0];
      if (translations[base]) return base;
    }
    return "en";
  }

  let current = detect();

  function t(key, params) {
    let text = (translations[current] && translations[current][key]) ?? translations.en[key] ?? key;
    if (params) {
      for (const name of Object.keys(params)) text = text.split("{" + name + "}").join(params[name]);
    }
    return text;
  }

  function apply() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("pageTitle");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("metaDescription"));

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });

    const select = document.getElementById("language-select");
    if (select) select.value = current;

    listeners.forEach((listener) => listener(current));
  }

  function setLanguage(language) {
    if (!translations[language]) return;
    current = language;
    try { localStorage.setItem(STORAGE_KEY, language); } catch { /* ignore */ }
    apply();
  }

  window.i18n = {
    t,
    apply,
    setLanguage,
    get language() { return current; },
    onChange(listener) { listeners.push(listener); }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("language-select");
    if (select) select.addEventListener("change", () => setLanguage(select.value));
    apply();
  });
})();
