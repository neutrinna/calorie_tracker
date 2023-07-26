  // получаем элементы формы
  const nameInput = document.getElementById("registration__text_name");
  const surnameInput = document.getElementById("registration__text_surname");
  const bdayInput = document.getElementById("registration__text_bday");
  const emailInput = document.getElementById("registration__text_email");
  const passwordInput = document.getElementById("registration__text_password");
  const passwordRepeatInput = document.getElementById("registration__text_passwordRepeat");
  const submitBtn = document.getElementById("registration__submit");
  

  function registrationAdd() { 
    const name = nameInput.value[0].toUpperCase() + nameInput.value.slice(1); 
    const surname = surnameInput.value[0].toUpperCase() + surnameInput.value.slice(1); 
    const bday = bdayInput.value; 
    const email = emailInput.value; 
    const password = passwordInput.value; 
    const passwordRepeat = passwordRepeatInput.value; 
  
    function checkPassword() { 
      // if (password === '' || passwordRepeat === '') { 
      //   alert('Заполните оба поля'); 
      //   return false; 
      // } 
  
      if (password !== passwordRepeat) { 
        return false; 
      } 
  
      // Пароль прошел проверку 
      return true; 
    } 
  
    if (name && surname && bday && email && password && passwordRepeat && checkPassword()) { 
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
  
      const userSessions = JSON.parse(localStorage.getItem("userSessions")) || {}; 
      userSessions[`${email}`] = {}; 
      console.log(userSessions); 
      localStorage.setItem("userSessions", JSON.stringify(userSessions)); 
  
      // сбрасываем значения полей ввода 
      nameInput.value = ""; 
      surnameInput.value = ""; 
      bdayInput.value = ""; 
      emailInput.value = ""; 
      passwordInput.value = ""; 
      passwordRepeatInput.value = ""; 
      closeRegistration()
    } else { 
      alert("Ошибка! Убедитесь что заполнены все поля и пароли совпадают!"); 
    } 
  }
  

  // // добавляем обработчик на кнопку "Зарегистрироваться"
  // submitBtn.addEventListener("click", registrationAdd);
  
  // функции открытия/закрытия попапа "Регистрация"
  function openRegistration() {
    // e.eventPreventDefault();
    document.getElementById("registration__pop-up").style.display = "block";
    popUpHide()
  }
  
  function closeRegistration() {
    document.getElementById("registration__pop-up").style.display = "none";
  }
  
  // функции открытия/закрытия попапа "Настройки"
  function openCustomization() {
    document.getElementById("myDropdown").style.display = "none"
    document.getElementById("customization__pop-up").style.display = "block";
  }
  
  function closeCustomization() {
    document.getElementById("customization__pop-up").style.display = "none";
  }
  
  // выносим получение текущего массива пользователей в отдельную функцию
  function getUsers() {
    return JSON.parse(localStorage.getItem("userData")) || [];
  }
  
  function openDropdown() {
    document.getElementById("myDropdown").style.display = "block";
  }
  
  function closeDropdown() {
    document.getElementById("myDropdown").style.display = "none";
  }