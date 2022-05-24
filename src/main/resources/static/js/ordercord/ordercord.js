var menu_btn = document.querySelector("#menu-btn")
var sidebar = document.querySelector("#sidebar")
var container = document.querySelector(".my-container")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
})
const Urlservidor = "http://localhost:8080/api/order"
const frmOrden=document.querySelector("#formOrden")
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
        document.querySelector("#nombreZona").innerHTML="Ordenes " + $usuarioJson.zone
        getAllOrdes()
    }

}
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html"
}

frmOrden.addEventListener('submit', ($event) => {
    $event.preventDefault();
    actualizarEstado()

});

async function getAllOrdes() {
    const $usuario = localStorage.getItem('usuario');
    const $usuarioJson = JSON.parse($usuario);
    const zone = $usuarioJson.zone
    console.log(zone)
    try {
        const url = Urlservidor + "/zona/"+ zone
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        dibujarTabla(responseJson)

    } catch (error) {

    }
}

function dibujarTabla(arrayOrders) {
    const table = document.querySelector("#data_orders");
    table.innerHTML = '';
    let plantilla =""
    arrayOrders.forEach(data => {
        const plantilla = table.insertRow()
        const id = plantilla.insertCell()
        id.innerHTML = data.id
        const registerDay = plantilla.insertCell()
        registerDay.innerHTML = data.registerDay
        const status = plantilla.insertCell()
        status.innerHTML = data.status
        const details = plantilla.insertCell()
        details.innerHTML = "<button type='button' onclick='tablaInformacion(" +JSON.stringify(data.id) +
        ")' class='btn btn-outline-success'>Detalles</button>"
        const actions = plantilla.insertCell()
        actions.innerHTML = "<button type='button' onclick='subirModal("+ JSON.stringify(data.id) +
            ")' class='btn btn-outline-primary'>Editar</button>"
    });
    

}
function subirModal(id){
    $("#orderId").val(id)
    $("#pedidoModal").modal("show")
    
}
function tablaInformacion(OrderId){
    $.ajax({
        url: 'http://localhost:8080/api/order/'+OrderId,
        type: 'GET',
        success(response) {
            console.log(response);

            var tableProducts = $("#data_productos");
            tableProducts.html("");
            const productos =Object.values(response.products)
            var tableSalesMan = $("#data_vendedor");
            tableSalesMan.html("");
            var tableQuantities = $("#data_cantidades");
            tableQuantities.html("");
            const quantities = Object.values(response.quantities)
            for(let i =0; i<productos.length; i++){


                var plantilla =
                    `
                    <tr>
                        <td class="text-center"><img src="${Object.values(response.products)[i].photography}" alt="${Object.values(response.products)[i].brand}" width="80px" height="60px" ></td>
                        <td>${Object.values(response.products)[i].reference}</td>
                        <td>${Object.values(response.products)[i].brand}</td>
                        <td>${Object.values(response.products)[i].category}</td>
                        <td>${Object.values(response.products)[i].material}</td>
                        <td>${Object.values(response.products)[i].gender}</td>
                        <td>${Object.values(response.products)[i].size}</td>
                        <td>${Object.values(response.products)[i].availability}</td>
                        <td>${Object.values(response.products)[i].price}</td>
                        
                    </tr>
                        `;
                
                
                               
                tableProducts.append(plantilla);
            }
            

                var plantilla =
                    `
                    <tr>
                        <td>${response.salesMan.identification}</td>
                        <td>${response.salesMan.name}</td>
                        <td>${response.salesMan.zone}</td>
                        <td>${response.salesMan.email}</td>
                        
                    </tr>
                        `;
                
                
                               
                tableSalesMan.append(plantilla);
            for(let i =0; i<quantities.length; i++){
                var plantilla =
                    `
                    <tr>
                        <td>${Object.keys(response.quantities)[i]}</td>
                        <td>${Object.values(response.quantities)[i]}</td>
                        
                        
                    </tr>
                        `;
                
                
                               
                tableQuantities.append(plantilla);
            }

            $("#modalProducts").modal("show")
        }
    });
}

function actualizarEstado(){
    let id = $("#orderId").val();
     if (id != "") {
        let data = {
            id:document.querySelector("#orderId").value,
            status:document.querySelector("#status").value
        }
        data.id = id;
        data = JSON.stringify(data);

        console.log(data);
    $.ajax({
        url: "http://localhost:8080/api/order/update",
        type: 'PUT',
        data: data,
        contentType:'application/json',
        dataType:'json',
        success(response) {
            alert("El estado de la orden fue actualizado exitosamente")
            window.location.href="ordencord.html"
        },
        error(response) {
            alert("Error, no se pudo actualizar el estado de la orden")
        }
    })


    }
}