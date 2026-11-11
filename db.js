var SEED = {
  profile: { blog: "AULA SUPPORT", nombre: "LIC. DARLINA CHALAS", titulo: "Docente de Educación Técnico Profesional",
    centro: "Liceo Politécnico William Ramírez Encarnación", materias: "Comunicación Empresarial, Operaciones Administrativas de Compraventa y Gestión Fiscal y Tributaria",
    bio: "Bienvenidos a AULA SUPPORT, el espacio de apoyo para aprender gestión empresarial con herramientas prácticas." },
  materias: [
    { id: "ce", nombre: "Comunicación Empresarial", color: "sky", icono: "💬" },
    { id: "oac", nombre: "Operaciones Administrativas de Compraventa", color: "emerald", icono: "🧾" },
    { id: "gft", nombre: "Gestión Fiscal y Tributaria", color: "violet", icono: "🏛️" }
  ],
  posts: [
    { id: 1, materia: "ce", titulo: "Cómo redactar un correo empresarial", fecha: "2026-11-02", texto: "Un buen correo tiene asunto claro, saludo formal, mensaje breve y despedida cordial.\n\nRevisa siempre ortografía y tono antes de enviar." },
    { id: 2, materia: "oac", titulo: "Del pedido a la factura: el ciclo de compraventa", fecha: "2026-11-04", texto: "El ciclo inicia con la solicitud de cotización, sigue con la orden de compra, la recepción de mercancía y termina con la factura y el pago." },
    { id: 3, materia: "gft", titulo: "¿Qué es el ITBIS y cómo se declara?", fecha: "2026-11-06", texto: "El ITBIS es el impuesto sobre transferencias de bienes industrializados y servicios. Se declara mensualmente ante la DGII." }
  ],
  recursos: [
    { id: 1, materia: "ce", titulo: "Plantilla de carta comercial", url: "#" },
    { id: 2, materia: "oac", titulo: "Formato de orden de compra", url: "#" },
    { id: 3, materia: "gft", titulo: "Guía rápida de la DGII", url: "https://dgii.gov.do" }
  ],
  comentarios: [
    { id: 1, post: 1, autor: "Estudiante", texto: "¡Muy útil, profe!", estado: "pendiente" }
  ],
  estudiantes: [
    { id: 1, nombre: "Ana", nave: "🚀", prog: { ce: {ent:5,tot:6,nota:92}, oac: {ent:4,tot:6,nota:88}, gft: {ent:3,tot:5,nota:85} } },
    { id: 2, nombre: "Luis", nave: "🛸", prog: { ce: {ent:6,tot:6,nota:96}, oac: {ent:6,tot:6,nota:94}, gft: {ent:5,tot:5,nota:98} } },
    { id: 3, nombre: "María", nave: "🛰️", prog: { ce: {ent:3,tot:6,nota:75}, oac: {ent:2,tot:6,nota:70}, gft: {ent:2,tot:5,nota:72} } },
    { id: 4, nombre: "Carlos", nave: "☄️", prog: { ce: {ent:4,tot:6,nota:82}, oac: {ent:5,tot:6,nota:86}, gft: {ent:3,tot:5,nota:80} } }
  ]
};
var DB = (function () {
  var p;
  function open() {
    return p || (p = new Promise(function (res, rej) {
      var r = indexedDB.open("aula-support", 1);
      r.onupgradeneeded = function () { r.result.createObjectStore("kv"); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    }));
  }
  async function tx(mode, f) {
    var d = await open();
    return new Promise(function (res, rej) {
      var t = d.transaction("kv", mode), q = f(t.objectStore("kv"));
      t.oncomplete = function () { res(q && q.result); };
      t.onerror = function () { rej(t.error); };
    });
  }
  var get = function (k) { return tx("readonly", function (s) { return s.get(k); }); };
  var set = function (k, v) { return tx("readwrite", function (s) { return s.put(v, k); }); };
  async function init() {
    if (await get("seeded")) return;
    for (var k in SEED) await set(k, SEED[k]);
    await set("seeded", 1);
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  return { get: get, set: set, init: init, esc: esc };
})();
