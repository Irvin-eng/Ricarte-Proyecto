# Ricarte-Proyecto (Ghost Internet)

Ghost Internet es una maqueta educativa de una suite de herramientas de ciberseguridad enfocada en evaluación de contraseñas, verificación de correos, simulador de riesgos y estadísticas públicas.

## Stack
- Lenguajes: HTML, CSS, JavaScript
- Librería: Chart.js (CDN para gráficas)
- Deploy: pensado para GitHub Pages (sitio estático)

## Estructura propuesta
```
/index.html
/estadisticas.html
/evaluacion_contrasena.html
/verificar_correo.html
/perfil_de_riesgo.html
/registrarse.html
/simulador.html
/css/
  index.css
  compartido.css
  variables_globales.css
  estadisticas.css
/js/
  index.js
  estadisticas.js
/svg/
README.md
```

## Cómo ejecutar localmente
1. Clona el repositorio:
   `git clone https://github.com/Irvin-eng/Ricarte-Proyecto.git`
2. Entra en la carpeta y arranca un servidor local:
   `cd Ricarte-Proyecto`
   `python -m http.server 8000`
3. Abre `http://localhost:8000` en tu navegador.

## Cambios aplicados (resumen)
- Normalización de nombres de archivos (minúsculas, sin tildes/ñ) para evitar problemas de codificación y rutas.
- Reorganización de CSS en `/css` y JS en `/js`.
- Correcciones en rutas de recursos en todos los HTML.
- Reemplazo de `JS/Index.JS` por `js/index.js` (null-safe) y `JS/Estadisticas.js` por `js/estadisticas.js` con comprobación de Chart.js.
- Corrección de typo de variable `--color-rosa-fosforecente`.
- Mejoras de accesibilidad: skip-link, aria-expanded para menús, aria-current en enlaces activos.
- Añadido meta description y Open Graph tags.
- README profesional generado.

## Notas y recomendaciones finales
- Revisa los contenidos SVG y los `alt` si algunos iconos deben ser ocultos a lectores de pantalla (`aria-hidden`) o descriptivos.
- Añadir una licencia (MIT) si quieres que sea público y reutilizable.
- Si vas a desplegar en GitHub Pages, activa Pages desde la rama `main` y la raíz (`/`) como fuente.

