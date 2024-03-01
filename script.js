function formatarNumero(valor) {
    // Arredondar o número para duas casas decimais
    const numeroFormatado = parseFloat(valor).toFixed(2);
    // Separar o milhar por "."
    // Substituir o separador decimal por ","
    const partes = numeroFormatado.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(',');
}

function calcularValores() {
    const fullprice = parseFloat(document.getElementById('fullprice').value);
    const paytime = parseInt(document.getElementById('paytime').value);
    const discont = parseFloat(document.getElementById('discont').value);
    const quantEntrada = parseInt(document.getElementById('quantEntrada').value);
    const porcEntrada = parseFloat(document.getElementById('porcEntrada').value);
    const quantBalao = parseInt(document.getElementById('quantBalao').value);
    const porcBalao = parseFloat(document.getElementById('porcBalao').value);
    const quantParcela = parseInt(document.getElementById('quantParcela').value);
    const porcParcela = parseFloat(document.getElementById('porcParcela').value);

    const total = fullprice * (1 - (discont / 100));
    const entrada = (total * porcEntrada / 100) / quantEntrada;
    const balao = parcela(total * (porcBalao / 100), 8/100, quantBalao);
    const parcelaValor = parcela(total* (porcParcela / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcela);
    const parcelaValor2 = parcela(total* ((porcBalao+porcParcela) / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcela);

    document.getElementById('valor_Entrada').innerText = formatarNumero(entrada);
    document.getElementById('valor_Balao').innerText = formatarNumero(balao);
    document.getElementById('valor_Parcela').innerText = formatarNumero(parcelaValor);
    document.getElementById('valor-Total').innerText = formatarNumero(total);
    document.getElementById('valor_Entrada2').innerText = formatarNumero(entrada);
    document.getElementById('valor_Parcela2').innerText = formatarNumero(parcelaValor2);
}

function parcela(preco, taxa, quant) {
    const parcela = preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    return parcela;
}

document.getElementById('fullprice').addEventListener('input', calcularValores);
document.getElementById('paytime').addEventListener('input', calcularValores);
document.getElementById('discont').addEventListener('input', calcularValores);
document.getElementById('quantEntrada').addEventListener('input', calcularValores);
document.getElementById('porcEntrada').addEventListener('input', calcularValores);
document.getElementById('quantBalao').addEventListener('input', calcularValores);
document.getElementById('porcBalao').addEventListener('input', calcularValores);
document.getElementById('quantParcela').addEventListener('input', calcularValores);
document.getElementById('porcParcela').addEventListener('input', calcularValores);

calcularValores();