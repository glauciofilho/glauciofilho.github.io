document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODAL DE INSTRUÇÕES ---
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('infoModal');

    if (openModalBtn && closeModalBtn && modal) {
        const openModal = () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        };

        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // --- LÓGICA DO SIMULADOR ---
    const form = document.getElementById('form');

    function formatarNumero(valor) {
        const numeroFormatado = parseFloat(valor).toFixed(2);
        const partes = numeroFormatado.split('.');
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return partes.join(',');
    }

    function parcela(preco, taxa, quant) {
        if (quant === 0) return preco;
        if (taxa === 0) return preco / quant;
        return preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    }

    function calcularValores() {
        let valorTotal = parseFloat(document.getElementById('fullprice').value) || 0;
        let desconto = parseFloat(document.getElementById('discont').value) || 0;
        let quantEntrada = parseInt(document.getElementById('quantEntrada').value) || 1;
        let porcentagemEntrada = parseFloat(document.getElementById('porcEntrada').value) || 6;
        let quantBalao = parseInt(document.getElementById('quantBalao').value) || 0;
        let porcentagemBalao = parseFloat(document.getElementById('porcBalao').value) || 0;
        let quantParcela = parseInt(document.getElementById('quantParcela').value) || 0;

        // Validações...
        if (valorTotal < 0 || valorTotal > 10000000) { alert("Essa calculadora permite somente valores positivos até R$ 10.000.000,00"); valorTotal = 500000; }
        if (desconto < 0 || desconto > 100) { alert("O desconto deve estar entre 0 e 100%."); desconto = 0; }
        if (quantEntrada < 1 || quantEntrada > 5) { alert("A quantidade de parcelas da entrada deve ser um número entre 1 e 5."); quantEntrada = Math.min(Math.max(quantEntrada, 1), 5); }
        if (porcentagemEntrada < 6) { alert("A porcentagem da entrada deve ser no mínimo 6."); porcentagemEntrada = 6; }
        if (porcentagemEntrada > 100) { alert("A porcentagem da entrada deve ser no máximo 100."); porcentagemEntrada = 10; }
        if (quantBalao < 0 || quantBalao > 23) { alert("A quantidade de parcelas da balões deve ser um número entre 0 e 23."); quantBalao = Math.min(Math.max(quantBalao, 0), 23); }
        if (quantParcela > 276) { alert("O período de pagamento deve ser menor ou igual a 276 meses."); quantParcela = 276; }
        let periodoPagamento = quantBalao + quantParcela;
        let periodoPagamentoAno = Math.floor(periodoPagamento / 12);
        const plural = periodoPagamentoAno === 1 ? "" : "s";
        if (quantBalao > periodoPagamentoAno) { alert(`O período digitado é de ${periodoPagamentoAno} ano${plural}, portanto ajuste a quantidade de balões.`); quantBalao = periodoPagamentoAno; }
        if (quantBalao === 0) porcentagemBalao = 0;
        if (porcentagemBalao < 0 || porcentagemBalao > 61) { alert("A porcentagem do balão não pode ser maior que 61."); porcentagemBalao = 61; }
        if (porcentagemBalao + porcentagemEntrada > 100) { alert("A soma das porcentagens não pode ser maior que 100%."); porcentagemBalao = 61; porcentagemEntrada = 10; }

        let valorComDesconto = valorTotal * (1 - desconto / 100);
        const porcentagemParcela = 100 - porcentagemBalao - porcentagemEntrada;
        const valorEntrada = (valorComDesconto * porcentagemEntrada / 100) / quantEntrada;
        const valorBalao = parcela(valorComDesconto * (porcentagemBalao / 100), 8 / 100, quantBalao || 1);
        const taxaMensal = ((1 + (8 / 100)) ** (1 / 12)) - 1;
        const valorParcela = parcela(valorComDesconto * (porcentagemParcela / 100), taxaMensal, quantParcela);
        const valorParcela2 = parcela(valorComDesconto * ((porcentagemBalao + porcentagemParcela) / 100), taxaMensal, quantParcela);

        document.getElementById('fullprice').value = valorTotal;
        document.getElementById('discont').value = desconto;
        document.getElementById('quantEntrada').value = quantEntrada;
        document.getElementById('porcEntrada').value = porcentagemEntrada;
        document.getElementById('quantBalao').value = quantBalao;
        document.getElementById('porcBalao').value = porcentagemBalao;
        document.getElementById('quantParcela').value = quantParcela;

        document.getElementById('valor_Entrada').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Balao').innerText = formatarNumero(valorBalao);
        document.getElementById('valor_Parcela').innerText = formatarNumero(valorParcela);
        document.getElementById('valor-Total').innerText = formatarNumero(valorComDesconto);
        document.getElementById('valor-Total-B').innerText = formatarNumero(valorComDesconto);
        document.getElementById('valor_Entrada2').innerText = formatarNumero(valorEntrada);
        document.getElementById('valor_Parcela2').innerText = formatarNumero(valorParcela2);
        document.getElementById('porcParcela').innerText = porcentagemParcela;

        document.getElementById('quant_Entrada').innerText = `ENTRADA (${quantEntrada}X)`;
        document.getElementById('quant_Balao').innerText = `BALÃO (${quantBalao}X)`;
        document.getElementById('quant_Parcela').innerText = `PARCELA (${quantParcela}X)`;
        document.getElementById('quant_Entrada2').innerText = `ENTRADA (${quantEntrada}X)`;
        document.getElementById('quant_Parcela2').innerText = `PARCELA (${quantParcela}X)`;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            calcularValores();
        });
    }

    calcularValores();
});