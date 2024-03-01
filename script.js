const form = document.getElementById("form");
const fullprice = document.getElementById("fullprice");
const paytime = document.getElementById("paytime");
const discont = document.getElementById("discont");
const quantEntrada = document.getElementById("quantEntrada");
const porcEntrada = document.getElementById("porcEntrada");
const quantBalao = document.getElementById("quantBalao");
const porcBalao = document.getElementById("porcBalao");
const quantParcela = document.getElementById("quantParcela");
const porcParcela = document.getElementById("porcParcela");

form.addEventListener("input", (event) =>{
    event.preventDefault();

})

function formatarMoeda(input) {
    let valor = input.value;
    valor = valor.replace(/\D/g, '');
    valor = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    input.value = valor;
}

function checkInputFullprice (){
    const fullpriceValue = fullprice.value;
}