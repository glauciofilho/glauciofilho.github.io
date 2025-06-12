// scripts/validadores.js

export function impedirNaoNumericos(event) {
    if (event.ctrlKey || event.metaKey) return;
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (allowedKeys.includes(event.key)) return;
    if (/\d/.test(event.key)) return;
    event.preventDefault();
}

export function limparNaoNumericos(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
}

export function permitirFormatoBR(event) {
    event.target.value = event.target.value.replace(/[^0-9,.]/g, '');
}

export function parseNumeroBR(stringBR) {
    if (!stringBR || typeof stringBR !== 'string') return 0;
    const valor = parseFloat(stringBR.replace(/\./g, '').replace(',', '.'));
    return isNaN(valor) ? 0 : valor;
}

export function formatarNumeroBR(valor) {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return "0,00";
    return numero.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}