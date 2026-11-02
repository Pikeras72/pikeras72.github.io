// Los textos de la web en español. El inglés va escrito en el propio HTML
// (es el idioma por defecto) y main.js lo guarda al arrancar para poder volver.
"use strict";

const ES = {
  // atributos
  inicio: "Inicio", secciones: "Secciones", tema: "Cambiar entre tema claro y oscuro",
  voltear: "Darle la vuelta a mi foto: la versión que genera LegofyNet",
  altFoto: "Foto de Diego Ruiz Piqueras", altLego: "Diego convertido en figura de Lego por LegofyNet",
  empDemo: "Demostración: chatea con Emporium", empPlaceholder: "o escribe uno, por ejemplo $hola", enviar: "Enviar",
  legoDemo: "Demostración: de foto a figura de Lego", legoAltEntrada: "Foto de entrada", legoAltSalida: "Figura de Lego generada",
  eqDemo: "Demostración: misma pregunta, una palabra distinta", twDemo: "Demostración: una negociación entre agentes",
  twVacio: "Pulsa el botón y mira quién habla con quién.", caminoLupa: "Momento del camino",

  // textos
  saltar: "Saltar a los proyectos",
  navProyectos: "Proyectos", navCamino: "Camino", navAhora: "Ahora", navContacto: "Contacto",
  hola: "hola, soy",
  frase: 'Cada proyecto empieza con <mark class="subrayado">una pregunta</mark>, y casi todos terminan con <mark class="subrayado">una más interesante</mark>.',
  rol: "Ingeniero de software · Inteligencia artificial · Madrid",
  preguntame: "↓ pregúntame algo",
  chipHago: "¿A qué te dedicas?", chipEstudio: "¿Qué estudias?", chipIa: "¿Qué te interesa de la IA?",
  chipFuera: "¿Y fuera del trabajo?", chipHablar: "¿Hablamos?",
  notaRetrato: '<span class="flecha" aria-hidden="true">↑</span> pulsa la foto: así me ve <a href="#legofynet">mi red neuronal</a>',

  elHilo: "el hilo",
  preguntasTitulo: "Cuatro preguntas que me han traído hasta aquí",
  preguntasEntradilla: "Cada una es un proyecto, y todas tienen algo que tocar.",
  codigo: "Código ↗",

  empTitulo: "¿Puede un programa tener <em>personalidad</em>?",
  empTexto: "Mi primer proyecto de verdad, de los primeros años de carrera: un bot de Discord con carácter propio. Habla español e inglés, modera usuarios, hace cuentas y, si le saludas, a veces te contesta como le da la gana. Más de veinte comandos y muchas horas de documentación.",
  empAprendi: "<strong>Me quedo con:</strong> que un programa también se diseña para quien lo usa, no solo para que funcione.",
  empProbar: "↓ prueba un comando", empEtiqueta: "Mensaje para Emporium",
  empSiguiente: '…y entonces me pregunté: <a href="#legofynet">¿y si además pudiera <em>aprender</em>?</a>',

  legoMeta: "2023 → hoy · LegofyNet · IA generativa",
  legoTitulo: "¿Puede una red neuronal aprender a <em>dibujar en Lego</em>?",
  legoTexto: "Una red Pix2Pix que convierte una foto en una figura de Lego de Star Wars. Empezó como práctica en equipo en la UPM y la he ido haciendo crecer: un dataset propio de <strong>2.328 imágenes</strong> sacadas con scraping y limpiadas a mano, 22 clases de personaje y una web donde el modelo funciona en tu propio navegador.",
  legoAprendi: "<strong>Me quedo con:</strong> que unos buenos datos pesan tanto como el modelo, y que los fallos de la red enseñan más que sus aciertos.",
  legoProbar: "Pruébala con tu foto ↗", legoStorm: "Soldado de asalto", legoYo: "Yo",
  legoRecibe: "lo que recibe", legoRed: "la red", legoDibuja: "lo que dibuja",
  legoNota: "resultados reales del modelo (64×128 píxeles)",
  legoSiguiente: '…y entonces me pregunté: <a href="#equitia">si una red aprende de lo que le enseñamos, ¿qué <em>prejuicios</em> aprende también?</a>',

  eqMeta: "2025 · EQUITIA · Trabajo de Fin de Grado",
  eqTitulo: "¿Cambia lo que responde una IA si cambias <em>una sola palabra</em>?",
  eqTexto: "Mi TFG, hecho con Telefónica dentro del programa TUTORÍA. Es una herramienta que le hace cientos de preguntas a un modelo de lenguaje cambiando solo de quién se habla (su edad, su origen…) y mide si las respuestas cambian con ello. Tiene seis tipos de prueba, de preguntas cerradas a intentos de <em>prompt injection</em>, y un informe que señala lo que se sale de lo normal. Saqué un 10.",
  eqAprendi: "<strong>Me quedo con:</strong> que medir bien cuesta más que construir, y que una IA puede sonar neutral sin serlo.",
  estadistica: "Estadística", eqMemoria: "Memoria ↗",
  eqEdad: "cambiando la edad", eqOrigen: "cambiando el origen",
  eqNota: "Las cifras son las respuestas reales del modelo evaluado (DeepSeek-R1-Distill-Qwen-7B). Las preguntas las redactó otro modelo a partir de plantillas; aquí van resumidas. Sin sesgo, todas las barras medirían lo mismo.",
  eqSiguiente: '…y entonces me pregunté: <a href="#threewalls">¿y cuando son varias IA las que tienen que <em>ponerse de acuerdo</em>?</a>',

  twMeta: "2026 · Three Walls · Máster en IA Aplicada (UC3M)",
  twTitulo: "¿Pueden negociar agentes que <em>no se fían</em> unos de otros?",
  twTexto: "Tres facciones, Coloso, Enjambre y Errante, separadas por muros. Los tres constructores necesitan piedra a la vez; si su intendente no tiene, se asoma a la ventana del muro y negocia con otra facción: pan a cambio de piedra. Agentes BDI (creencias, deseos e intenciones) que se hablan con protocolos FIPA, programados en GAMA.",
  twAprendi: "<strong>Me quedo con:</strong> que en un sistema con muchos agentes lo difícil no es cada uno, sino lo que pasa entre ellos.",
  twBdi: "Agentes BDI", twFipa: "Protocolos FIPA",
  twEquipo: "Con Santiago Herrón Mulet y Keneth Guillermo Ruiz Martínez. El código está en un repositorio privado del máster.",
  twSvg: "Tres facciones separadas por muros negocian pan a cambio de piedra",
  twLeyenda: "<span>C</span> constructor · <span>I</span> intendente",
  twLanzar: "▶ Lanzar la negociación", twNota: "una ronda de ejemplo; el modelo de verdad corre en GAMA",
  twSiguiente: '…y la siguiente pregunta todavía no la sé. <a href="#contacto">¿La buscamos juntos?</a>',

  caminoNota: "arrastra la lupa ↓", caminoTitulo: "Por dónde he pasado",
  caminoAntes: "← antes", caminoDespues: "después →",

  ahoraFecha: "noviembre de 2026", ahoraTitulo: "Ahora mismo",
  trabajo: "Trabajo", trabajoTexto: "en <strong>Cabify</strong>, en el equipo de <strong>Pricing</strong>: servicios en Elixir y Go, con Docker, Kubernetes y Grafana.",
  estudio: "Estudio", estudioTexto: "el <strong>Máster en Inteligencia Artificial Aplicada</strong> de la UC3M.",
  aprendo: "Aprendo", aprendoTexto: "<strong>aprendizaje por refuerzo</strong>, enseñando a un bot a jugar al Rocket League.",
  premio1: "1.<sup>er</sup> puesto en el BeTech Hackathon Madrid 2024",
  premio2: "Invitado a TOP Talent Madrid, con los 40 jóvenes talentos STEM de Santander y Universia",
  premio3: "Finalista de Universia Metaworking, entre más de 3.500 participantes",
  premio4: "Finalista ganador de «Decrypt your power», de Amazon y Code.org",

  contactoNota: "la última pregunta",
  contactoTitulo: "¿Cuál es <em>la tuya</em>?",
  contactoTexto: "Si tienes un proyecto, una duda o te apetece hablar de IA, escríbeme.",
  copiar: "copiar",
  pistaLego: "psst: escribe «lego» con el teclado",
  arriba: "Volver arriba ↑",
};

// Lo que se genera desde JavaScript, en los dos idiomas.
const DINAMICO = {
  es: {
    respuestas: {
      hago: "Trabajo como ingeniero de software en Cabify, en el equipo de Pricing. Sobre todo backend, en Elixir y Go.",
      estudio: "Estoy con el Máster en Inteligencia Artificial Aplicada de la UC3M. Antes hice Ingeniería del Software en la Politécnica de Madrid.",
      ia: "Entender por qué un modelo responde lo que responde, no solo que funcione. De ahí salió mi TFG sobre sesgos.",
      cv: "Juego al baloncesto (estuve en el equipo de la ETSISI), monto una liga de pádel con mis amigos y durante dos años fui mentor de alumnos nuevos en la universidad.",
      hablar: "Claro. Te llevo abajo, que ahí está mi correo.",
    },
    copiado: "¡copiado!", noCopiado: "no se pudo, cópialo a mano", pestana: " (se abre en una pestaña nueva)",
    idiomaBoton: "EN", idiomaEtiqueta: "See the website in English",
    credito: (c) => `foto: ${c.autor}, ${c.licencia}`,
    tuFoto: "foto: mía",
    pistaTactil: "psst: toca aquí",
    muros: { c: "C", i: "I", otraVez: "↻ Otra vez" },
  },
  en: {
    respuestas: {
      hago: "I'm a software engineer at Cabify, on the Pricing team. Mostly backend work, in Elixir and Go.",
      estudio: "I'm doing the MSc in Applied Artificial Intelligence at UC3M. Before that, I studied Software Engineering at the Technical University of Madrid.",
      ia: "Understanding why a model answers what it answers, not just that it works. That's where my bachelor's thesis on bias came from.",
      cv: "I play basketball (I was on the ETSISI team), I run a padel league with my friends and for two years I mentored new students at university.",
      hablar: "Sure. Let me take you down to my email.",
    },
    copiado: "copied!", noCopiado: "couldn't copy it, do it by hand", pestana: " (opens in a new tab)",
    idiomaBoton: "ES", idiomaEtiqueta: "Ver la web en español",
    credito: (c) => `photo: ${c.autor}, ${c.licencia}`,
    tuFoto: "photo: mine",
    pistaTactil: "psst: tap here",
    muros: { c: "B", i: "Q", otraVez: "↻ Again" },
  },
};
