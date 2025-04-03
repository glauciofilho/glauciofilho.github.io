function formatarNumero(valor) {
    const numeroFormatado = parseFloat(valor).toFixed(2);
    const partes = numeroFormatado.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(',');
}

function calcularValores() {
        let valorTotal = parseFloat(document.getElementById('fullprice').value);
        let desconto = parseFloat(document.getElementById('discont').value);
        let quantEntrada = parseInt(document.getElementById('quantEntrada').value);
        let porcentagemEntrada = parseFloat(document.getElementById('porcEntrada').value);
        let quantBalao = parseFloat(document.getElementById('quantBalao').value);
        let porcentagemBalao = parseFloat(document.getElementById('porcBalao').value);
        let quantParcela = parseInt(document.getElementById('quantParcela').value);

        if (isNaN(valorTotal)) {
            valorTotal = 0;
            document.getElementById('fullprice').value = valorTotal;
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
        if (isNaN(quantBalao)) {
            quantBalao = 0;
            document.getElementById('quantBalao').value = quantBalao;
        }
        if (isNaN(porcentagemBalao)) {
            porcentagemBalao = 0;
            document.getElementById('porcBalao').value = porcentagemBalao;
        }
        if (isNaN(quantParcela)) {
            quantParcela = 0;
            document.getElementById('quantParcela').value = quantParcela;
        }
        if (valorTotal < 0 || valorTotal > 10000000) {
            alert("Essa calculadora permite somente valores positivos até R$ 10.000.000,00");
            valorTotal = 500000;
            document.getElementById('fullprice').value = valorTotal;
        }
        if (desconto < 0 || desconto > 100) {
            alert("O desconto deve estar entre 0 e 100%.");
            desconto = 0;
            document.getElementById('discont').value = desconto;
        }
        if (quantEntrada < 1 || quantEntrada > 5) {
            alert("A quantidade de parcelas da entrada deve ser um número entre 1 e 5.");
            quantEntrada = Math.min(Math.max(quantEntrada, 1), 5);
            document.getElementById('quantEntrada').value = quantEntrada;
        }
        if (porcentagemEntrada < 6) {
            alert("A porcentagem da entrada deve ser no mínimo 6.");
<<<<<<< HEAD
            porcentagemEntrada = 6;
=======
            porcentagemEntrada = 10;
>>>>>>> be82425b7d361784ef4f5f4f08ab8d38863626cf
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }
        if (porcentagemEntrada > 100) {
            alert("A porcentagem da entrada deve ser no máximo 100.");
            porcentagemEntrada = 10;
            document.getElementById('porcEntrada').value = porcentagemEntrada;
        }
        if (quantBalao < 0 || quantBalao > 23) {
            alert("A quantidade de parcelas da balões deve ser um número entre 0 e 23.");
            quantBalao = Math.min(Math.max(quantEntrada, 1), 23);
            document.getElementById('quantBalao').value = quantBalao;
        }
        if (quantParcela > 276) {
            alert("O período de pagamento deve ser menor ou igual a 276 meses.");
            quantParcela = Math.min(Math.max(quantParcela, 0), 276);
            document.getElementById('quantParcela').value = periodoPagamento;
        }
        periodoPagamentoAno=Math.round((quantBalao+quantParcela)/12);
        if (periodoPagamentoAno*12>periodoPagamento){
            periodoPagamentoAno=periodoPagamentoAno-1;
        }
        if(periodoPagamentoAno==1){
            plural="";
        }else{
            plural="s";
        }
        if (quantBalao > periodoPagamentoAno) {
            alert("O periodo digitado é de "+periodoPagamentoAno+" ano"+plural+", portanto coloque a quuantidade de balões coerente.");
            quantBalao = periodoPagamentoAno;
            document.getElementById('quantBalao').value = quantBalao;
        }
        if (quantBalao == 0) {
            porcentagemBalao = 0;
            document.getElementById('porcBalao').value = porcentagemBalao;
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
        let quantBalao1;
        if (quantBalao == 0){
            quantBalao1 = 1
        }else{
            quantBalao1 = quantBalao
        };
        valorTotal = valorTotal*(100-desconto)/100;
        const porcentagemParcela = 100 - porcentagemBalao - porcentagemEntrada;
        const valorEntrada = (valorTotal * porcentagemEntrada / 100) / quantEntrada;
        const valorBalao = parcela(valorTotal * (porcentagemBalao / 100), 8 / 100, quantBalao1);
        const valorParcela = parcela(valorTotal * (porcentagemParcela / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcelas);
        const valorParcela2 = parcela(valorTotal * ((porcentagemBalao + porcentagemParcela) / 100), ((1 + (8 / 100)) ** (1 / 12)) - 1, quantParcelas);

        document.getElementById('valor_Entrada').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Balao').innerText = formatarNumero(valorBalao);
        document.getElementById('valor_Parcela').innerText = formatarNumero(valorParcela);
        document.getElementById('valor-Total').innerText = formatarNumero(valorTotal);
        document.getElementById('valor_Entrada2').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Parcela2').innerText = formatarNumero(valorParcela2);
        document.getElementById('quantBalao').innerText = quantBalao;
        document.getElementById('quantParcela').innerText = quantParcelas;
        document.getElementById('porcParcela').innerText = porcentagemParcela;
        document.getElementById('quant_Entrada').innerText = "ENTRADA (" + quantEntrada + "X)";
        document.getElementById('quant_Balao').innerText = "BALÃO (" + quantBalao + "X)";
        document.getElementById('quant_Parcela').innerText = "PARCELA (" + quantParcelas + "X)";
        document.getElementById('quant_Entrada2').innerText = "ENTRADA (" + quantEntrada + "X)";
        document.getElementById('quant_Parcela2').innerText = "PARCELA (" + quantParcelas + "X)";
        window.scrollTo({top:0, behavior: 'smooth'});
}

function parcela(preco, taxa, quant) {
    const parcela = preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    return parcela;
}