var menu_btn = document.querySelector("#menu-btn")
var sidebar = document.querySelector("#sidebar")
var container = document.querySelector(".my-container")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
})
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
        document.querySelector("#datosP").innerHTML="<h4>"+$usuarioJson.name+"</h4><p class='text-secondary mb-1' >"+$usuarioJson.identification+"</p><p class='text-muted font-size-sm'>"+$usuarioJson.type+"</p>"
        document.querySelector("#email").innerHTML="<p>"+$usuarioJson.email+"</p>"
        document.querySelector("#address").innerHTML="<p>"+$usuarioJson.address+"</p>"
        document.querySelector("#telefono").innerHTML="<p>"+$usuarioJson.cellPhone+"</p>"
    }
}


function cerrarSesion(){
    localStorage.removeItem("usuario");
    window.location.href="/index.html"
}