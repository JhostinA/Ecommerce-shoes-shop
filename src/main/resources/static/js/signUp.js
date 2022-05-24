const $frmRegister = document.querySelector("#frmSignUp")
const correoVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const $email2 = document.querySelector("#email");
const Urlservidor= "http://localhost:8080/api/user"
$frmRegister.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const $name = document.querySelector("#name")
  const $email = document.querySelector("#email");
  const $password = document.querySelector("#pwd");
  const $password2 = document.querySelector("#pwd2");
  if ($name.value.trim() == "") {
    camposnoValidos('danger', "Ingrese un nombre valido", document.querySelector("#nameAlert"))

  }

  else {
    if (correoVal.test($email.value)) {

      if ($password.value.trim() == "") {
        camposnoValidos('danger', "Ingrese una contraseña valida", document.querySelector("#pwd1Alert"))
       
      }
      else {


        if ($password.value.trim() == $password2.value.trim()) {
          getUserByEmail($name, $password, $email)
        }
        else {
          camposnoValidos('danger', "Las contraseñas no coinciden", document.querySelector("#diffPass"))
        }

      }
    }
    else {
      camposnoValidos('danger', "Ingrese un correo valido", document.querySelector("#emailAlert"))
    }
  }
});

async function getUserByEmail(name, password, email) {
  try {
    $emailValue = email.value.trim()
    const url = Urlservidor +"/emailexist/"+ $emailValue
    const response = await fetch(url)
    const responseJson = await response.json();
    console.log(responseJson)
    if (responseJson == true) {
      camposnoValidos("danger","El email se encuentra en uso",document.querySelector("#emailExis"))

    } else {
      sendDataToBackend(name, password, email)
    }
  } catch (error) {

  }
}

async function sendDataToBackend(name, password, email) {
  try {
    $nameValue = name.value.trim()
    $emailValue = email.value.trim()
    $passwordValue = password.value.trim()
    const url = Urlservidor + "/new"; 
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        password: $passwordValue,
        email: $emailValue,
        name: $nameValue

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(url, fetchOptions);
    const responseConverted = await response.json();
    console.log(responseConverted);
    alert("Cuenta creada correctamente")
    document.querySelector("#frmSignUp").reset()



  } catch (error) {
    console.log(`error`, error);
  }
}

function camposnoValidos(types, messages, div){
  const alertPlaceholder = div
  const type = types;
  const message = messages;
  const wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)

}