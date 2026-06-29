/* js/index.js — Comportamiento de la página de inicio (corregido, null-safe) */

const LINES = [
  "$ ghost-net --init",
  "Conectando a red segura...",
  "Analizando vulnerabilidades...",
  "Escaneando brechas de datos...",
  "Sistema listo. Bienvenido.",
];

const TYPE_SPEED = 38;   // ms per char
const PAUSE_BETWEEN_LINES = 220; // ms between lines

let textoTerminalEl = null;
let cursorTerminalEl = null;
let estadisticasTerminalEl = null;

let rowIndex = 0;
let charIndex = 0;
let accumulatedText = "";

function writeTerminal() {
  if (!textoTerminalEl || !cursorTerminalEl || !estadisticasTerminalEl) return;

  if (rowIndex >= LINES.length) {
    cursorTerminalEl.style.display = "none";
    estadisticasTerminalEl.style.display = "block";
    return;
  }

  const currentLine = LINES[rowIndex];

  if (charIndex < currentLine.length) {
    accumulatedText += currentLine[charIndex];
    textoTerminalEl.textContent = accumulatedText;
    charIndex++;
    setTimeout(writeTerminal, TYPE_SPEED);
  } else {
    accumulatedText += "\n";
    textoTerminalEl.textContent = accumulatedText;
    rowIndex++;
    charIndex = 0;
    setTimeout(writeTerminal, PAUSE_BETWEEN_LINES);
  }
}

function initModuleCardHover() {
  const cards = document.querySelectorAll(".tarjeta-modulo");
  if (!cards) return;
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("tarjeta-modulo--elevada"));
    card.addEventListener("mouseleave", () => card.classList.remove("tarjeta-modulo--elevada"));
  });
}

function initialize() {
  textoTerminalEl = document.getElementById("texto-terminal");
  cursorTerminalEl = document.getElementById("cursor-terminal");
  estadisticasTerminalEl = document.getElementById("estadisticas-terminal");

  if (textoTerminalEl && cursorTerminalEl && estadisticasTerminalEl) {
    writeTerminal();
  } else {
    if (cursorTerminalEl) cursorTerminalEl.style.display = "none";
  }

  initModuleCardHover();

  // accessible submenu toggle
  const toggle = document.querySelector('.menu-desplegable__toggle');
  const submenu = document.getElementById('submenu-herramientas');
  if (toggle && submenu) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      submenu.setAttribute('aria-hidden', String(expanded));
    });
  }
}

document.addEventListener("DOMContentLoaded", initialize);
