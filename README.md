# Trivial Multiedad (Familia)

Juego tipo **Trivial** listo para subir a GitHub y ejecutar en cualquier navegador (incluido **Safari**).

- **Multiedad:** soporta tres rangos: 5 años, 10 años y 18+.
- **Multijugador ilimitado:** añade tantos jugadores como quieras en la pantalla de inicio.
- **Categorías equilibradas:** 5 categorías con **100 preguntas cada una** (total **500**). En cada turno el juego rota la categoría para que **ningún tema tenga más peso**.
- **Preguntas aleatorias y sin repeticiones.**
- **Vanilla HTML/CSS/JS** (sin dependencias), pensado para máxima compatibilidad.

## Estructura

```
/
├─ index.html      # App de una página
├─ styles.css      # Estilos
├─ app.js          # Lógica del juego + generador de banco de 500 preguntas
└─ README.md
```

## Uso

1. Sube estos archivos a un repo de GitHub (o a GitHub Pages).
2. Abre `index.html` en el navegador.
3. En la pantalla de configuración, añade jugadores y elige el rango de edad para cada uno.
4. Pulsa **Comenzar**. El turno rota por jugadores y categorías. Pulsa **Siguiente** para avanzar.

> Opcional: puedes establecer un número de puntos para ganar. Si lo dejas vacío, la partida no tiene límite y podéis parar cuando queráis.

## Compatibilidad

- Código probado con características ampliamente soportadas por **Safari, Chrome, Firefox y Edge**.
- No usa módulos, ni *build step*, ni *fetch* de ficheros locales (todo está embebido en `app.js`) para evitar problemas de seguridad en `file://`.
- Estilos compatibles con modo claro/oscuro.

## Personalización rápida

- Cambia o amplía las preguntas dentro de `app.js` (funciones `genScience`, `genHistory`, `genGeography`, `genArts`, `genSports`). 
- Si añades categorías, actualiza el array `CATEGORIES`.

## Licencia

MIT
