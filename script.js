
let form = document.getElementById("formulario");
let tabla = document.getElementById("tabla-pagos");
let destinos = [];
let pagos = [];

form.addEventListener("submit", e => {
    e.preventDefault();
    let nya = form.querySelector("#nombreApellido").value;
    let destino = form.querySelector("#destino").value;
    let monto = form.querySelector("#monto").value;
    let opc = form.querySelectorAll('input[name="opcion"]');
    let medio;

    opc.forEach(i => {
        if (i.checked) {
            medio = i.value;
        }
    });

    let nuevoPago = new Pagos(nya, destino, monto, medio);
    //En esta parte se controla si el destino ya existe
    if (!destinos.includes(destino)) {
        destinos.push(destino);
        let nuevoDestino = new Destino(destino);
        nuevoDestino.datosPaga(nuevoPago);
        pagos.push(nuevoDestino);
    } else {
        agregarPago(nuevoPago);
    }
    agregarDatos(nuevoPago);
});

//Agrega el pago al destino ya creado
function agregarPago(pago) {
    pagos.forEach(e => {
        if (e.lugar == pago.destino) {
            e.datosPaga(pago);
        }
        console.log(e.resumen);
    });
}

//Genera los datos de los pagos dentro de la tabla
function agregarDatos(pago) {
    tabla.insertAdjacentHTML('beforeend', `
    <div class="tr">
        <div class="td">${pago.nombre}</div>
        <div class="td">${pago.destino}</div>
        <div class="td">${pago.monto}</div>
        <div class="td">${pago.medio}</div>
    </div>
    `);
}

//Genera el texto de cierre de caja para copiar y enviar
function generarTexto() {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.toLocaleString('es-AR', { month: 'long' });
    let text = document.getElementById("texto-cierre");

    text.innerText = `
    *Cierre de dia: ${dia} de ${mes}*
    `;

    pagos.forEach(item => {
        let texto = item.resumen();
        text.innerText += texto;
    });
    pagos.forEach(item => {
        text.innerText += `*pagos para ${item.lugar}*
        ${item.listarPagos()}\n`;
    });
}

function copiarTexto() {
    const texto = document.getElementById("texto-cierre").innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert(texto);
    }).catch(error => {
        console.error("Error al copiar", error);
    });
}

