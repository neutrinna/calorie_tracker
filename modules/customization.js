const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');

function loginForm()  {

  const storedUsername = localStorage.getItem('loginEmail');
  const storedPassword = localStorage.getItem('loginPassword');

  const enteredEmail = emailInput.value;
  const enteredPassword = passwordInput.value;

  if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
    // Введенные данные верны
    // Дополнительный код здесь
    document.getElementById("profile-welcome__wripper").style.display = "none";
    document.getElementById("profile-paternity").style.display = "none";

    document.getElementById("profile-user").style.display = "block";
    document.getElementById("profile-user__settings").style.display = "block";

  } else {
    // Введенные данные неверны
    // Дополнительный код здесь
    alert(`Пользователя с таким именем не существует, зарегистрируйтесь!`);

  }
};