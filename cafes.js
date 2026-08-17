/* =========================================================
   MAISON YSAZ — données
   -----------------------------------------------------------------
   C'EST LE SEUL FICHIER À MODIFIER POUR AJOUTER UNE ADRESSE.
   Pour chaque nouveau café : copier un bloc, changer les valeurs,
   choisir une couleur encore libre dans COULEURS.
   ========================================================= */

/* Les six couleurs du système. Une seule par café, réservée
   pendant toute la durée de la collaboration. */
const COULEURS = {
  bleu:   { hex: "#486A80", nom: "Bleu Zinc",     texte: "clair" },
  jaune:  { hex: "#F4C724", nom: "Jaune Midi",    texte: "sombre" },
  orange: { hex: "#EC761F", nom: "Orange Marché", texte: "clair" },
  rouge:  { hex: "#E93E34", nom: "Rouge Maison",  texte: "clair" },
  rose:   { hex: "#FFB5CF", nom: "Rose Vitrine",  texte: "sombre" },
  vert:   { hex: "#8EAD4A", nom: "Vert Jardin",   texte: "clair" }
};

/* Les adresses partenaires. */
const CAFES = [
  {
    id: "convos",
    nom: "Convos & Co.",
    couleur: "orange",
    adresse: "3 rue Sainte-Foy",
    ville: "75002 Paris",
    arrondissement: "2ᵉ",
    // Plus code V992+C2 Paris (8FW4V992+C2)
    coords: [48.868562, 2.350062],
    creation: "Cake Citron",
    mention: "Cake Citron — signé MAISON YSAZ",
    instagram: "convos.cafe",
    horaires: "Lun–Ven 9h–18h · Sam–Dim 10h–18h",
    photo: "assets/convos.jpg",
    depuis: "Août 2026"
  }
];

/* Les créations de la maison. */
const CREATIONS = [
  {
    nom: "Cake Citron",
    detail: "Dix parts par cake. Citron jaune, yaourt à la grecque, glaçage au sucre glace.",
    couleur: "orange",
    ou: "Convos & Co."
  }
];
