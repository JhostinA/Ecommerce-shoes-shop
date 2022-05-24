const $frmlogin = document.querySelector("#frmlogin");
const correoVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Urlservidor = "http://localhost:8080/api/user"


$frmlogin.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $email = document.querySelector("#email");
    const $password = document.querySelector("#pwd");
    if (correoVal.test($email.value)) {
        if ($password.value.trim() == "") {
            camposnoValidos("danger", "Ingrese una contraseña valida", document.querySelector("#pswAlert"))

        }
        else {
            getUserbyEmailandPassword($email, $password)
        }

    }
    else {
        camposnoValidos("danger", "Ingrese un correo valido", document.querySelector("#emailAlert"))

       
    }




});
async function getUserbyEmailandPassword(email, password) {
    try {
        $emailValue = email.value.trim()
        $passwordValue = password.value.trim()
        const url = Urlservidor +"/"+ $emailValue + '/' + $passwordValue
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.id == null) {
            camposnoValidos("danger","La combinacion Correo/contraseña es incorrecta",document.querySelector("#bad-request"))

        }
        else {
            localStorage.setItem('usuario', JSON.stringify(responseJson))
            window.location.href="../pages/home.html"
            
        }



    } catch (error) {
        console.log("error:", error)
    }



}

function camposnoValidos(types, messages, div) {
    const alertPlaceholder = div
    const type = types;
    const message = messages;
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)

}


