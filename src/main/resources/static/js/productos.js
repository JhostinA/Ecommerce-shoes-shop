var menu_btn = document.querySelector("#menu-btn")
var sidebar = document.querySelector("#sidebar")
var container = document.querySelector(".my-container")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
})
const Urlservidor = "http://localhost:8080/api/accessory"
const $frmProduct = document.querySelector("#formFootware");
const $frmProductUp = document.querySelector("#formFootwareUp")
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
        getAllProducts()
    }
}

async function getAllProducts() {
    try {
        const url = Urlservidor + "/all"
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        dibujarTabla(responseJson)

    } catch (error) {

    }
}

function dibujarTabla(arrayProductos) {
    const table = document.querySelector("#data_productos");
    table.innerHTML = '';
    arrayProductos.forEach(arrayProductos => {
        const plantilla = table.insertRow()
        const photografy = plantilla.insertCell()
        photografy.innerHTML = "<img src='" + arrayProductos.photography + "' height='50px' width='50px' alt=''>"
        const reference = plantilla.insertCell()
        reference.innerHTML = arrayProductos.reference
        const brand = plantilla.insertCell()
        brand.innerHTML = arrayProductos.brand
        const category = plantilla.insertCell()
        category.innerHTML = arrayProductos.category
        const marerial = plantilla.insertCell()
        marerial.innerHTML = arrayProductos.material
        const gender = plantilla.insertCell()
        gender.innerHTML = arrayProductos.gender
        const size = plantilla.insertCell()
        size.innerHTML = arrayProductos.size
        const description = plantilla.insertCell()
        description.innerHTML = arrayProductos.description
        const availability = plantilla.insertCell()
        availability.innerHTML = arrayProductos.availability
        const price = plantilla.insertCell()
        price.innerHTML = arrayProductos.price
        const quantity = plantilla.insertCell()
        quantity.innerHTML = arrayProductos.quantity
        const actions = plantilla.insertCell()
        actions.innerHTML = "<button type='button' onclick='borrarProducto(" + false + "," + JSON.stringify(arrayProductos.reference) +
            ")' class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteModal'>Borrar</button> <br> <button type='button' onclick='subirDatosModal(" + JSON.stringify(arrayProductos.reference) +
            ")' class='btn btn-outline-info'>Editar</button>"
        table.append(plantilla)

    });
}

async function borrarProducto(reference_id = true, reference) {
    console.log(reference_id)
    if (reference_id) {
        let referenceDe = document.querySelector("#delete_reference").value
        console.log(referenceDe)
        try {

            const url = Urlservidor + "/" + referenceDe;
            const fetchOptions = {
                method: "DELETE",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const response = await fetch(url, fetchOptions);
            alert("Producto borrado con exito")
            referenceDe = "";
            window.location.href = "/pages/productos.html"
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("primero entro aqui")
        let referenceDe = document.querySelector("#delete_reference")
        referenceDe.value = reference
    }



}

async function getProductByRef(reference) {


    try {
        const url = Urlservidor + "/" + reference
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
    } catch (error) {

    }
}


async function crearProducto(reference, brand, category, material, gender, size, availability, price, quantity, photography, description) {
    try {

        const url = Urlservidor + "/new";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                reference: reference.value,
                brand: brand.value,
                category: category.value,
                material: material.value,
                gender: gender.value,
                size: size.value,
                availability: availability.value,
                price: price.value,
                quantity: quantity.value,
                photography: photography.value,
                description: description.value,

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(responseConverted);
        alert("Producto Registrado correctamente")
        document.querySelector("#formFootware").reset()
        window.location.href = "/pages/productos.html"
    } catch (error) {

    }
}

$frmProduct.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $reference = document.querySelector("#reference");
    const $brand = document.querySelector("#brand");
    const $category = document.querySelector("#category");
    const $material = document.querySelector("#material");
    const $gender = document.querySelector("#gender");
    const $size = document.querySelector("#size");
    const $availability = document.querySelector("#availability");
    const $price = document.querySelector("#price");
    const $quantity = document.querySelector("#quantity");
    const $photography = document.querySelector("#photography");
    const $description = document.querySelector("#description");
    console.log($reference.value, $brand.value, $category.value, $material.value, $gender.value,
        $size.value, $availability.value, $price.value, $quantity.value, $photography.value, $description.value)

    if ($reference.value.trim() == "" || $brand.value.trim() == "" || $category.value.trim() == "" || $material.value.trim() == "" || $gender.value.trim() == "" ||
        $size.value.trim() == "" || $availability.value.trim() == "" || $price.value.trim() == "" || $quantity.value.trim() == "" || $photography.value.trim() == "" || $description.value.trim() == "") {
        alert("Por favor rellene correctamente los campos")

    }
    else {
        crearProducto($reference, $brand, $category, $material, $gender, $size, $availability, $price, $quantity, $photography, $description)
    }


});
$frmProductUp.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $reference = document.querySelector("#referenceUp");
    const $brand = document.querySelector("#brandUp");
    const $category = document.querySelector("#categoryUp");
    const $material = document.querySelector("#materialUp");
    const $gender = document.querySelector("#genderUp");
    const $size = document.querySelector("#sizeUp");
    const $availability = document.querySelector("#availabilityUp");
    const $price = document.querySelector("#priceUp");
    const $quantity = document.querySelector("#quantityUp");
    const $photography = document.querySelector("#photographyUp");
    const $description = document.querySelector("#descriptionUp");
    

    if ($reference.value.trim() == "" || $brand.value.trim() == "" || $category.value.trim() == "" || $material.value.trim() == "" || $gender.value.trim() == "" ||
        $size.value.trim() == "" || $availability.value.trim() == "" || $price.value.trim() == "" || $quantity.value.trim() == "" || $photography.value.trim() == "" || $description.value.trim() == "") {
        alert("Por favor rellene correctamente los campos")

    }
    else {
        editarDatos($reference, $brand, $category, $material, $gender, $size, $availability, $price, $quantity, $photography, $description)
    }


});
async function subirDatosModal(referencia) {
    try {
        const url = Urlservidor + "/" + referencia
        const response = await fetch(url)
        const responseJson = await response.json();
        console.log(responseJson)
        const $reference = document.querySelector("#referenceUp").value = responseJson.reference;
        const $brand = document.querySelector("#brandUp").value = responseJson.brand;
        const $category = document.querySelector("#categoryUp").value = responseJson.category;
        const $material = document.querySelector("#materialUp").value = responseJson.material;
        const $gender = document.querySelector("#genderUp").value = responseJson.gender;
        const $size = document.querySelector("#sizeUp").value = responseJson.size;
        const $availability = document.querySelector("#availabilityUp").value = responseJson.availability;
        const $price = document.querySelector("#priceUp").value = responseJson.price;
        const $quantity = document.querySelector("#quantityUp").value = responseJson.quantity;
        const $photography = document.querySelector("#photographyUp").value = responseJson.photography;
        const $description = document.querySelector("#descriptionUp").value = responseJson.description;
        $('#footwareModalUp').modal('show');

       
      
    } catch (error) {

    }

}

async function editarDatos(reference, brand, category, material, gender, size, availability, price, quantity, photography, description){
    try {
        const url = Urlservidor + "/update";
        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify({
                reference: reference.value,
                brand: brand.value,
                category: category.value,
                material: material.value,
                gender: gender.value,
                size: size.value,
                availability: availability.value,
                price: price.value,
                quantity: quantity.value,
                photography: photography.value,
                description: description.value

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(responseConverted);
        alert("Producto editado correctamente")
        document.querySelector("#formFootwareUp").reset()
        window.location.href = "/pages/productos.html"
    } catch (error) {

    }

}

