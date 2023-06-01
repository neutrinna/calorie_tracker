
let loged = false;
const formLog = document.querySelector(".profile-welcome__form");
// localStorage.clear();

function loginUser() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userSessions = JSON.parse(localStorage.getItem('userSessions'))||{};

  const emailInputValue = document.getElementById('loginEmail').value;
  const passwordInputValue = document.getElementById('loginPassword').value;
  let userFound = false; // добавляем переменную
  // const currentUser = {};

  for (let i = 0; i < userData.length; i++) {
    // console.log(`emailInputValue: ${emailInputValue} userData[i].email:${userData[i].email}`);
    // console.log(`passwordInputValue: ${passwordInputValue} userData[i].password:${userData[i].password}`);
    if (emailInputValue === userData[i].email && passwordInputValue === userData[i].password) {

      const currentUser = userSessions[`${emailInputValue}`]||{};
      console.log("Данные совпадают");
      loged = true;
      window.localStorage.setItem(`loged`, `${loged}`);
      userFound = true; // если пользователь найден, меняем значение переменной

      document.getElementById("customization__text_name").value =  userData[i].name[0].toUpperCase() + userData[i].name.slice(1);
      let InputName = document.getElementById("customization__text_name").value;
      document.getElementById("customization__text_surname").value =
        userData[i].surname[0].toUpperCase() + userData[i].surname.slice(1);
      let InputSurname = document.getElementById("customization__text_surname").value
      document.getElementById("customization__text_bday").value =
        userData[i].bday;
      let InputBday = document.getElementById("customization__text_bday").value
      document.getElementById("customization__text_email").value =
        userData[i].email;
      let InputEmail = document.getElementById("customization__text_email").value
      document.getElementById("customization__text_password").value =
        userData[i].password;
      let InputPassword = document.getElementById("customization__text_password").value

      var now = new Date(); //Текущая дата 
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени 
      var dob = new Date(userData[i].bday); //Дата рождения 
      var dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году 
      var age; //Возраст 

      //Возраст = текущий год - год рождения 
      age = today.getFullYear() - dob.getFullYear();
      //Если ДР в этом году ещё предстоит, то вычитаем из age один год 
      if (today < dobnow) {
        age = age - 1;
      }

      currentUser.name=`${userData[i].name[0].toUpperCase() + userData[i].name.slice(1)}`;
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
      

      return ; // выходим из цикла, так как дальше перебирать нет смысла
    }
  }

  if (!userFound) {
    // проверяем, был ли найден пользователь
    console.log("Данные не совпадают");
    alert(`Пользователя с таким именем не существует, зарегистрируйтесь!`);
  }
}

function customizationSave() {
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
  document.querySelector(".profile-RSK__checkbox").style.display = "none" ;
  closeDropdown()
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

