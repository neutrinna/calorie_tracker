const userData = JSON.parse(localStorage.getItem('userData'));

function loginUser()  { 
    const emailInputValue = document.getElementById('loginEmail').value; 
    const passwordInputValue = document.getElementById('loginPassword').value; 
    let userFound = false; // добавляем переменную
   
    for (var i = 0; i < userData.length; i++) { 
      if (emailInputValue === userData[i].email && passwordInputValue === userData[i].password) { 
        console.log("Данные совпадают"); 
        userFound = true; // если пользователь найден, меняем значение переменной
        document.getElementById("profile-welcome__wripper").style.display = "none"; 
        document.getElementById("profile-paternity").style.display = "none"; 
        document.getElementById("profile-user").style.display = "block"; 
        document.getElementById("profile-user__settings").style.display = "block"; 

        document.getElementById('customization__text_name').value = userData[i].name; 
        document.getElementById('customization__text_surname').value = userData[i].surname; 
        document.getElementById('customization__text_bday').value = userData[i].bday; 
        document.getElementById('customization__text_email').value = userData[i].email; 
        document.getElementById('customization__text_password').value = userData[i].password; 


        break; // выходим из цикла, так как дальше перебирать нет смысла
      }
    }
  
    if (!userFound) { // проверяем, был ли найден пользователь
      console.log("Данные не совпадают"); 
      alert(`Пользователя с таким именем не существует, зарегистрируйтесь!`); 
    }
  }

  function exit()  { 
        document.getElementById("profile-welcome__wripper").style.display = "block"; 
        document.getElementById("profile-paternity").style.display = "block"; 
        document.getElementById("profile-user").style.display = "none"; 
        document.getElementById("profile-user__settings").style.display = "none"; 
  }


