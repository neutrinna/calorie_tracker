  const nameInput = document.getElementById("registration__text_name");
  const surnameInput = document.getElementById("registration__text_surname");
  const bdayInput = document.getElementById("registration__text_bday");
  const emailInput = document.getElementById("registration__text_email");
  const passwordInput = document.getElementById("registration__text_password");
  const passwordRepeatInput = document.getElementById("registration__text_passwordRepeat");
  const submitBtn = document.getElementById("registration__submit");
  
  function validateDate(input) {
    let enteredDate = new Date(input.value);
    const minDate = new Date(input.min);
    const maxDate = new Date(input.max);
    if (enteredDate < minDate || enteredDate > maxDate) {
      alert("Неверная дата рождения!");
      input.value = ""; 
    }
  }

  function validateEmail(input) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      alert("Неправильный формат электронной почты!");
      input.value = ""; 
    }
  }

  function validatePassword(input) { 
    const password = passwordInput.value; 
        
    if (password.length < 6) {
      alert("Пароль должен содержать не менее 6 символов и не более 12");
      input.value = ""; 
    }
  } 

  function registrationAdd() { 
    const name = nameInput.value[0].toUpperCase() + nameInput.value.slice(1).toLowerCase();
    const surname = surnameInput.value[0].toUpperCase() + surnameInput.value.slice(1).toLowerCase();  
    const bday = bdayInput.value; 
    const email = emailInput.value; 
    const password = passwordInput.value; 
    const passwordRepeat = passwordRepeatInput.value; 
  
    function checkPassword() { 
      if (password !== passwordRepeat) { 
        return false; 
      } 
      return true; 
    } 
  
    if (name && surname && bday && email && password && passwordRepeat && checkPassword()) { 
      let userData = JSON.parse(localStorage.getItem("userData")) || []; 
  
      const existingUser = userData.find((user) => user.email === email); 
      if (existingUser) { 
        alert("Пользователь с таким email уже зарегистрирован!"); 
        return; 
      } 
  
      const newUser = { 
        name, 
        surname, 
        bday, 
        email, 
        password, 
      }; 
  
      userData.push(newUser); 
      localStorage.setItem("userData", JSON.stringify(userData)); 
  
      alert(`Пользователь ${name} ${surname} успешно зарегистрирован!`); 
  
      const userSessions = JSON.parse(localStorage.getItem("userSessions")) || {}; 
      userSessions[`${email}`] = {}; 
      console.log(userSessions); 
      localStorage.setItem("userSessions", JSON.stringify(userSessions)); 
  
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
  
  function openRegistration() {
    document.getElementById("registration__pop-up").style.display = "block";
    popUpHide()
  }
  
  function closeRegistration() {
    document.getElementById("registration__pop-up").style.display = "none";
  }
  
  function openCustomization() {
    document.getElementById("myDropdown").style.display = "none"
    document.getElementById("customization__pop-up").style.display = "block";

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("userData"));
    document.getElementById("customization__text_name").value = currentUser.name;
    document.getElementById("customization__text_surname").value = currentUser.surname;
    document.getElementById("customization__text_email").value = currentUser.email;

    for (let i = 0; i < userData.length; i++) {
      if (currentUser.email === userData[i].email) {
        currentUser.bday = userData[i].bday;
        currentUser.password = userData[i].password;
      }
    }
    document.getElementById("customization__text_bday").value = currentUser.bday;
    document.getElementById("customization__text_password").value = currentUser.password;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  }
  
  function closeCustomization() {
    document.getElementById("customization__pop-up").style.display = "none";
  }
  
  function getUsers() {
    return JSON.parse(localStorage.getItem("userData")) || [];
  }
  
  function openDropdown() {
    document.getElementById("myDropdown").style.display = "block";
  }
  
  function closeDropdown() {
    document.getElementById("myDropdown").style.display = "none";
  }