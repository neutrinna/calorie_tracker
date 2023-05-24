function registrationAdd() {
  const name = nameInput.value;
  const surname = surnameInput.value;
  const bday = bdayInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordRepeat = passwordRepeatInput.value;

  // проверка, что все поля заполнены
  // if (!name || !surname || !bday || !email || !password || !passwordRepeat)  {
  //   alert("Заполните все поля!");
  //   return;
  // }

  if (name && surname && bday && email && password && passwordRepeat) {
    // код, который будет выполнен, если все переменные имеют значение
  } else {
    alert("Заполните все поля!");
    return;
  }

  function checkPassword() {
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;
  
    if (password === '' || passwordRepeat === '') {
      alert('Заполните оба поля');
      return false;
    }
  
    if (password !== passwordRepeat) {
      alert('Пароли не совпадают');
      return false;
    }
  
    // Пароль прошел проверку
    return true;
  }

  // получаем текущий массив пользователей (если его нет, то создаем пустой массив)
  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  // проверка, что такой пользователь уже не зарегистрирован (по email)
  const existingUser = userData.find((user) => user.email === email);
  if (existingUser) {
    alert("Пользователь с таким email уже зарегистрирован!");
    return;
  }

  // создаем объект с данными нового пользователя
  const newUser = {
    name,
    surname,
    bday,
    email,
    password,
  };

  // добавляем нового пользователя в массив и сохраняем его в localStorage
  userData.push(newUser);
  localStorage.setItem("userData", JSON.stringify(userData));

  // выводим сообщение об успешной регистрации
  alert(`Пользователь ${name} ${surname} успешно зарегистрирован!`);

  // сбрасываем значения полей ввода
  nameInput.value = "";
  surnameInput.value = "";
  bdayInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  passwordRepeatInput.value = "";
}

// получаем элементы формы
const nameInput = document.getElementById("registration__text_name");
const surnameInput = document.getElementById("registration__text_surname");
const bdayInput = document.getElementById("registration__text_bday");
const emailInput = document.getElementById("registration__text_email");
const passwordInput = document.getElementById("registration__text_password");
const passwordRepeatdInput = document.getElementById("registration__text_passwordRepeat");
const submitBtn = document.getElementById("registration__submit");

// добавляем обработчик на кнопку "Зарегистрироваться"
submitBtn.addEventListener("click", registrationAdd);

// функции открытия/закрытия попапа "Регистрация"
function openRegistration() {
  document.getElementById("registration__pop-up").style.display = "block";
}

function closeRegistration() {
  document.getElementById("registration__pop-up").style.display = "none";
}

// функции открытия/закрытия попапа "Настройки"
function openCustomization() {
  document.getElementById("customization__pop-up").style.display = "block";
}

function closeCustomization() {
  document.getElementById("customization__pop-up").style.display = "none";
}

// выносим получение текущего массива пользователей в отдельную функцию
function getUsers() {
  return JSON.parse(localStorage.getItem("userData")) || [];
}



