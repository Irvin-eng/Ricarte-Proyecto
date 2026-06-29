/* js/estadisticas.js — ligero guard guard si Chart no está cargado */
if (typeof Chart === 'undefined') {
  console.warn('Chart.js no está disponible — las gráficas no se inicializarán.');
} else {
  /* ===== CONFIGURACIÓN GLOBAL DE CHART.JS ===== */
  Chart.defaults.color       = "#5D8A9C";
  Chart.defaults.borderColor = "rgba(0, 253, 135, 0.07)";
  Chart.defaults.font.family = "'Courier New', monospace";
  Chart.defaults.font.size   = 11;

  const ETIQUETAS_ANOS = ["'16", "'17", "'18", "'19", "'20", "'21", "'22", "'23", "'24"];
  const DATOS_BRECHAS   = [1093, 1579, 1257, 1473, 3950, 5212, 4145, 3205, 4245];
  const DATOS_REGISTROS = [1378, 1947, 446, 15100, 37000, 18800, 22400, 29000, 35000];

  const ETIQUETAS_SERVICIOS = ["RockYou24", "Yahoo", "LinkedIn", "Facebook", "Adobe", "Dropbox"];
  const DATOS_SERVICIOS     = [10000, 3000, 700, 533, 153, 68];
  const COLORES_SERVICIOS   = ["#f92837", "#f7823e", "#00C8FB", "#ef4ce9", "#ffb800", "#00FD87"];

  const DATOS_TIPOS_COMPROMETIDOS = [
    { etiqueta: "Contraseñas", porcentaje: 38, color: "#f92837" },
    { etiqueta: "Emails",      porcentaje: 28, color: "#00C8FB" },
    { etiqueta: "Nombres",     porcentaje: 15, color: "#00FD87" },
    { etiqueta: "Teléfonos",   porcentaje: 10, color: "#ffb800" },
    { etiqueta: "Tarjetas",    porcentaje:  5, color: "#ef4ce9" },
    { etiqueta: "Otros",       porcentaje:  4, color: "#606B5F" },
  ];

  const ESTILO_TOOLTIP = {
    backgroundColor: "#0a1e2e",
    borderColor:     "rgba(0, 253, 135, 0.25)",
    borderWidth:     1,
    titleColor:      "#d8edf7",
    bodyColor:       "#5D8A9C",
    padding:         10,
  };

  function inicializarGraficaTendencia() {
    const lienzo = document.getElementById("grafica-tendencia");
    if (!lienzo) return;

    new Chart(lienzo, {
      type: "line",
      data: {
        labels: ETIQUETAS_ANOS,
        datasets: [
          {
            label: "Brechas",
            data: DATOS_BRECHAS,
            borderColor:     "#00FD87",
            backgroundColor: "rgba(0, 253, 135, 0.06)",
            borderWidth:     2,
            pointRadius:     3,
            pointBackgroundColor: "#00FD87",
            fill:    true,
            tension: 0.35,
          },
          {
            label:           "Registros (M)",
            data:            DATOS_REGISTROS,
            borderColor:     "#00C8FB",
            backgroundColor: "rgba(0, 200, 251, 0.04)",
            borderWidth:     2,
            pointRadius:     3,
            pointBackgroundColor: "#00C8FB",
            fill:       true,
            tension:    0.35,
            borderDash: [5, 3],
            yAxisID:    "ejeDerecho",
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend:  { labels: { color: "#5D8A9C", boxWidth: 12 } },
          tooltip: ESTILO_TOOLTIP,
        },
        scales: {
          x: { grid:  { color: "rgba(0, 253, 135, 0.05)" }, ticks: { color: "#5D8A9C" } },
          y: { grid:  { color: "rgba(0, 253, 135, 0.05)" }, ticks: { color: "#5D8A9C" }, title: { display: true, text: "Brechas", color: "#5D8A9C" } },
          ejeDerecho: { position: "right", grid: { display: false }, ticks: { color: "#00C8FB" }, title: { display: true, text: "Registros (M)", color: "#00C8FB" } },
        },
      },
    });
  }

  function inicializarGraficaBarras() {
    const lienzo = document.getElementById("grafica-barras");
    if (!lienzo) return;

    new Chart(lienzo, {
      type: "bar",
      data: { labels: ETIQUETAS_SERVICIOS, datasets: [{ label: "Millones de registros", data: DATOS_SERVICIOS, backgroundColor: COLORES_SERVICIOS, borderRadius: 4, borderSkipped: false }] },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...ESTILO_TOOLTIP, callbacks: { label: function(ctx){ return ' ' + ctx.parsed.x + 'M registros'; } } }
        },
        scales: { x: { grid:{ color: "rgba(0, 253, 135, 0.05)" }, ticks:{ color: "#5D8A9C" } }, y: { grid:{ display: false }, ticks:{ color: "#d8edf7" } } }
      }
    });
  }

  function inicializarGraficaPastel() {
    const lienzo = document.getElementById("grafica-pastel");
    if (!lienzo) return;

    new Chart(lienzo, {
      type: "doughnut",
      data: { labels: DATOS_TIPOS_COMPROMETIDOS.map(d=>d.etiqueta), datasets: [{ data: DATOS_TIPOS_COMPROMETIDOS.map(d=>d.porcentaje), backgroundColor: DATOS_TIPOS_COMPROMETIDOS.map(d=>d.color), borderWidth: 2, borderColor: "#0a1e2e", hoverOffset: 6 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: "55%", plugins: { legend: { display: false }, tooltip: { ...ESTILO_TOOLTIP, callbacks: { label: function(ctx){ return ' ' + ctx.parsed + '%'; } } } } }
    });

    generarLeyendaPastel();
  }

  function generarLeyendaPastel(){
    const cont = document.getElementById('leyenda-pastel'); if(!cont) return;
    DATOS_TIPOS_COMPROMETIDOS.forEach(d=>{
      const el = document.createElement('div'); el.className='leyenda-pastel__elemento';
      const p = document.createElement('span'); p.className='leyenda-pastel__punto'; p.style.backgroundColor = d.color;
      const t = document.createElement('span'); t.className='leyenda-pastel__texto'; t.textContent = d.etiqueta + ' ('+d.porcentaje+'%)';
      el.appendChild(p); el.appendChild(t); cont.appendChild(el);
    });
  }

  function inicializar(){ inicializarGraficaTendencia(); inicializarGraficaBarras(); inicializarGraficaPastel(); }
  document.addEventListener('DOMContentLoaded', inicializar);
}
