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
        getFootware()
        getAllOrdes()
    }

}
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html"
}

frmOrden.addEventListener('submit', ($event) => {
    $event.preventDefault();
    crearOrden()

});
function modalDatos(){
    const hoy = Date.now();
    const fecha = new Date(hoy);
    const formatDate = (fecha)=>{
    let formatted_date =  fecha.getFullYear()+ "-" +  (fecha.getMonth() + 1) + "-" + fecha.getDate()
        return formatted_date;
    }
    const $usuario = localStorage.getItem('usuario');
    const $usuarioJson = JSON.parse($usuario);
    document.querySelector("#registerDay").value = formatDate(fecha)
    document.querySelector("#salesMan").value=$usuarioJson.name
}
async function getFootware(){
    try {
        const url = "http://localhost:8080/api/accessory/all"
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        let options = "";
        responseJson.forEach(data => {
            options += '<option value=' + data.reference + '>' + data.reference + '</option>'
            console.log(data.reference)
        });
        document.querySelector("#product1").innerHTML=options
        document.querySelector("#product2").innerHTML=options
    } catch (error) {
        
    }
}
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
        actions.innerHTML = "<button type='button' onclick='borrarOrder(" + false + "," + JSON.stringify(data.id) +
            ")' class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteModal'>Borrar</button>"
    });
    

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

async function borrarOrder(order_id = true, id) {
    console.log(order_id)
    if (order_id) {
        let orderid = document.querySelector("#delete_id").value
        console.log(orderid)
        try {

            const url = Urlservidor + "/" + orderid;
            const fetchOptions = {
                method: "DELETE",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const response = await fetch(url, fetchOptions);
            alert("Orden borrada con exito")
            order_id = "";
            window.location.href = "order.html"
        } catch (error) {
            console.log(error)
        }
    } else {
        let order_id = document.querySelector("#delete_id")
        order_id.value = id
    }



}

async function obtenerDatos() {

    const array = []
    const products = new Map();
    const quantity = new Map()
    for(let i = 1; i<3;i++){
        const agregar = await obtenerPorRefe($("#product"+[i]).val())
        console.log(agregar)
        if(agregar!=null){
            array.push(agregar)
            
        }
        console.log(array)
        
    }
    console.log(array.length)

    for(let i=0; i<array.length;i++){
        console.log(array[i].reference)
        products.set(array[i].reference, array[i]);
        quantity.set(array[i].reference, $("#quantity"+[i+1]).val())
    }

    let form = {
        registerDay: $("#registerDay").val(),
        salesMan: JSON.parse(localStorage.getItem('usuario')),
        status: 'Pendiente',
        products:Object.fromEntries(products),
        quantities: Object.fromEntries(quantity)

    };
    console.log(form)
    return form;
}


async function obtenerPorRefe(reference) {
    try {
      const url = "http://localhost:8080/api/accessory/"+ reference
      const response = await fetch(url)
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
  
    }
  }

  async function crearOrden() {
    try {
        const frmValues = await obtenerDatos()
        const url = "http://localhost:8080/api/order/new";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                registerDay: frmValues.registerDay,
                salesMan: frmValues.salesMan,
                status: 'Pendiente',
                products: frmValues.products,
                quantities: frmValues.quantities
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(responseConverted);
        alert("Orden creada correctamente")
        document.querySelector("#formOrden").reset()
        window.location.href = "order.html"
    } catch (error) {
        alert("La orden no se pudo crear")
    }
}   
