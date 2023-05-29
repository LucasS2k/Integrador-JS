const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const checkEmail = () => {
  let valid = false;
  const emailValue = emailInput.value.trim();
  if (isEmpty(emailInput)) {
    showError(emailInput, "El Email es obligatorio");
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, "El Email no es válido");
  } else {
    showSuccess(emailInput);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passInput.value.trim();
  if (isEmpty(password)) {
    showError(passInput, "La contraseña es obligatoria");
  } else if (!isPassSecure(password)) {
    showError(
      passInput,
      "La contraseña es incorrecta o no cumple los requisitos"
    );
  } else {
    showSuccess(passInput);
    valid = true;
  }
  return valid;
};
const isEmpty = (value) => value === "";

const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};
const isPassSecure = (pass) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return re.test(pass);
};
const showError = (input, message) => {
  const ingreso = input.parentElement;
  ingreso.classList.remove("success");
  ingreso.classList.add("error");
  const error = ingreso.querySelector("small");
  error.textContent = message;
};
const showSuccess = (input) => {
  const ingreso = input.parentElement;
  ingreso.classList.remove("error");
  ingreso.classList.add("success");
  const error = ingreso.querySelector("small");
  error.textContent = "";
};
const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isFormValid = isEmailValid && isPasswordValid;
  if (isFormValid) {
    form.submit();
  }
});
form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id) {
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
