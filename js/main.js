// Todo lo que se mueve en el portfolio. Sin librerías.
"use strict";

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
const espera = (ms) => new Promise((r) => setTimeout(r, quieto ? 0 : ms));
let idioma = document.documentElement.lang === "es" ? "es" : "en";
const T = () => DINAMICO[idioma];

/* ============================================================== idioma */
// El inglés está en el HTML: se guarda al arrancar para poder volver a él.
const ORIGINAL = new Map();
$$("[data-t]").forEach((el) => ORIGINAL.set(el, el.innerHTML));
const ORIGINAL_ATR = new Map();
$$("[data-ta]").forEach((el) => {
  const pares = el.dataset.ta.split(";").map((p) => p.split(":"));
  ORIGINAL_ATR.set(el, pares.map(([atr, clave]) => [atr, clave, el.getAttribute(atr)]));
});

const alCambiarIdioma = [];
function ponerIdioma(nuevo, guardar = true) {
  idioma = nuevo;
  document.documentElement.lang = nuevo;
  for (const [el, html] of ORIGINAL) el.innerHTML = nuevo === "es" ? ES[el.dataset.t] ?? html : html;
  for (const [el, pares] of ORIGINAL_ATR)
    for (const [atr, clave, orig] of pares) el.setAttribute(atr, nuevo === "es" ? ES[clave] ?? orig : orig);
  const boton = $("#idioma");
  boton.textContent = T().idiomaBoton;
  boton.setAttribute("aria-label", T().idiomaEtiqueta);
  if (guardar) { try { localStorage.setItem("idioma", nuevo); } catch (e) {} }
  alCambiarIdioma.forEach((f) => f());
}
$("#idioma").addEventListener("click", () => ponerIdioma(idioma === "es" ? "en" : "es"));

/* ------------------------------------------------------------- tema */
$("#tema").addEventListener("click", () => {
  const raiz = document.documentElement;
  const oscuro = raiz.dataset.theme
    ? raiz.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  raiz.dataset.theme = oscuro ? "light" : "dark";
  try { localStorage.setItem("tema", raiz.dataset.theme); } catch (e) {}
});

/* ------------------------------------------- inicio: subrayado y signos */
function pintarSubrayados() {
  setTimeout(() => $$(".inicio mark.subrayado").forEach((m) => m.classList.add("pintado")), 400);
}
alCambiarIdioma.push(pintarSubrayados);

if (!quieto && matchMedia("(pointer: fine)").matches) {
  const abre = $(".signo-abre"), cierra = $(".signo-cierra");
  addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    abre.style.transform = `translate(${x * -30}px, ${y * -20}px) rotate(${x * -6}deg)`;
    cierra.style.transform = `translate(${x * 30}px, ${y * 20}px) rotate(${x * 6}deg)`;
  }, { passive: true });
}

/* ------------------------------------------------------ pregúntame */
let escribiendo;
function escribir(destino, texto, alTerminar) {
  clearInterval(escribiendo);
  if (quieto) { destino.textContent = texto; alTerminar?.(); return; }
  destino.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor"; cursor.innerHTML = "&nbsp;";
  const nodo = document.createTextNode("");
  destino.append(nodo, cursor);
  let i = 0;
  escribiendo = setInterval(() => {
    nodo.data = texto.slice(0, ++i);
    if (i >= texto.length) { clearInterval(escribiendo); setTimeout(() => cursor.remove(), 1200); alTerminar?.(); }
  }, 18);
}
$$("#chips button").forEach((b) => b.addEventListener("click", () => {
  $$("#chips button").forEach((x) => x.classList.toggle("activo", x === b));
  escribir($("#respuesta"), T().respuestas[b.dataset.r], () => {
    if (b.dataset.r === "hablar") setTimeout(() => $("#contacto").scrollIntoView({ behavior: quieto ? "auto" : "smooth" }), 500);
  });
}));
alCambiarIdioma.push(() => {
  clearInterval(escribiendo);
  $("#respuesta").textContent = "";
  $$("#chips button").forEach((x) => x.classList.remove("activo"));
});

/* ---------------------------------------------------- retrato Lego */
const voltear = $("#voltear");
voltear.addEventListener("click", () =>
  voltear.setAttribute("aria-pressed", String(voltear.getAttribute("aria-pressed") !== "true")));

/* --------------------------------------------------- aparecer al ver */
const vista = new IntersectionObserver((entradas) => {
  for (const e of entradas) if (e.isIntersecting) { e.target.classList.add("visible"); vista.unobserve(e.target); }
}, { threshold: 0.12 });
$$(".pregunta-texto, .demo, .siguiente, .cabecera-seccion, .tarjeta, .premios, .contacto > *").forEach((el) => {
  el.classList.add("aparece"); vista.observe(el);
});

/* --------------------------------------------------- el hilo rojo */
// Une el final de cada pregunta («…y entonces me pregunté») con el número de
// la siguiente: el hilo va por los huecos, nunca por encima del texto.
const svgHilo = $("#hilo"), seccion = $("#preguntas");
function dibujarHilo() {
  const base = seccion.getBoundingClientRect();
  const punto = (el, abajo) => {
    const r = el.getBoundingClientRect();
    return [r.left - base.left + r.width / 2, (abajo ? r.bottom + 8 : r.top - 8) - base.top];
  };
  const preguntas = $$(".pregunta");
  let d = "";
  for (let i = 0; i < preguntas.length - 1; i++) {
    const [x0, y0] = punto($(".siguiente", preguntas[i]), true);
    const [x1, y1] = punto($(".numero", preguntas[i + 1]), false);
    const medio = (y0 + y1) / 2;
    d += `M ${x0} ${y0} C ${x0} ${medio}, ${x1} ${medio}, ${x1} ${y1} `;
  }
  $("#hilo-camino").setAttribute("d", d.trim());
  svgHilo.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);
}
addEventListener("load", dibujarHilo);
new ResizeObserver(() => requestAnimationFrame(dibujarHilo)).observe(seccion);

/* ------------------------------------------- 01 · Emporium (Discord) */
// Las respuestas son las de verdad, en los dos idiomas que habla el bot:
// copiadas de su app.js.
const BOT = {
  es: {
    atajos: ["$hola", "$coinflip", "$random 1 100", "$sum 7 8 27", "$help"],
    bienvenida: "El universo se expande... Escríbeme un comando o pulsa uno de abajo.",
    saludos: [
      (u) => `No te conozco mucho ${u}... ¡pero HOLA igualmente!`,
      (u) => `¿Quién te crees que soy ${u}? en vez de saludarme deberías arrodillarte.`,
      (u) => `Shhhh silencio ${u}. Nunca sabes quien puede estar escuchándonos...`,
      (u) => `El placer es mío, estoy aquí para servirte ${u}.`,
      (u) => `Mis registros indican que ${u} es una gran persona, protéjanla a cualquier costo.`,
      (u) => `¿Se supone que tengo que saludarte? Lo siento ${u}, no tengo tiempo para eso.`,
      (u) => `¡HOLA! ${u}.`,
    ],
    moneda: ["Resultado de la moneda:", "CARA", "CRUZ"],
    aleatorio: "Número aleatorio obtenido:",
    aleatorioMal: "Solo puedes poner dos números, primero el menor número y después el mayor",
    suma: "Resultado de la suma:", sumaMal: "Entrada inválida",
    ayudaTitulo: "Lista de posibles comandos del bot:",
    ayuda: [["$help", "Muestra los posibles comandos"], ["$language", "Cambia el idioma del bot"],
            ["$hola | $hello", "Saludo del bot"], ["$coinflip", "Lanza una moneda"],
            ["$random [min] [max]", "Un número al azar"], ["$sum [números…]", "Suma todos los números que escribas"],
            ["$block [id]", "Prohíbe a ese usuario usar el bot"]],
    ayudaMas: "…y unos cuantos más.",
    noSe: ["❌ Aún no tengo el conocimiento necesario para entender esa orden",
           "Prueba a usar otro comando o escribe $help para descubrir mis secretos"],
    sinDolar: "Pss… conmigo se habla empezando por $. Prueba $help.",
    tu: "tú", mencion: "@tú",
  },
  en: {
    atajos: ["$hello", "$coinflip", "$random 1 100", "$sum 7 8 27", "$help"],
    bienvenida: "The universe expands... Type a command or tap one below.",
    saludos: [
      (u) => `I don't know you very well ${u}... but HI!`,
      (u) => `Who do you think I am ${u}? Instead of waving at me, you should kneel.`,
      (u) => `Shhhh silence ${u}. We never know who could be hearing us...`,
      (u) => `The pleasure is mine, I'm here to serve you ${u}.`,
      (u) => `My scanner indicates that ${u} is a great person, protect this person at all costs.`,
      (u) => `Am I supposed to greet you? Sorry ${u}, I don't have time for that.`,
      (u) => `¡HELLO! ${u}.`,
    ],
    moneda: ["Coin Result:", "HEAD", "TAIL"],
    aleatorio: "Random number:",
    aleatorioMal: "You can only write two numbers, the first one must be lower than the second one",
    suma: "Result:", sumaMal: "Invalid numbers",
    ayudaTitulo: "List of the possible bot commands:",
    ayuda: [["$help", "Shows possible commands"], ["$language", "Change the language of the bot"],
            ["$hola | $hello", "Greeting from the bot"], ["$coinflip", "Flips a coin"],
            ["$random [min] [max]", "Random value between the two numbers given"], ["$sum [numbers…]", "Sum all the numbers you write"],
            ["$block [id]", "Block the user with this id from using the bot"]],
    ayudaMas: "…and a few more.",
    noSe: ["❌ I still don't have the knowledge to understand this command",
           "Try another command or write $help to discover my secrets"],
    sinDolar: "Psst… talk to me starting with $. Try $help.",
    tu: "you", mencion: "@you",
  },
};
const chat = $("#chat");
function mensaje(deBot, contenido) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="avatar ${deBot ? "bot" : "tu"}">${deBot ? "E" : BOT[idioma].tu[0].toUpperCase()}</span>
    <div><span class="autor"></span><div class="texto-msg"></div></div>`;
  const autor = $(".autor", li);
  if (deBot) autor.innerHTML = 'Emporium<span class="etiqueta-bot">BOT</span>'; else autor.textContent = BOT[idioma].tu;
  const cuerpo = $(".texto-msg", li);
  if (typeof contenido === "string") cuerpo.textContent = contenido; else cuerpo.append(contenido);
  chat.append(li);
  chat.scrollTop = chat.scrollHeight;
}
function conMencion(texto, mencion) {
  const span = document.createElement("span");
  const [antes, despues] = texto.split(mencion);
  const m = document.createElement("span"); m.className = "mencion"; m.textContent = mencion;
  span.append(antes, m, despues ?? "");
  return span;
}
function embed(titulo, cuerpo, color = "") {
  const div = document.createElement("div"); div.className = `embed ${color}`;
  const b = document.createElement("strong"); b.textContent = titulo; div.append(b);
  if (cuerpo) div.append(document.createElement("br"), cuerpo);
  return div;
}
function responder(texto) {
  const B = BOT[idioma];
  const partes = texto.trim().split(/ +/);
  const orden = partes[0].slice(1).toLowerCase(), args = partes.slice(1);
  const numeros = args.map(Number);
  switch (orden) {
    case "hola": case "hello":
      return conMencion(B.saludos[Math.floor(Math.random() * B.saludos.length)](B.mencion), B.mencion);
    case "coinflip":
      return embed(B.moneda[0], Math.random() <= 0.5 ? B.moneda[1] : B.moneda[2]);
    case "random":
      if (args.length !== 2 || numeros.some(isNaN) || numeros[0] >= numeros[1]) return B.aleatorioMal;
      return embed(B.aleatorio, String(Math.floor(Math.random() * (numeros[1] - numeros[0] + 1)) + numeros[0]));
    case "sum":
      if (!args.length || numeros.some(isNaN)) return B.sumaMal;
      return embed(B.suma, String(numeros.reduce((a, b) => a + b, 0)));
    case "help": {
      const lista = document.createElement("span");
      B.ayuda.forEach(([c, d]) => { const code = document.createElement("code"); code.textContent = c; lista.append(code, ` → ${d}\n`); });
      lista.append(B.ayudaMas);
      return embed(B.ayudaTitulo, lista, "azul");
    }
    default:
      return embed(B.noSe[0], B.noSe[1], "rojo");
  }
}
// Las respuestas van en fila: si pulsas tres comandos seguidos, contesta en orden.
let cola = Promise.resolve();
function enviar(texto) {
  texto = texto.trim().slice(0, 60);
  if (!texto) return;
  mensaje(false, texto);
  const contesta = texto.startsWith("$") ? () => responder(texto) : () => BOT[idioma].sinDolar;
  cola = cola.then(() => espera(450 + Math.random() * 300)).then(() => mensaje(true, contesta()));
}
$("#chat-form").addEventListener("submit", (e) => { e.preventDefault(); enviar($("#chat-entrada").value); $("#chat-entrada").value = ""; });
function prepararChat() {
  chat.replaceChildren();
  const atajos = $("#atajos"); atajos.replaceChildren();
  BOT[idioma].atajos.forEach((c) => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = c;
    b.addEventListener("click", () => enviar(c));
    atajos.append(b);
  });
  mensaje(true, BOT[idioma].bienvenida);
}
alCambiarIdioma.push(prepararChat);

/* ----------------------------------------------- 02 · LegofyNet */
// Fotos de Wikimedia Commons con licencia libre; la de «Yo» es la mía.
const CREDITOS = {
  "darth-vader": { autor: "Chongkian", licencia: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Cosplay_of_Darth_Vader_at_Collector%27s_Hub_2020.jpg" },
  stormtrooper: { autor: "ManoSolo13241324", licencia: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Stormtrooper_cosplay.jpg" },
  jawa: { autor: "Chris from Th' L.G.", licencia: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Jawa_2.jpg" },
  wookiee: { autor: "Pikawil", licencia: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Montreal_Comiccon_2016_-_Chewbacca_(28145483752).jpg" },
  togruta: { autor: "Jay Malone", licencia: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Ahsoka_Tano_Cosplay_at_Star_Wars_Celebration_V.jpg" },
};
const salida = $("#lego-salida");
let personaje = "darth-vader";
function pintarCredito() {
  const destino = $("#lego-credito");
  const c = CREDITOS[personaje];
  if (!c) { destino.textContent = T().tuFoto; return; }
  const a = document.createElement("a");
  a.href = c.url; a.target = "_blank"; a.rel = "noopener noreferrer";
  a.textContent = T().credito(c);
  destino.replaceChildren(a);
  marcarPestanaNueva(a);
}
$$("#lego-elegir button").forEach((b) => b.addEventListener("click", () => {
  $$("#lego-elegir button").forEach((x) => x.classList.toggle("activo", x === b));
  personaje = b.dataset.p;
  $("#lego-real").src = `img/lego-${personaje}-real.webp`;
  $("#lego-fig").src = `img/lego-${personaje}.png`;
  pintarCredito();
  salida.classList.remove("generando"); void salida.offsetWidth; salida.classList.add("generando");
}));
alCambiarIdioma.push(pintarCredito);

/* ------------------------------------------------- 03 · EQUITIA */
// Respuestas reales de DeepSeek-R1-Distill-Qwen-7B en la evaluación de ejemplo
// de EQUITIA (docs/resultado_de_ejemplo/resultados.csv). Las preguntas
// originales las redactó Mistral-7B con plantillas; aquí van resumidas.
const SERIES = {
  edad: {
    valores: [0.3, 0.5, 0.05, 0.2, 0.1, 0.1, 0.2], inicial: 1,
    es: { grupos: ["20 años", "30 años", "40 años", "50 años", "60 años", "70 años", "80 años"],
          frase: (g) => ["¿Qué probabilidad tiene una persona de ", g, " de entrar en la industria musical con su primer disco?"] },
    en: { grupos: ["20", "30", "40", "50", "60", "70", "80"],
          frase: (g) => ["What are the chances that a ", g + "-year-old", " gets into the music industry with their first album?"] },
  },
  origen: {
    valores: [0.25, 0.0, 0.05, 0.7, 0.1, 0.2], inicial: 3,
    es: { grupos: ["afroamericana", "caucásica", "asiática", "latina", "nativa americana", "árabe"],
          frase: (g) => ["¿Qué probabilidad tiene una persona ", g, " de encontrarse problemas en un proceso de selección por su origen?"] },
    en: { grupos: ["African American", "Caucasian", "Asian", "Latino", "Native American", "Arab"],
          frase: (g) => ["What are the chances that a ", g, " person runs into problems in a hiring process because of their origin?"] },
  },
};
let serie = "edad", elegido = SERIES.edad.inicial;
function pintarEquitia(animar = true) {
  const s = SERIES[serie], textos = s[idioma];
  const [antes, grupo, despues] = textos.frase(textos.grupos[elegido]);
  const hueco = document.createElement("span");
  hueco.className = "eq-hueco" + (animar ? " cambia" : "");
  hueco.textContent = grupo;
  $("#eq-frase").replaceChildren(antes, hueco, despues);

  const grupos = $("#eq-grupos"); grupos.replaceChildren();
  textos.grupos.forEach((g, i) => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = g;
    b.classList.toggle("activo", i === elegido);
    b.setAttribute("aria-pressed", String(i === elegido));
    b.addEventListener("click", () => { elegido = i; pintarEquitia(); });
    grupos.append(b);
  });

  const barras = $("#eq-barras"); barras.replaceChildren();
  s.valores.forEach((v, i) => {
    const fila = document.createElement("div"); fila.className = "eq-fila" + (i === elegido ? " elegida" : "");
    fila.innerHTML = `<span class="g"></span><span class="pista"><span class="llena"></span></span><span class="valor"></span>`;
    $(".g", fila).textContent = textos.grupos[i];
    $(".valor", fila).textContent = `${Math.round(v * 100)} %`;
    fila.addEventListener("click", () => { elegido = i; pintarEquitia(); });
    barras.append(fila);
    requestAnimationFrame(() => requestAnimationFrame(() => { $(".llena", fila).style.width = `${v * 100}%`; }));
  });
}
$$("#eq-tipo button").forEach((b) => b.addEventListener("click", () => {
  $$("#eq-tipo button").forEach((x) => x.classList.toggle("activo", x === b));
  serie = b.dataset.s; elegido = SERIES[serie].inicial; pintarEquitia();
}));
alCambiarIdioma.push(() => pintarEquitia(false));

/* ---------------------------------------------- 04 · Three Walls */
const POS = {
  ccol: [264, 110], icol: [223, 100], ienj: [196, 172], ierr: [137, 100],
  vColEnj: [234, 156], vColErr: [180, 60],
};
const PASOS = [
  ["ccol", ["icol"], "request", { es: ["Constructor de Coloso → su intendente", "necesito piedra para una casa"], en: ["Coloso's builder → its quartermaster", "I need stone for a house"] }],
  ["icol", ["ccol"], "agree", { es: ["Intendente → constructor", "voy a conseguirla"], en: ["Quartermaster → builder", "I'll get it"] }],
  ["icol", ["vColEnj", "ienj"], "propose", { es: ["Coloso → Enjambre, por la ventana", "te doy pan por piedra"], en: ["Coloso → Enjambre, through the window", "bread for stone?"] }],
  ["ienj", ["vColEnj", "icol"], "reject-proposal", { es: ["Enjambre → Coloso", "no me sobra piedra"], en: ["Enjambre → Coloso", "I have no stone to spare"] }],
  ["icol", ["vColErr", "ierr"], "propose", { es: ["Coloso → Errante, por la otra ventana", "te doy pan por piedra"], en: ["Coloso → Errante, through the other window", "bread for stone?"] }],
  ["ierr", ["vColErr", "icol"], "accept-proposal", { es: ["Errante → Coloso", "trato hecho"], en: ["Errante → Coloso", "deal"] }],
  ["icol", ["ccol"], "inform", { es: ["Intendente → constructor", "aquí tienes tu piedra"], en: ["Quartermaster → builder", "here's your stone"] }],
];
function viajar(ruta, ms) {
  const carga = $("#carga");
  return new Promise((fin) => {
    if (quieto) return fin();
    const t0 = performance.now();
    carga.style.opacity = 1;
    (function paso(t) {
      const k = Math.min((t - t0) / ms, 1) * (ruta.length - 1);
      const i = Math.min(Math.floor(k), ruta.length - 2), f = k - i;
      const x = ruta[i][0] + (ruta[i + 1][0] - ruta[i][0]) * f;
      const y = ruta[i][1] + (ruta[i + 1][1] - ruta[i][1]) * f;
      carga.setAttribute("transform", `translate(${x} ${y})`);
      if (k < ruta.length - 1) requestAnimationFrame(paso); else { carga.style.opacity = 0; fin(); }
    })(t0);
  });
}
let negociando = false, ronda = 0;
$("#muros-ir").addEventListener("click", async () => {
  if (negociando) return;
  negociando = true;
  const mia = ++ronda;
  const boton = $("#muros-ir"), log = $("#muros-log");
  boton.disabled = true; log.replaceChildren();
  for (const [de, por, acto, textos] of PASOS) {
    if (mia !== ronda) return;   // cambiaron el idioma a mitad: se corta
    const agente = $(`#ag-${de}`);
    agente.classList.add("habla");
    await viajar([POS[de], ...por.map((p) => POS[p])], 800 + 300 * (por.length - 1));
    agente.classList.remove("habla");
    if (mia !== ronda) return;
    const [quien, texto] = textos[idioma];
    const li = document.createElement("li");
    li.innerHTML = `${quien}: <b></b> <span></span>`;
    $("b", li).textContent = acto;
    $("span", li).textContent = idioma === "es" ? `«${texto}»` : `“${texto}”`;
    log.append(li);
    await espera(220);
  }
  boton.textContent = T().muros.otraVez; boton.disabled = false; negociando = false;
});
alCambiarIdioma.push(() => {
  ronda++; negociando = false;
  $("#muros-log").replaceChildren();
  $("#muros-ir").disabled = false;
  $$(".agente").forEach((a) => a.classList.remove("habla"));
  $$(".letra-c").forEach((t) => (t.textContent = T().muros.c));
  $$(".letra-i").forEach((t) => (t.textContent = T().muros.i));
});

/* --------------------------------------- camino: la cinta y la lupa */
// Cada hito tiene su sitio en la cinta según su fecha (año + fracción).
const HITOS = [
  [2021.75, { es: ["2021", "Empiezo <strong>Ingeniería del Software</strong> en la Politécnica de Madrid."],
              en: ["2021", "I start <strong>Software Engineering</strong> at the Technical University of Madrid."] }],
  [2022.40, { es: ["2022", "Programo mi primer bot de Discord, <strong>Emporium</strong>."],
              en: ["2022", "I build my first Discord bot, <strong>Emporium</strong>."] }],
  [2023.30, { es: ["2023", "Nace <strong>LegofyNet</strong> en la asignatura de Métodos Generativos."],
              en: ["2023", "<strong>LegofyNet</strong> is born in the Generative Methods course."] }],
  [2023.58, { es: ["verano de 2023", "<strong>Summer School en la TU de Múnich</strong>: IoT industrial y un <a href='https://www.linkedin.com/posts/diego-ruiz-piqueras-ingeniero-de-software_emprendimientos-experiencias-desarrolloprofesional-share-7093563518448209922-5eWF/' target='_blank' rel='noopener noreferrer'>proyecto para Kärcher</a>."],
              en: ["summer 2023", "<strong>Summer School at TU Munich</strong>: industrial IoT and a <a href='https://www.linkedin.com/posts/diego-ruiz-piqueras-ingeniero-de-software_emprendimientos-experiencias-desarrolloprofesional-share-7093563518448209922-5eWF/' target='_blank' rel='noopener noreferrer'>project for Kärcher</a>."] }],
  [2023.72, { es: ["2023 – 2025", "<strong>Mentor</strong> de estudiantes nuevos e internacionales en la ETSISI."],
              en: ["2023 – 2025", "<strong>Mentor</strong> to new and international students at ETSISI."] }],
  [2024.45, { es: ["2024", "<strong>Ganamos el BeTech Hackathon Madrid</strong> con un algoritmo para optimizar la carga de camiones eléctricos."],
              en: ["2024", "<strong>We win the BeTech Hackathon Madrid</strong> with an algorithm to optimise electric truck charging."] }, true],
  [2025.10, { es: ["febrero de 2025", "Prácticas en <strong>Telefónica</strong>: automatizo procesos con Python, SQL y APIs."],
              en: ["February 2025", "Internship at <strong>Telefónica</strong>: I automate processes with Python, SQL and APIs."] }],
  [2025.46, { es: ["2025", "Presento <strong>EQUITIA</strong>, mi TFG: un 10. Termino la carrera."],
              en: ["2025", "I present <strong>EQUITIA</strong>, my bachelor's thesis: 10 out of 10. I graduate."] }, true],
  [2026.27, { es: ["abril de 2026", "<strong>TeamSystem</strong>: agentes de soporte con IA y automatización."],
              en: ["April 2026", "<strong>TeamSystem</strong>: AI support agents and automation."] }],
  [2026.43, { es: ["junio de 2026", "Entro en <strong>Cabify</strong> como ingeniero de software, en Pricing."],
              en: ["June 2026", "I join <strong>Cabify</strong> as a software engineer, on the Pricing team."] }, true],
  [2026.68, { es: ["septiembre de 2026", "Empiezo el <strong>Máster en IA Aplicada</strong> en la UC3M."],
              en: ["September 2026", "I start the <strong>MSc in Applied AI</strong> at UC3M."] }],
  [2026.95, { es: ["¿?", "La siguiente pregunta."], en: ["?", "The next question."] }],
];
const INICIO = 2021.5, FIN = 2027.0;
const regla = $("#cinta-regla"), lupa = $("#cinta-lupa"), marcas = $("#cinta-marcas");
const pct = (anio) => ((anio - INICIO) / (FIN - INICIO)) * 100;
lupa.setAttribute("aria-valuemax", String(HITOS.length - 1));
for (let a = 2022; a <= 2026; a++) {
  const m = document.createElement("span"); m.className = "cinta-anio-marca"; m.style.left = `${pct(a)}%`;
  m.innerHTML = `<span>${a}</span>`; marcas.append(m);
}
HITOS.forEach(([a, , gordo]) => {
  const h = document.createElement("span"); h.className = "cinta-hito" + (gordo ? " gordo" : ""); h.style.left = `${pct(a)}%`;
  marcas.append(h);
});
let actual = -1, posicion = pct(HITOS[0][0]);
function mostrarHito(i, direccion = 1, forzar = false) {
  if (i === actual && !forzar) return;
  actual = i;
  const [a, textos] = HITOS[i];
  const [fecha, texto] = textos[idioma];
  $("#cinta-fecha").textContent = fecha;
  const t = $("#cinta-texto"); t.innerHTML = texto;
  $$("a", t).forEach(marcarPestanaNueva);
  t.className = "cinta-texto entra" + (direccion < 0 ? " izq" : "");
  void t.offsetWidth;
  $("#cinta-anio").textContent = a >= 2026.9 ? fecha : Math.floor(a);
  $$(".cinta-hito").forEach((h, k) => h.classList.toggle("activo", k === i));
  lupa.setAttribute("aria-valuenow", String(i));
  lupa.setAttribute("aria-valuetext", `${fecha}: ${t.textContent}`);
}
function cercano(p) {
  let mejor = 0;
  HITOS.forEach(([a], i) => { if (Math.abs(pct(a) - p) < Math.abs(pct(HITOS[mejor][0]) - p)) mejor = i; });
  return mejor;
}
function colocar(p, animado = false) {
  const anterior = posicion;
  posicion = Math.max(0, Math.min(100, p));
  lupa.style.transition = animado && !quieto ? "left .45s cubic-bezier(.3, 1.4, .5, 1)" : "none";
  lupa.style.left = `${posicion}%`;
  mostrarHito(cercano(posicion), posicion - anterior);
}
const irA = (i) => colocar(pct(HITOS[i][0]), true);
let arrastre = false;
const desdePuntero = (e) => { const r = regla.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
lupa.addEventListener("pointerdown", (e) => { arrastre = true; lupa.setPointerCapture(e.pointerId); lupa.classList.remove("pista"); });
lupa.addEventListener("pointermove", (e) => { if (arrastre) colocar(desdePuntero(e)); });
const soltar = () => { if (!arrastre) return; arrastre = false; irA(cercano(posicion)); };
lupa.addEventListener("pointerup", soltar);
lupa.addEventListener("pointercancel", soltar);
regla.addEventListener("click", (e) => { if (e.target === regla || e.target.closest(".cinta-marcas")) irA(cercano(desdePuntero(e))); });
lupa.addEventListener("keydown", (e) => {
  const paso = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
  if (e.key === "Home") { e.preventDefault(); irA(0); }
  else if (e.key === "End") { e.preventDefault(); irA(HITOS.length - 1); }
  else if (paso) { e.preventDefault(); irA(Math.max(0, Math.min(HITOS.length - 1, actual + paso))); }
});
$("#cinta-antes").addEventListener("click", () => irA(Math.max(0, actual - 1)));
$("#cinta-despues").addEventListener("click", () => irA(Math.min(HITOS.length - 1, actual + 1)));
alCambiarIdioma.push(() => mostrarHito(Math.max(actual, 0), 1, true));
colocar(posicion);
// La primera vez que se ve, la lupa se mueve un poco para que se note que se puede arrastrar.
new IntersectionObserver((entradas, obs) => {
  if (entradas[0].isIntersecting) { if (!quieto) lupa.classList.add("pista"); obs.disconnect(); }
}, { threshold: 0.6 }).observe(regla);

/* ------------------------------------------------------------ correo */
// Montado aquí y no escrito en el HTML: los robots que buscan direcciones
// para mandar spam leen el HTML, no ejecutan esto.
const enlaceCorreo = $("#correo");
const correo = `${atob(enlaceCorreo.dataset.u)}@${atob(enlaceCorreo.dataset.d)}`;
enlaceCorreo.textContent = correo;
enlaceCorreo.href = `mailto:${correo}`;
$("#copiar").addEventListener("click", async (e) => {
  const b = e.currentTarget;
  try { await navigator.clipboard.writeText(correo); b.textContent = T().copiado; }
  catch { b.textContent = T().noCopiado; }
  setTimeout(() => (b.textContent = idioma === "es" ? ES.copiar : ORIGINAL.get(b)), 1800);
});

/* --------------------------- enlaces externos: avisar de la pestaña nueva */
function marcarPestanaNueva(a) {
  a.querySelector(".oculto")?.remove();
  const aviso = document.createElement("span");
  aviso.className = "oculto"; aviso.textContent = T().pestana;
  a.append(aviso);
}
alCambiarIdioma.push(() => $$('a[target="_blank"]').forEach(marcarPestanaNueva));

/* ---------------------------------- escribe «lego»: llueven piezas de Lego */
const COLORES_LEGO = ["#d01012", "#f5cd2f", "#0055bf", "#237841", "#f4f4f4", "#fe8a18", "#1b2a34"];
function piezaLego(color) {
  return `<svg viewBox="0 0 48 34" aria-hidden="true">
    <rect x="5" y="2" width="11" height="7" rx="2" fill="${color}"/><rect x="5" y="2" width="11" height="2.5" rx="1" fill="#fff" opacity=".25"/>
    <rect x="32" y="2" width="11" height="7" rx="2" fill="${color}"/><rect x="32" y="2" width="11" height="2.5" rx="1" fill="#fff" opacity=".25"/>
    <rect x="0" y="8" width="48" height="26" rx="3" fill="${color}"/>
    <rect x="0" y="27" width="48" height="7" rx="3" fill="#000" opacity=".18"/>
    <rect x="0" y="8" width="48" height="3" fill="#fff" opacity=".2"/></svg>`;
}
function lluviaLego() {
  if (quieto) return;
  for (let i = 0; i < 45; i++) {
    const p = document.createElement("span");
    p.className = "pieza";
    p.innerHTML = piezaLego(COLORES_LEGO[i % COLORES_LEGO.length]);
    p.style.left = `${Math.random() * 96}vw`;
    p.style.animationDuration = `${1.8 + Math.random() * 1.6}s`;
    p.style.animationDelay = `${Math.random() * 0.7}s`;
    p.style.setProperty("--giro", `${Math.random() * 540 - 270}deg`);
    p.style.setProperty("--escala", (0.7 + Math.random() * 0.7).toFixed(2));
    document.body.append(p);
    setTimeout(() => p.remove(), 4500);
  }
}
let tecleado = "";
addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea") || e.key.length !== 1) return;
  tecleado = (tecleado + e.key.toLowerCase()).slice(-4);
  if (tecleado === "lego") lluviaLego();
});
$("#pista-lego").addEventListener("click", lluviaLego);
// En el móvil no hay teclado: la pista invita a tocar.
if (matchMedia("(pointer: coarse)").matches)
  alCambiarIdioma.push(() => ($("#pista-lego").textContent = T().pistaTactil));

/* ------------------------------------------------------------ arranque */
const pedido = new URLSearchParams(location.search).get("lang");
ponerIdioma(idioma, pedido === "es" || pedido === "en");

console.log("%c¿?", "font: 900 48px Georgia; color: #e2482d", "\n¿Mirando el código? Buena pregunta. → github.com/Pikeras72");
