import {
  loginFunction, accountGoogle, authPersistanceFunction,
  googlePersistanceFunction,
} from '../lib/auth';
// import LogoinversoPeque from '../images/LogoinversoPeque.png';

export const renderLogin = (navigateTo) => {
  const container = document.createElement('div');
  container.classList.add('login-page');

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('section-entry');

  const logo = document.createElement('img');
  // logo.setAttribute('src', LogoinversoPeque);
  logo.setAttribute('alt', 'Logo mochileiros');
  logo.setAttribute('class', 'logo-invertido');

  const h1 = document.createElement('h1');
  h1.textContent = 'Mochileiros';

  const labelUsername = document.createElement('label');
  labelUsername.setAttribute('for', 'user');

  const inputUsername = document.createElement('input');
  inputUsername.setAttribute('type', 'email');
  inputUsername.setAttribute('placeholder', 'Ingresa tu correo eléctronico');
  inputUsername.classList.add('inputs');
  inputUsername.setAttribute('id', 'inputUsername');

  const labelPassword = document.createElement('label');
  labelPassword.setAttribute('for', 'password');

  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', 'Ingresa tu contraseña');
  inputPassword.classList.add('inputs');
  inputPassword.setAttribute('id', 'inputPassword');

  const span = document.createElement('span');
  span.classList.add('span-login');
  span.style.display = 'none';

  const btnLogin = document.createElement('button');
  btnLogin.setAttribute('id', 'login');
  btnLogin.textContent = 'Ingresar';

  const btnCreateAccount = document.createElement('button');
  btnCreateAccount.setAttribute('id', 'account');
  btnCreateAccount.textContent = 'Crear cuenta';

  const divGoogle = document.createElement('div');
  divGoogle.setAttribute('class', 'signin-google');

  const googleLabel = document.createElement('label');
  googleLabel.setAttribute('for', 'signin-google');
  googleLabel.textContent = 'Continuar con:';

  const btnGoogle = document.createElement('button');
  btnGoogle.setAttribute('id', 'login-google');

  divGoogle.append(googleLabel, btnGoogle);
  sectionContainer.append(
    logo,
    h1,
    labelUsername,
    labelPassword,
    inputUsername,
    inputPassword,
    span,
    btnLogin,
    btnCreateAccount,
    divGoogle,
  );
  container.appendChild(sectionContainer);

  const footer = document.createElement('footer');
  const footerText = document.createElement('p');
  footerText.textContent = 'Danae Rodríguez, Penélope Logos y Sylvia Gómez ©2023';
  footer.appendChild(footerText);
  container.appendChild(footer);

  // ---------------------------------DOM calls-----------------------------------
  const buttonLogin = container.querySelector('#login');
  const btnLoginGoogle = container.querySelector('#login-google');
  const inputLoginEmail = container.querySelector('#inputUsername');
  const inputLoginPassword = container.querySelector('#inputPassword');
  const buttnCreateAccount = container.querySelector('#account');
  const errorSpan = container.querySelector('.span-login');

  // ---------------------------------addEventListeners---------------------------------

  buttnCreateAccount.addEventListener('click', () => {
    navigateTo('/signin');
  });

  // Login email and password
  buttonLogin.addEventListener('click', () => {
    const email = inputLoginEmail.value;
    const password = inputLoginPassword.value;
    loginFunction(email, password)
      .then(() => {
        authPersistanceFunction();
        navigateTo('/feed');
      })
      .catch((errorCode) => {
        errorSpan.style.display = 'block';
        if (errorCode === 'auth/invalid-email') {
          errorSpan.innerHTML = 'Correo invalido';
        } else if (errorCode === 'auth/invalid-login-credentials') {
          errorSpan.innerHTML = 'Datos incorrectos, revisa tu correo y contraseña';
        } else if (errorCode === 'auth/user-disabled') {
          errorSpan.innerHTML = 'Tu cuenta se encuentra deshabilitada';
        }
      });
  });

  // Login with Google
  btnLoginGoogle.addEventListener('click', () => {
    accountGoogle()
      .then(() => {
        googlePersistanceFunction();
        navigateTo('/feed');
      });
  });

  return container;
};
