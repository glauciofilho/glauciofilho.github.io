function formatarNumero(valor) {
    const numeroFormatado = parseFloat(valor).toFixed(2);
    const partes = numeroFormatado.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(',');
}

function calcularValores() {
        let valorTotal = parseFloat(document.getElementById('fullprice').value);
        let periodoPagamento = parseInt(document.getElementById('paytime').value);
        let desconto = parseFloat(document.getElementById('discont').value);
        let quantEntrada = parseInt(document.getElementById('quantEntrada').value);
        let porcentagemEntrada = parseFloat(document.getElementById('porcEntrada').value);
        let porcentagemBalao = parseFloat(document.getElementById('porcBalao').value);

        if (isNaN(valorTotal)) {
            valorTotal = 0;
            document.getElementById('fullprice').value = valorTotal;
        }
        if (isNaN(periodoPagamento)) {
            periodoPagamento = 0;
            document.getElementById('paytime').value = periodoPagamento;
        }
        if (isNaN(desconto)) {
            desconto = 0;
            document.getElementById('discont').value = desconto;
        }
        if (isNaN(quantEntrada)) {
            quantEntrada = 0;
            document.getElementById('quantEntrada').value = quantEntrada;
        }
        if (isNaN(porcentagemEntrada)) {
            porcentagemEntrada = 0;
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }
        if (isNaN(porcentagemBalao)) {
            porcentagemBalao = 0;
            document.getElementById('porcBalao').value = porcentagemBalao;
        }
        if (valorTotal < 0 || valorTotal > 10000000) {
            alert("Essa calculadora permite somente valores positivos até R$ 10.000.000,00");
            valorTotal = 300000;
            document.getElementById('fullprice').value = valorTotal;
        }
        if (periodoPagamento < 1 || periodoPagamento > 23) {
            alert("O período de pagamento deve estar entre 1 e 23 anos.");
            periodoPagamento = Math.min(Math.max(periodoPagamento, 1), 23);
            document.getElementById('paytime').value = periodoPagamento;
        }
        if (desconto < 0 || desconto > 100) {
            alert("O desconto deve estar entre 0 e 100%.");
            desconto = 0;
            document.getElementById('discont').value = desconto;
        }
        if (quantEntrada < 1 || quantEntrada > 4) {
            alert("A quantidade de parcelas da entrada deve ser um número entre 1 e 4.");
            quantEntrada = Math.min(Math.max(quantEntrada, 1), 4);
            document.getElementById('quantEntrada').value = quantEntrada;
        }
        if (porcentagemEntrada < 10) {
            alert("A porcentagem da entrada deve ser no mínimo 10.");
            porcentagemEntrada = 10;
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }
        if (porcentagemEntrada > 100) {
            alert("A porcentagem da entrada deve ser no máximo 100.");
            porcentagemEntrada = 10;
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }
        if (porcentagemBalao < 0 || porcentagemBalao > 61 ) {
            alert("A porcentagem do balão não pode ser maior que 61.");
            porcentagemBalao = 61;
            document.getElementById('porcBalao').value = porcentagemBalao;
        }
        if (porcentagemBalao + porcentagemEntrada > 100 ) {
            alert("A soma das porcentagens não pode ser maior que 100% do valor.");
            porcentagemBalao = 61;
            porcentagemEntrada = 10;
            document.getElementById('porcBalao').value = porcentagemBalao;
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }

        const porcentagemParcela = 100 - porcentagemBalao - porcentagemEntrada;
        const quantParcelas = periodoPagamento * 12 - quantEntrada;
        const valorEntrada = (valorTotal * porcentagemEntrada / 100) / quantEntrada;
        const valorBalao = parcela(valorTotal * (porcentagemBalao / 100), 8 / 100, periodoPagamento);
        const valorParcela = parcela(valorTotal * (porcentagemParcela / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcelas);
        const valorParcela2 = parcela(valorTotal * ((porcentagemBalao + porcentagemParcela) / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcelas);

        document.getElementById('valor_Entrada').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Balao').innerText = formatarNumero(valorBalao);
        document.getElementById('valor_Parcela').innerText = formatarNumero(valorParcela);
        document.getElementById('valor-Total').innerText = formatarNumero(valorTotal);
        document.getElementById('valor_Entrada2').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Parcela2').innerText = formatarNumero(valorParcela2);
        document.getElementById('quantBalao').innerText = periodoPagamento;
        document.getElementById('quantParcela').innerText = quantParcelas;
        document.getElementById('porcParcela').innerText = porcentagemParcela;
        document.getElementById('quant_Entrada').innerText = "ENTRADA (" + quantEntrada + "X)";
        document.getElementById('quant_Balao').innerText = "BALÃO (" + periodoPagamento + "X)";
        document.getElementById('quant_Parcela').innerText = "PARCELA (" + quantParcelas + "X)";
        document.getElementById('quant_Entrada2').innerText = "ENTRADA (" + quantEntrada + "X)";
        document.getElementById('quant_Parcela2').innerText = "PARCELA (" + quantParcelas + "X)";
}

function parcela(preco, taxa, quant) {
    const parcela = preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    return parcela;
}
