// Exemple de données de transferts
const transferts = [
  {
    id: 1,
    joueur: "Yanis Barka",
    poste: "Avant-centre",
    type: "payant", // libre, payant, pret, premier-contrat
    mercato: "ete-2025",
    ancienClub: {
      nom: "Dijon FCO",
      logo: "../photos/logos/Dijon.png",
      division: "Ligue 2",
    },
    nouveauClub: {
      nom: "SM Caen",
      logo: "../photos/logos/Caen.png",
      division: "Ligue 2",
    },
  },
  {
    id: 2,
    joueur: "Alexandre Parsemain",
    poste: "Avant-centre",
    type: "libre",
    mercato: "hiver-2026",
    ancienClub: {
      nom: "US Orléans",
      logo: "../photos/logos/Orleans.png",
      division: "National 1",
    },
    nouveauClub: {
      nom: "AC Ajaccio",
      logo: "../photos/logos/Ajaccio.png",
      division: "Ligue 2",
    },
  },
  {
    id: 3,
    joueur: "Adel Lembezat",
    poste: "Milieu offensif",
    type: "pret",
    mercato: "ete-2025",
    ancienClub: {
      nom: "Quevilly-Rouen",
      logo: "../photos/logos/Quevilly-Rouen.png",
      division: "Ligue 2",
    },
    nouveauClub: {
      nom: "FC Fleury",
      logo: "../photos/logos/Fleury.png",
      division: "National 1",
    },
  },
  {
    id: 4,
    joueur: "Jovanny Ikanga",
    poste: "Ailier",
    type: "premier-contrat",
    mercato: "ete-2025",
    ancienClub: {
      nom: "Libre",
      logo: "../photos/logos/libre.png",
      division: "-",
    },
    nouveauClub: {
      nom: "FC Rouen",
      logo: "../photos/logos/Rouen.png",
      division: "National 1",
    },
  },
  // Ajoute autant de transferts que tu veux ici...
];

// Références aux filtres
const filtreTypeTransfertRadios = document.querySelectorAll('input[name="type-transfert"]');
const filtreMercatoSelect = document.getElementById("filtre-mercato");
const filtreClubSelect = document.getElementById("filtre-club");
const conteneurTransferts = document.getElementById("conteneur-transferts");

// Fonction pour créer une carte transfert HTML
function creerCarteTransfert(transfert) {
  const div = document.createElement("div");
  div.className = "carte-transfert";
  div.innerHTML = `
    <div class="header">
      <h3>${transfert.joueur}</h3>
      <p>${transfert.poste} — ${formatTypeTransfert(transfert.type)}</p>
    </div>
    <div class="clubs-logos">
      <div class="club-ancien">
        <img src="${transfert.ancienClub.logo}" alt="Logo ${transfert.ancienClub.nom}" />
      </div>
      <div class="fleche">→</div>
      <div class="club-nouveau">
        <img src="${transfert.nouveauClub.logo}" alt="Logo ${transfert.nouveauClub.nom}" />
      </div>
    </div>
    <div class="clubs-noms">
      <div class="club-ancien">
        <span>${transfert.ancienClub.nom} (${transfert.ancienClub.division})</span>
      </div>
      <div class="club-nouveau">
        <span>${transfert.nouveauClub.nom} (${transfert.nouveauClub.division})</span>
      </div>
    </div>
  `;
  return div;
}

// Fonction pour afficher la liste des transferts filtrés
function afficherTransferts() {
  // Récupère les valeurs des filtres
  const typeSelectionne = document.querySelector('input[name="type-transfert"]:checked').value;
  const mercatoSelectionne = filtreMercatoSelect.value;
  const clubSelectionne = filtreClubSelect.value.toLowerCase();

  // Filtrage des transferts
  const filtresAppliques = transferts.filter(t => {
    const typeOk = typeSelectionne === "tout" || t.type === typeSelectionne;
    const mercatoOk = t.mercato === mercatoSelectionne;
    const clubOk =
      !clubSelectionne ||
      t.ancienClub.nom.toLowerCase() === clubSelectionne ||
      t.nouveauClub.nom.toLowerCase() === clubSelectionne;

    return typeOk && mercatoOk && clubOk;
  });

  // Vide le conteneur avant affichage
  conteneurTransferts.innerHTML = "";

  if (filtresAppliques.length === 0) {
    conteneurTransferts.innerHTML = "<p style='color: #ddd; font-style: italic; text-align: center;'>Aucun transfert trouvé.</p>";
    return;
  }

  // Ajoute les cartes filtrées
  filtresAppliques.forEach(t => {
    const carte = creerCarteTransfert(t);
    conteneurTransferts.appendChild(carte);
  });
}

// Convertir le type de transfert pour affichage user-friendly
function formatTypeTransfert(type) {
  switch (type) {
    case "libre":
      return "Transfert libre";
    case "payant":
      return "Transfert payant";
    case "pret":
      return "Prêt";
    case "premier-contrat":
      return "Premier contrat pro";
    default:
      return "Transfert";
  }
}

// Écouteurs sur les filtres
filtreTypeTransfertRadios.forEach(radio => {
  radio.addEventListener("change", afficherTransferts);
});

filtreMercatoSelect.addEventListener("change", afficherTransferts);
filtreClubSelect.addEventListener("change", afficherTransferts);

// Affichage initial
afficherTransferts();