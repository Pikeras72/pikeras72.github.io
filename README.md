# pikeras72.github.io

Portfolio de **Diego Ruiz Piqueras**: <https://pikeras72.github.io>

> Cada proyecto empieza con una pregunta, y casi todos terminan con una más interesante.

Web estática, sin librerías ni paso de compilación: `index.html`, `css/estilo.css`, `js/textos.js` (textos en español) y `js/main.js`.
El idioma por defecto es el inglés; `?lang=es` abre la versión en español.
GitHub Pages la publica tal cual desde la rama `main`.

## Probarla en local

```bash
python -m http.server 8090
```

Y abrir <http://127.0.0.1:8090>.

## De dónde salen los datos de las demos

- **Emporium**: las respuestas del bot están copiadas de su `app.js`.
- **LegofyNet**: las figuras las genera el modelo real (el de TF.js publicado en
  <https://pikeras72.github.io/LegofyNet/>) a partir de estas fotos de Wikimedia Commons:
  - Darth Vader: [Chongkian](https://commons.wikimedia.org/wiki/File:Cosplay_of_Darth_Vader_at_Collector%27s_Hub_2020.jpg), CC BY-SA 4.0
  - Soldado de asalto: [ManoSolo13241324](https://commons.wikimedia.org/wiki/File:Stormtrooper_cosplay.jpg), CC BY-SA 4.0
  - Jawa: [Chris from Th' L.G.](https://commons.wikimedia.org/wiki/File:Jawa_2.jpg), CC BY-SA 2.0
  - Wookiee: [Pikawil](https://commons.wikimedia.org/wiki/File:Montreal_Comiccon_2016_-_Chewbacca_(28145483752).jpg), CC BY-SA 2.0
  - Togruta: [Jay Malone](https://commons.wikimedia.org/wiki/File:Ahsoka_Tano_Cosplay_at_Star_Wars_Celebration_V.jpg), CC BY 2.0

  Las fotos están recortadas y reducidas; las versiones de este repositorio mantienen su licencia.
- **EQUITIA**: las barras son respuestas reales de DeepSeek-R1-Distill-Qwen-7B en
  `docs/resultado_de_ejemplo/resultados.csv`.
- **Three Walls**: es una ilustración del protocolo; el modelo real está en GAMA.
