let timeoutId;

function formatarNumero(valor) {
    const numeroFormatado = parseFloat(valor).toFixed(2);
    const partes = numeroFormatado.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(',');
}

function calcularValores() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        const fullprice = parseFloat(document.getElementById('fullprice').value);
        let paytime = parseInt(document.getElementById('paytime').value);
        let discont = parseFloat(document.getElementById('discont').value);
        let quantEntrada = parseInt(document.getElementById('quantEntrada').value);
        let porcEntrada = parseFloat(document.getElementById('porcEntrada').value);
        let porcBalao = parseFloat(document.getElementById('porcBalao').value);
        let porcParcela = parseFloat(document.getElementById('porcParcela').value);

        if (isNaN(fullprice)) {
            fullprice = 0;
            document.getElementById('fullprice').value = fullprice;
        }
        
        if (isNaN(paytime)) {
            paytime = 0;
            document.getElementById('paytime').value = paytime;
        }

        if (isNaN(discont)) {
            discont = 0;
            document.getElementById('discont').value = discont;
        }

        if (isNaN(quantEntrada)) {
            quantEntrada = 0;
            document.getElementById('quantEntrada').value = quantEntrada;
        }

        if (isNaN(porcEntrada)) {
            porcEntrada = 0;
            document.getElementById('porcEntrada').value = porcEntrada;
        }

        if (isNaN(porcBalao)) {
            porcBalao = 0;
            document.getElementById('porcBalao').value = porcBalao;
        }

        if (isNaN(porcParcela)) {
            porcParcela = 0;
            document.getElementById('porcParcela').value = porcParcela;
        }        
        
        if (paytime < 1 || paytime > 23) {
            alert("A quantidade de tempo de pagamento deve ser entre 1 e 23.");
            paytime = Math.min(Math.max(paytime, 1), 23);
            document.getElementById('paytime').value = paytime;
        }

        if (discont < 0 || discont > 100) {
            alert("Disconto tem que ser entre 0 e 100%.");
            discont = 0;
            document.getElementById('discont').value = discont;
        }

        if (quantEntrada < 1 || quantEntrada > 4) {
            alert("A quantidade de entrada deve ser um número entre 1 e 4.");
            quantEntrada = Math.min(Math.max(quantEntrada, 1), 4);
            document.getElementById('quantEntrada').value = quantEntrada;
        }

        if (porcEntrada < 10) {
            alert("A porcentagem de entrada deve ser no mínimo 10.");
            porcEntrada = 10;
            document.getElementById('porcEntrada').value = porcEntrada;
        }

        if (porcEntrada > 100) {
            alert("A porcentagem de entrada deve ser no máximo 100.");
            porcEntrada = 10;
            document.getElementById('porcEntrada').value = porcEntrada;
        }
        
        if (porcBalao < 0 || porcBalao > 61 ) {
            alert("A porcentagem de balão não pode ser maior que 61.");
            porcBalao = 61;
            document.getElementById('porcBalao').value = porcBalao;
        }

        if (porcBalao + porcEntrada > 100 ) {
            alert("A soma das porcentagens não pode ser maior que 100% do valor.");
            porcBalao = 61;
            porcEntrada = 10;
            document.getElementById('porcBalao').value = porcBalao;
            document.getElementById('porcEntrada').value = porcEntrada;
        }

        const somaPorcentagens = porcEntrada + porcBalao + porcParcela;
        if (somaPorcentagens !== 100) {
            porcParcela = 100 - porcBalao - porcEntrada;
            document.getElementById('porcParcela').value = porcParcela;
        }

        const quantParcelaElement = document.getElementById('quantParcela');
        quantParcelaElement.value = paytime * 12 - quantEntrada;

        const quantBalaoElement = document.getElementById('quantBalao');
        quantBalaoElement.innerText = paytime;

        const total = fullprice * (1 - (discont / 100));
        const entrada = (total * porcEntrada / 100) / quantEntrada;
        const balao = parcela(total * (porcBalao / 100), 8 / 100, paytime);
        const parcelaValor = parcela(total * (porcParcela / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, paytime * 12 - quantEntrada);
        const parcelaValor2 = parcela(total * ((porcBalao + porcParcela) / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, paytime * 12 - quantEntrada);

        document.getElementById('valor_Entrada').innerText = formatarNumero(entrada);
        document.getElementById('valor_Balao').innerText = formatarNumero(balao);
        document.getElementById('valor_Parcela').innerText = formatarNumero(parcelaValor);
        document.getElementById('valor-Total').innerText = formatarNumero(total);
        document.getElementById('valor_Entrada2').innerText = formatarNumero(entrada);
        document.getElementById('valor_Parcela2').innerText = formatarNumero(parcelaValor2);
        document.getElementById('quantBalao').innerText = paytime;
        document.getElementById('quantParcela').innerText = paytime*12-quantEntrada;
        document.getElementById('porcParcela').innerText = formatarNumero(100-porcEntrada-porcBalao);
        document.getElementById('quant_Entrada').innerText = "ENTRADA ("+quantEntrada)+"X)";
        document.getElementById('quant_Balao').innerText = "BALÃO ("+paytime+"X)";
        document.getElementById('quant_Parcela').innerText = "PARCELA ("+paytime*12-quantEntrada+"X)";
    }, 500);
}

function parcela(preco, taxa, quant) {
    const parcela = preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    return parcela;
}

document.getElementById('fullprice').addEventListener('input', calcularValores);
document.getElementById('paytime').addEventListener('input', function () {
    calcularValores();
});
document.getElementById('discont').addEventListener('input', calcularValores);
document.getElementById('quantEntrada').addEventListener('input', function () {
    calcularValores();
});
document.getElementById('porcEntrada').addEventListener('input', function () {
    calcularValores();
});
document.getElementById('porcBalao').addEventListener('input', function () {
    calcularValores();
});

calcularValores();
