let loged = false;
const formLog = document.querySelector(".profile-welcome__form");
// localStorage.clear();

function loginUser() {
  let userData = JSON.parse(localStorage.getItem('userData'));
  let userSessions = JSON.parse(localStorage.getItem('userSessions')) || {};

  const emailInputValue = document.getElementById('loginEmail').value;
  const passwordInputValue = document.getElementById('loginPassword').value;
  let userFound = false; // добавляем переменную
  // const currentUser = {};

  for (let i = 0; i < userData.length; i++) {
    if (emailInputValue === userData[i].email && passwordInputValue === userData[i].password) {

      const currentUser = userSessions[`${emailInputValue}`] || {};
      // console.log("Данные совпадают");
      loged = true;
      window.localStorage.setItem(`loged`, `${loged}`);
      userFound = true; // если пользователь найден, меняем значение переменной

      document.getElementById("customization__text_name").value = userData[i].name[0].toUpperCase() + userData[i].name.slice(1);
      let inputName = document.getElementById("customization__text_name").value;
      document.getElementById("customization__text_surname").value =
        userData[i].surname[0].toUpperCase() + userData[i].surname.slice(1);
      let inputSurname = document.getElementById("customization__text_surname").value
      document.getElementById("customization__text_bday").value =
        userData[i].bday;
      let inputBday = document.getElementById("customization__text_bday").value
      document.getElementById("customization__text_email").value =
        userData[i].email;
      let inputEmail = document.getElementById("customization__text_email").value
      document.getElementById("customization__text_password").value =
        userData[i].password;
      let inputPassword = document.getElementById("customization__text_password").value

      let now = new Date(); //Текущая дата 
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени 
      let dob = new Date(userData[i].bday); //Дата рождения 
      let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году 
      let age; //Возраст 
      age = today.getFullYear() - dob.getFullYear();
      if (today < dobnow) {
        age = age - 1;
      }

      currentUser.name = `${userData[i].name[0].toUpperCase() + userData[i].name.slice(1)}`;
      currentUser.surname = `${(userData[i].surname[0].toUpperCase() + userData[i].surname.slice(1))}`;
      currentUser.age = age;
      currentUser.email = emailInputValue;

      document.getElementById("profile-user__data-name").textContent = `${currentUser.name} ${currentUser.surname}`;
      document.getElementById('profile-user__data-age').textContent = `Возраст: ${currentUser.age}`;
      document.getElementById("profile-welcome__wripper").style.display = "none";
      document.getElementById("profile-paternity").style.display = "none";
      document.getElementById("profile-user").style.display = "flex";
      document.querySelector(".profile-RSK__checkbox").style.display = "flex";

      localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
      render()
      return; 
    }
  }

  if (!userFound) {
    // проверяем, был ли найден пользователь
    console.log("Данные не совпадают");
    alert(`Введён неправильный пароль или почтовый адрес`);
  }
}

function customizationSave() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   userSessions = JSON.parse(localStorage.getItem('userSessions')) || {};
  let inputName = document.getElementById("customization__text_name").value[0].toUpperCase() + document.getElementById("customization__text_name").value.slice(1).toLowerCase();
  let inputSurname = document.getElementById("customization__text_surname").value[0].toUpperCase() + document.getElementById("customization__text_surname").value.slice(1).toLowerCase();
  let inputBday = document.getElementById("customization__text_bday").value;
  let inputPassword = document.getElementById("customization__text_password").value;
  let inputEmail = document.getElementById("customization__text_email").value;
  inputEmail = currentUser.email;

  document.getElementById("profile-user__data-name").textContent = `${inputName} ${inputSurname}`;
  // document.getElementById("profile-user__data-age").textContent = age;
  


  let foundUser = null;
  // перебираем каждый объект в массиве userData
  for (let i = 0; i < userData.length; i++) {
      if (userData[i].email === inputEmail) {
        // найден email, проверяем остальные данные 
        if (userData[i].name !== (inputName && "")) {
          userData[i].name = inputName; // присваиваем новое значение
          currentUser.name = inputName;
          console.log (inputName)
        }
        if (userData[i].surname !== (inputSurname && "")) {
          userData[i].surname = inputSurname; // присваиваем новое значение
          currentUser.surname = inputSurname;
        }
        if (userData[i].bday !== (inputBday && "")) {
          console.log(inputBday);
          userData[i].bday = inputBday; // присваиваем новое значение
          let now = new Date(); //Текущая дата 
          let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени 
          let dob = new Date(inputBday); //Дата рождения 
          let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году 
          let age; //Возраст 

          //Возраст = текущий год - год рождения 
          age = today.getFullYear() - dob.getFullYear();
          //Если ДР в этом году ещё предстоит, то вычитаем из age один год 
          if (today < dobnow) {
            age = age - 1;
          }
          currentUser.age = age;
          document.getElementById("profile-user__data-age").textContent = `Возраст: ${age}`;

        }
        if (userData[i].password !== (inputPassword && "")) {
          userData[i].password = inputPassword; // присваиваем новое значение
        }

        foundUser = userData[i]; // сохраняем найденного пользователя
        break; // выходим из цикла, если найденный пользователь уже обработан
    }
    render()
  }

  localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  document.getElementById("customization__pop-up").style.display = "none";

}


function exit() {
  loged = false;
  document.getElementById("profile-welcome__wripper").style.display = "flex";
  document.getElementById("profile-paternity").style.display = "flex";
  document.getElementById("profile-user").style.display = "none";
  localStorage.setItem(`loged`, `${loged}`);
  saveChanges()
  const currentUser = {};
  localStorage.setItem(`currentUser`, `${currentUser}`);
  document.querySelector(".profile-RSK__checkbox").style.display = "none";
  closeDropdown()
  document.querySelector(".profile-user__doughnut-chart").innerHTML = ``;
  render()
}

function saveChanges() {
  const userSessions = JSON.parse(localStorage.getItem("userSessions"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  userSessions[`${currentUser.email}`] = currentUser;
  console.log(userSessions);
  localStorage.setItem("userSessions", JSON.stringify(userSessions));
}

// buttonLog.addEventListener('click', loginUser);
formLog.addEventListener('submit', function (event) {
  event.preventDefault()
})
