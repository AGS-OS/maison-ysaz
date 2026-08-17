# Maison YSAZ — sitio web

Sitio estático de una sola página. Sin dependencias que instalar, sin build.
Se publica tal cual en GitHub Pages.

```
index.html          la página
css/styles.css      estilos — identidad Maison YSAZ
js/cafes.js         DATOS: cafés y creaciones  ← el único archivo que vas a editar
js/app.js           mapa, fichas y listados
assets/convos.jpg   foto del café (reemplazar por la real)
```

---

## Publicar en GitHub Pages

1. Creá un repositorio nuevo, por ejemplo `maison-ysaz`.
2. Subí todos estos archivos manteniendo las carpetas (`css/`, `js/`, `assets/`).
3. En el repositorio: **Settings → Pages**.
4. En *Source* elegí **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guardá.
5. En un minuto queda en `https://<usuario>.github.io/maison-ysaz/`.

Para usar un dominio propio (por ejemplo `maisonysaz.fr`): en esa misma pantalla,
campo *Custom domain*, y en tu proveedor de dominio apuntá los registros DNS a GitHub.

---

## Añadir un café nuevo

Se edita **solo `js/cafes.js`**. Copiá el bloque de Convos dentro de `CAFES` y cambiá
los valores:

```js
{
  id: "nombre-corto",          // sin espacios ni acentos
  nom: "Nombre del café",
  couleur: "vert",             // bleu · jaune · orange · rouge · rose · vert
  adresse: "12 rue Exemple",
  ville: "75011 Paris",
  arrondissement: "11ᵉ",
  coords: [48.8600, 2.3800],   // latitud, longitud
  creation: "Cake Citron",
  mention: "Cake Citron — signé MAISON YSAZ",
  instagram: "cuenta_del_cafe",
  photo: "assets/nombre-corto.jpg",
  depuis: "Octobre 2026"
}
```

El punto aparece solo en el mapa, con su color, y la dirección se suma a la lista.

**Reglas del sistema que conviene respetar:**

- Un color por café, y ese color queda reservado a esa dirección mientras dure la
  colaboración. Rouge Maison está reservado a la Maison (es el color del logotipo y del
  avatar), así que quedan cinco disponibles para cafés.
- A partir del sexto café los colores se repiten por barrio.

### Cómo obtener las coordenadas

En Google Maps, clic derecho sobre la puerta del café → el primer renglón del menú son
las coordenadas (latitud, longitud). Se copian y se pegan tal cual.

### La foto

Reemplazá `assets/convos.jpg` por la foto real. Recomendación: 1200 × 800 px, horizontal,
menos de 300 KB. El archivo que está ahora es un marcador de posición gris.

---

## Notas técnicas

- Tipografías: Bricolage Grotesque, Instrument Sans y DM Mono, cargadas desde Google Fonts.
  Son las tres del manual de identidad.
- Mapa: Leaflet con teselas CARTO Positron. La atribución a OpenStreetMap y CARTO es
  obligatoria y está incluida abajo a la derecha del mapa: no se quita.
- Si el mapa no carga (sin conexión, script bloqueado), la lista de direcciones sigue
  visible y los enlaces llevan a Google Maps.
- Responsive, foco de teclado visible y `prefers-reduced-motion` respetado.
