let json = [
  {
    name: "Анжела",
    surname: "Попова",
    bday: "20.06.82",
    email: "new.daisy@mail.ru",
    password: "123",
  },
  {
    name: "Иван",
    surname: "Иванов",
    bday: "20.20.20",
    email: "ivanov@mail.ru",
    password: "123",
  },
  {
    name: "Петр",
    surname: "Петров",
    bday: "06.06.06",
    email: "petrov@mail.ru",
    password: "123",
  },
];

const loginForm = document.getElementById("login");
const profileForm = document.getElementById("profile");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("customization__text_name");
const surnameInput = document.getElementById("customization__text_surname");
const bdayInput = document.getElementById("customization__text_bday");

// Обработчик отправки формы входа
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем данные пользователя из JSON-файла
  fetch("user.json")
    .then((response) => response.json())
    .then((userData) => {
      // Проверяем правильность введенных данных
      if (
        userData.email === emailInput.value &&
        userData.password === passwordInput.value
      ) {
        // Если данные верны, заполняем форму профиля
        nameInput.value = userData.name;
        surnameInput.value = userData.surname;
        bdayInput.value = userData.bday;
      } else {
        alert("Неправильный email или пароль");
      }
    });
});

// Обработчик отправки формы профиля
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем данные пользователя из JSON-файла
  fetch("user.json")
    .then((response) => response.json())
    .then((userData) => {
      // Обновляем данные пользователя в JSON-файле
      userData.name = nameInput.value;
      userData.surname = surnameInput.value;
      userData.bday = bdayInput.value;

      // Сохраняем обновленные данные в JSON-файле
      fetch("user.json", {
        method: "PUT",
        body: JSON.stringify(userData),
      }).then(() => alert("Данные сохранены"));
    });
});
