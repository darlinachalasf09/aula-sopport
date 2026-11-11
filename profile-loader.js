(async function () {
  await DB.init();
  var p = await DB.get("profile") || SEED.profile;
  var links = [["index.html","Inicio"],["publicaciones.html","Publicaciones"],["recursos.html","Recursos"],["avance.html","🚀 Avance"],["panel.html","Panel docente"]];
  var cur = location.pathname.split("/").pop() || "index.html";
  var n = document.getElementById("nav");
  if (n) n.innerHTML = '<header class="bg-sky-100 border-b border-sky-200"><div class="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2"><a href="index.html" class="font-bold text-xl text-sky-800">📘 <span data-tp="blog"></span></a><nav class="flex flex-wrap gap-1 text-sm">' +
    links.map(function (l) { return '<a href="' + l[0] + '" class="px-3 py-1 rounded-full ' + (l[0] === cur ? "bg-white text-sky-800 font-semibold" : "text-slate-600 hover:bg-white/70") + '">' + l[1] + '</a>'; }).join("") + '</nav></div></header>';
  var f = document.getElementById("foot");
  if (f) f.innerHTML = '<footer class="bg-emerald-100 border-t border-emerald-200 text-center text-sm text-emerald-900 py-4">© <span data-tp="blog"></span> · <span data-tp="nombre"></span> · <span data-tp="centro"></span></footer>';
  document.querySelectorAll("[data-tp]").forEach(function (e) { e.textContent = p[e.dataset.tp] || ""; });
})();
