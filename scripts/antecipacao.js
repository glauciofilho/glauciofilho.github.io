// scripts/antecipacao.js

import { impedirNaoNumericos, limparNaoNumericos, permitirFormatoBR, parseNumeroBR, formatarNumeroBR } from './validadores.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODAL DE INFORMAÇÕES ---
    const infoModal = document.getElementById('infoModalAntecipacao');
    const openInfoBtn = document.getElementById('openInfoBtn');
    const closeInfoBtn = document.getElementById('closeInfoBtn');

    if (infoModal && openInfoBtn && closeInfoBtn) {
        const openModal = () => {
            infoModal.classList.remove('hidden');
            infoModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            infoModal.classList.add('hidden');
            infoModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        };

        openInfoBtn.addEventListener('click', openModal);
        closeInfoBtn.addEventListener('click', closeModal);
        infoModal.addEventListener('click', (event) => {
            if (event.target === infoModal) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !infoModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        openModal();
    }

    // --- ANEXANDO EVENTOS DE VALIDAÇÃO ---
    const inputsDecimais = document.querySelectorAll('#valor-parcela, #juros-parcela, #valor-balao, #juros-balao');
    inputsDecimais.forEach(input => input.addEventListener('input', permitirFormatoBR));

    const inputsInteiros = document.querySelectorAll('#quant-parcela, #quant-balao');
    inputsInteiros.forEach(input => {
        input.addEventListener('keydown', impedirNaoNumericos);
        input.addEventListener('input', limparNaoNumericos);
    });

    // --- LÓGICA DO SIMULADOR ---
    const form = document.getElementById('form-antecipacao');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            calcularAntecipacao();
        });
    }

    function calcularAntecipacao() {
        // --- Cálculo para Parcelas ---
        const valorParcela = parseNumeroBR(document.getElementById('valor-parcela').value);
        const quantParcela = parseInt(document.getElementById('quant-parcela').value) || 0;
        const jurosParcelaAM = parseNumeroBR(document.getElementById('juros-parcela').value) / 100;
        const resultadosParcelasDiv = document.getElementById('resultados-parcelas');
        resultadosParcelasDiv.innerHTML = '';

        for (let i = 1; i <= quantParcela; i++) {
            const valorAdiantado = valorParcela / Math.pow(1 + jurosParcelaAM, i);
            const linha = document.createElement('div');
            linha.className = 'grid grid-cols-3 gap-4 text-center text-white';
            linha.innerHTML = `
                <p>${i}</p>
                <p>R$ ${formatarNumeroBR(valorParcela)}</p>
                <p>R$ ${formatarNumeroBR(valorAdiantado)}</p>
            `;
            resultadosParcelasDiv.appendChild(linha);
        }

        // --- Cálculo para Balões ---
        const valorBalao = parseNumeroBR(document.getElementById('valor-balao').value);
        const quantBalao = parseInt(document.getElementById('quant-balao').value) || 0;
        const jurosContratualAnual = parseNumeroBR(document.getElementById('juros-balao').value) / 100;
        const jurosContratualMensal = Math.pow(1 + jurosContratualAnual, 1/12) - 1;
        const resultadosBalaoDiv = document.getElementById('resultados-balao');
        resultadosBalaoDiv.innerHTML = '';

        for (let i = 1; i <= quantBalao; i++) {
            const mesesParaDesconto = i * 12;
            const valorAdiantado = valorBalao / Math.pow(1 + jurosContratualMensal, mesesParaDesconto);
            const linha = document.createElement('div');
            linha.className = 'grid grid-cols-3 gap-4 text-center text-white';
            linha.innerHTML = `
                <p>${i}</p>
                <p>R$ ${formatarNumeroBR(valorBalao)}</p>
                <p>R$ ${formatarNumeroBR(valorAdiantado)}</p>
            `;
            resultadosBalaoDiv.appendChild(linha);
        }
    }
    
    // Executa um cálculo inicial com os valores padrão ao carregar a página
    calcularAntecipacao();
});