var menu_btn = document.querySelector("#menu-btn")
var sidebar = document.querySelector("#sidebar")
var container = document.querySelector(".my-container")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
})

const Urlservidor = "http://localhost:8080/api/user"
const $frmUsuarios = document.querySelector("#formUsuarios");
const $frmUsuariosUp = document.querySelector("#formUsuariosUp")
const correoVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html"
}


window.onload = function () {
    const $usuario = localStorage.getItem('usuario');
    if ($usuario == null) {
        alert("no has iniciado sesion")
        window.location.href = "/index.html"
    }
    else {
        const $usuarioJson = JSON.parse($usuario);
        const welcom = document.querySelector("#welcom")
        welcom.innerHTML = "<p>Bienvenid@ " + $usuarioJson.name + "</p>"
        getAllUsers()
    }
}

async function getAllUsers() {
    try {
        const url = Urlservidor + "/all"
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        dibujarTabla(responseJson)

    } catch (error) {

    }
}

function dibujarTabla(arrayUsuarios) {
    const table = document.querySelector("#data_usuarios");
    table.innerHTML = '';
    arrayUsuarios.forEach(arrayUsuarios => {
        const plantilla = table.insertRow()
        const id = plantilla.insertCell()
        id.innerHTML = arrayUsuarios.id
        const identification = plantilla.insertCell()
        identification.innerHTML = arrayUsuarios.identification
        const name = plantilla.insertCell()
        name.innerHTML = arrayUsuarios.name
        const address = plantilla.insertCell()
        address.innerHTML = arrayUsuarios.address
        const cellPhone = plantilla.insertCell()
        cellPhone.innerHTML = arrayUsuarios.cellPhone
        const email = plantilla.insertCell()
        email.innerHTML = arrayUsuarios.email
        const password = plantilla.insertCell()
        password.innerHTML = arrayUsuarios.password
        const zone = plantilla.insertCell()
        zone.innerHTML = arrayUsuarios.zone
        const type = plantilla.insertCell()
        type.innerHTML = arrayUsuarios.type
        const actions = plantilla.insertCell()
        actions.innerHTML = "<button type='button' onclick='borrarUsuario(" + false + "," + JSON.stringify(arrayUsuarios.id) +
            ")' class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteModal'>Borrar</button> <br> <button type='button' onclick='subirDatosModal(" + JSON.stringify(arrayUsuarios.id) +
            ")' class='btn btn-outline-info'>Editar</button>"
        table.append(plantilla)

    });
}

async function borrarUsuario(reference_id = true, reference) {
    console.log(reference_id)
    if (reference_id) {
        let referenceDe = document.querySelector("#delete_id").value
        
        try {

            const url = Urlservidor + "/" + referenceDe;
            const fetchOptions = {
                method: "DELETE",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const response = await fetch(url, fetchOptions);
            alert("Usuario borrado con exito")
            referenceDe = "";
            window.location.href = "/pages/usuarios.html"
        } catch (error) {
            console.log(error)
        }
    } else {
        
        let referenceDe = document.querySelector("#delete_id")
        referenceDe.value = reference
    }



}



async function crearUsuario(identification,name,address,cellPhone,email,password,zone,type) {
    try {

        const url = Urlservidor + "/new";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                identification: identification.value,
                name: name.value,
                address: address.value,
                cellPhone: cellPhone.value,
                email: email.value,
                password: password.value,
                zone: zone.value,
                type: type.value,

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(responseConverted);
        alert("Usuario registrado correctamente")
        document.querySelector("#formUsuarios").reset()
        window.location.href = "/pages/usuarios.html"
    } catch (error) {

    }
}

$frmUsuarios.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $identification = document.querySelector("#identification");
    const $name = document.querySelector("#name");
    const $address = document.querySelector("#address");
    const $cellPhone = document.querySelector("#cellPhone");
    const $email = document.querySelector("#email");
    const $password = document.querySelector("#pwd");
    const $zone = document.querySelector("#zone");
    const $type = document.querySelector("#type");
    const $password2 = document.querySelector("#pwd2");

    if ($identification.value.trim() == "" || $name.value.trim() == "" || $address.value.trim() == "" || $cellPhone.value.trim() == "" || $email.value.trim() == "" ||
        $password.value.trim() == "" || $zone.value.trim() == "" || $type.value.trim() == "" || $password2.value.trim() == "" ) {
        alert("Por favor rellene correctamente los campos")

    }
    else {
        if(correoVal.test($email.value)){
            if($password.value==$password2.value){
                getUserByEmail($identification,$name,$address,$cellPhone,$email,$password,$zone,$type)
            }else{
                alert("Las contraseñas no coinciden")
            }
        }else{
            alert("Ingrese un correo electronico valido")
        }
        
    }


});

async function getUserByEmail(identification,name,address,cellPhone,email,password,zone,type) {
    try {
      $emailValue = email.value.trim()
      const url = Urlservidor +"/emailexist/"+ $emailValue
      const response = await fetch(url)
      const responseJson = await response.json();
      console.log(responseJson)
      if (responseJson == true) {
       alert("El email ya se encuentra en uso")
  
      } else {
        crearUsuario(identification,name,address,cellPhone,email,password,zone,type)
      }
    } catch (error) {
  
    }
  }
$frmUsuariosUp.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $id = document.querySelector("#idUp");
    const $identification = document.querySelector("#identificationUp");
    const $name = document.querySelector("#nameUp");
    const $address = document.querySelector("#addressUp");
    const $cellPhone = document.querySelector("#cellPhoneUp");
    const $email = document.querySelector("#emailUp");
    const $password = document.querySelector("#pwdUp");
    const $zone = document.querySelector("#zoneUp");
    const $type = document.querySelector("#typeUp");
    const $password2 = document.querySelector("#pwd2Up");
    

    if ($identification.value.trim() == "" || $name.value.trim() == "" || $address.value.trim() == "" || $cellPhone.value.trim() == "" || $email.value.trim() == "" ||
    $password.value.trim() == "" || $zone.value.trim() == "" || $type.value.trim() == "" || $password2.value.trim() == "" ) {
    alert("Por favor rellene correctamente los campos")

}
else {
    if(correoVal.test($email.value)){
        if($password.value==$password2.value){
            editarDatos($id,$identification,$name,$address,$cellPhone,$email,$password,$zone,$type)
        }else{
            alert("Las contraseñas no coinciden")
        }
    }else{
        alert("Ingrese un correo electronico valido")
    }
    
}


});
async function subirDatosModal(id) {
    try {
        const url = Urlservidor + "/" + id
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        const $id = document.querySelector("#idUp").value = responseJson.id;
        const $identification = document.querySelector("#identificationUp").value = responseJson.identification;
        const $name = document.querySelector("#nameUp").value = responseJson.name;
        const $address = document.querySelector("#addressUp").value = responseJson.address;
        const $cellPhone = document.querySelector("#cellPhoneUp").value = responseJson.cellPhone;
        const $email = document.querySelector("#emailUp").value = responseJson.email;
        const $password = document.querySelector("#pwdUp").value = responseJson.password;
        const $password2 = document.querySelector("#pwd2Up").value = responseJson.password;
        const $zone = document.querySelector("#zoneUp").value = responseJson.zone;
        const $type = document.querySelector("#typeUp").value = responseJson.type;
        $('#usuarioModalUp').modal('show');

       
      
    } catch (error) {

    }

}

async function editarDatos(id,identification,name,address,cellPhone,email,password,zone,type){
    try {
        const url = Urlservidor + "/update";
        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify({
                id:id.value,
                identification: identification.value,
                name: name.value,
                address: address.value,
                cellPhone: cellPhone.value,
                email: email.value,
                password: password.value,
                zone: zone.value,
                type: type.value

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(responseConverted);
        alert("Usuario editado correctamente")
        document.querySelector("#formUsuariosUp").reset()
        window.location.href = "/pages/usuarios.html"
    } catch (error) {

    }

}