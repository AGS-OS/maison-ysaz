/* =========================================================
   MAISON YSAZ — comportement
   ========================================================= */

(function () {
  "use strict";

  const couleurDe = (cle) => COULEURS[cle] || COULEURS.rouge;

  /* ---------- créations ---------- */
  const listeCreations = document.getElementById("liste-creations");
  if (listeCreations) {
    CREATIONS.forEach((c) => {
      const col = couleurDe(c.couleur);
      const li = document.createElement("li");
      li.className = "creation" + (col.texte === "sombre" ? " sombre" : "");
      li.style.background = col.hex;
      li.innerHTML =
        '<span class="pt" aria-hidden="true"></span>' +
        "<div>" +
        "<h3>" + c.nom + "</h3>" +
        '<p class="detail">' + c.detail + "</p>" +
        '<p class="signature">Chez ' + c.ou + "</p>" +
        "</div>";
      listeCreations.appendChild(li);
    });
  }

  /* ---------- carte ---------- */
  const plan = document.getElementById("plan");
  const fiche = document.getElementById("fiche");
  const carteDispo = plan && typeof L !== "undefined";

  /* Si la carte ne charge pas (hors ligne, script bloqué), la liste
     d'adresses reste affichée : l'information essentielle ne dépend
     jamais du plan. */
  if (!carteDispo) {
    if (plan) {
      plan.innerHTML =
        '<p class="plan-absent">Le plan ne s\'est pas chargé. Les adresses restent ci-dessous.</p>';
    }
    remplirAdresses(null);
    activerNav();
    return;
  }

  const carte = L.map(plan, {
    center: [48.8634, 2.3488],
    zoom: 13,
    minZoom: 11,
    maxZoom: 17,
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }
  ).addTo(carte);

  const marqueurs = {};

  CAFES.forEach((cafe) => {
    const col = couleurDe(cafe.couleur);
    const icone = L.divIcon({
      className: "",
      html:
        '<span class="pastille" style="background:' +
        col.hex +
        '" role="button" tabindex="0" aria-label="' +
        cafe.nom +
        '"></span>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    const m = L.marker(cafe.coords, { icon: icone, keyboard: true, title: cafe.nom }).addTo(carte);
    marqueurs[cafe.id] = m;

    const ouvre = () => afficherFiche(cafe);
    m.on("click", ouvre);
    m.on("mouseover", ouvre);
    m.on("keypress", ouvre);
  });

  function afficherFiche(cafe) {
    const col = couleurDe(cafe.couleur);

    fiche.innerHTML =
      '<button class="fermer" type="button" aria-label="Fermer">&times;</button>' +
      (cafe.photo
        ? '<img class="photo" src="' +
          cafe.photo +
          '" alt="' +
          cafe.nom +
          '" onerror="this.remove()">'
        : "") +
      '<div class="corps">' +
      '<div class="bandeau"><span class="pt" style="background:' +
      col.hex +
      '"></span><span class="couleur">' +
      col.nom +
      " · " +
      cafe.arrondissement +
      " arrondissement</span></div>" +
      "<h3>" +
      cafe.nom +
      "</h3>" +
      '<p class="ligne"><span class="k">Adresse</span>' +
      cafe.adresse +
      "<br>" +
      cafe.ville +
      "</p>" +
      '<p class="ligne"><span class="k">La création</span>' +
      cafe.mention +
      "</p>" +
      (cafe.horaires
        ? '<p class="ligne"><span class="k">Horaires</span>' + cafe.horaires + "</p>"
        : "") +
      '<div class="actions">' +
      '<a href="https://instagram.com/' +
      cafe.instagram +
      '" rel="noopener" target="_blank">@' +
      cafe.instagram +
      "</a>" +
      '<a href="https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(cafe.adresse + ", " + cafe.ville) +
      '" rel="noopener" target="_blank">Itinéraire</a>' +
      "</div></div>";

    fiche.hidden = false;
    fiche.querySelector(".fermer").addEventListener("click", () => {
      fiche.hidden = true;
      document.querySelectorAll(".pastille").forEach((p) => p.classList.remove("active"));
    });

    document.querySelectorAll(".pastille").forEach((p) => p.classList.remove("active"));
    const actif = marqueurs[cafe.id];
    if (actif && actif._icon) {
      const pastille = actif._icon.querySelector(".pastille");
      if (pastille) pastille.classList.add("active");
    }
  }

  remplirAdresses(carte);
  activerNav();

  /* ---------- liste d'adresses ---------- */
  function remplirAdresses(carteOuNull) {
  const listeAdresses = document.getElementById("liste-adresses");
  if (listeAdresses) {
    CAFES.forEach((cafe) => {
      const col = couleurDe(cafe.couleur);
      const li = document.createElement("li");
      li.innerHTML =
        '<span class="pt" style="background:' + col.hex + '" aria-hidden="true"></span>' +
        "<button type=\"button\">" +
        '<span class="nom">' + cafe.nom + "</span><br>" +
        '<span class="adr">' + cafe.adresse + " · " + cafe.ville + "</span><br>" +
        '<span class="adr">' + cafe.creation + "</span>" +
        "</button>";
      li.querySelector("button").addEventListener("click", () => {
        if (carteOuNull) {
          carteOuNull.setView(cafe.coords, 16, { animate: true });
          afficherFiche(cafe);
          document.getElementById("carte").scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.open(
            "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(cafe.adresse + ", " + cafe.ville),
            "_blank"
          );
        }
      });
      listeAdresses.appendChild(li);
    });
  }
  }

  /* ---------- navigation active ---------- */
  function activerNav() {
  const liens = document.querySelectorAll(".barre nav a");
  const sections = [...liens].map((a) => document.querySelector(a.getAttribute("href")));
  const obs = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        liens.forEach((a) =>
          a.classList.toggle("actif", a.getAttribute("href") === "#" + e.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => s && obs.observe(s));
  }
})();
