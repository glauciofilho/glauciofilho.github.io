// scripts/parcelamento.js

import { impedirNaoNumericos, limparNaoNumericos, permitirFormatoBR, parseNumeroBR, formatarNumeroBR } from './validadores.js';

document.addEventListener('DOMContentLoaded', () => {

    // ANEXANDO EVENTOS DE VALIDAÇÃO
    const valorInput = document.getElementById('fullprice');
    if (valorInput) {
        valorInput.addEventListener('input', permitirFormatoBR);
    }
    
    const inputsInteiros = document.querySelectorAll(
        '#discont, #quantEntrada, #porcEntrada, #quantBalao, #porcBalao, #quantParcela'
    );
    inputsInteiros.forEach(input => {
        input.addEventListener('keydown', impedirNaoNumericos);
        input.addEventListener('input', limparNaoNumericos);
    });

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

    // Função Price (já existente)
    function parcelaPrice(preco, taxa, quant) {
        if (quant === 0) return 0;
        if (taxa === 0) return preco / quant;
        return preco * (taxa * ((1 + taxa) ** quant)) / (((1 + taxa) ** quant) - 1);
    }

    function calcularValores(metodo = 'price') {
        let valorTotal = parseNumeroBR(document.getElementById('fullprice').value);
        let desconto = parseInt(document.getElementById('discont').value) || 0;
        let quantEntrada = parseInt(document.getElementById('quantEntrada').value) || 1;
        let porcentagemEntrada = parseInt(document.getElementById('porcEntrada').value) || 6;
        let quantBalao = parseInt(document.getElementById('quantBalao').value) || 0;
        let porcentagemBalao = parseInt(document.getElementById('porcBalao').value) || 0;
        let quantParcela = parseInt(document.getElementById('quantParcela').value) || 0;

        // Validações (Mantidas do seu código)
        if (valorTotal < 0 || valorTotal > 100000000) { alert("Valor inválido"); valorTotal = 500000; }
        document.getElementById('fullprice').innerText = formatarNumeroBR(valorTotal);
        if (quantEntrada > 5) quantEntrada = 5;
        if (quantEntrada < 0) quantEntrada = 1;
        document.getElementById('quantEntrada').innerText = quantEntrada;
        if (porcentagemEntrada < 8) porcentagemEntrada = 8;
        document.getElementById('porcEntrada').innerText = porcentagemEntrada;
        if (porcentagemEntrada + porcentagemBalao > 100) { alert("Soma das % excede 100"); porcentagemBalao = 0; }
        document.getElementById('porcBalao').innerText = porcentagemBalao;

        let valorComDesconto = valorTotal * (1 - desconto / 100);
        const porcentagemParcela = 100 - porcentagemBalao - porcentagemEntrada;

        const valorEntradaUnica = (valorComDesconto * porcentagemEntrada / 100) / quantEntrada;

        const taxaMensal = ((1 + (8 / 100)) ** (1 / 12)) - 1;

        let vParcela, vParcela2, valorBalao;

        if (metodo === 'gradient') {
            // Cálculo Gradiente
            vParcela = parcelaPrice(valorComDesconto * (porcentagemParcela / 100), 0, quantParcela);
            vParcela2 = parcelaPrice(valorComDesconto * ((porcentagemBalao + porcentagemParcela) / 100), 0, quantParcela);
            valorBalao = parcelaPrice(valorComDesconto * (porcentagemBalao / 100), 0, quantBalao || 1);

            // No gradiente, avisamos que é o valor INICIAL
            document.getElementById('amortizacao').innerText = `GRADIENTE`;
            document.getElementById('quant_Parcela').innerText = `PARCELA INICIAL (${quantParcela}X)`;
            document.getElementById('quant_Parcela2').innerText = `PARCELA INICIAL (${quantParcela}X)`;
            document.getElementById('quant_Balao').innerText = `BALÃO (${quantBalao}X)`;
        } else {
            // Cálculo Price (Original)
            vParcela = parcelaPrice(valorComDesconto * (porcentagemParcela / 100), taxaMensal, quantParcela);
            vParcela2 = parcelaPrice(valorComDesconto * ((porcentagemBalao + porcentagemParcela) / 100), taxaMensal, quantParcela);
            valorBalao = parcelaPrice(valorComDesconto * (porcentagemBalao / 100), 8 / 100, quantBalao || 1);

            document.getElementById('amortizacao').innerText = `PRICE`;
            document.getElementById('quant_Parcela').innerText = `PARCELA (${quantParcela}X)`;
            document.getElementById('quant_Parcela2').innerText = `PARCELA (${quantParcela}X)`;
            document.getElementById('quant_Balao').innerText = `BALÃO (${quantBalao}X)`;
        }

        // Atualização da UI
        document.getElementById('fullprice').value = formatarNumeroBR(valorTotal);
        document.getElementById('valor_Entrada').innerText = formatarNumeroBR(valorEntradaUnica);
        document.getElementById('valor_Balao').innerText = formatarNumeroBR(valorBalao);
        document.getElementById('valor_Parcela').innerText = formatarNumeroBR(vParcela);
        document.getElementById('valor-Total').innerText = formatarNumeroBR(valorComDesconto);
        document.getElementById('valor-Total-B').innerText = formatarNumeroBR(valorComDesconto);
        document.getElementById('valor_Entrada2').innerText = formatarNumeroBR(valorEntradaUnica);
        document.getElementById('valor_Parcela2').innerText = formatarNumeroBR(vParcela2);
        document.getElementById('porcParcela').innerText = porcentagemParcela;

        document.getElementById('quant_Entrada').innerText = `ENTRADA (${quantEntrada}X)`;
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Identifica qual botão foi clicado através do submitter
            const metodo = event.submitter ? event.submitter.value : 'price';
            calcularValores(metodo);
        });
    }
})
