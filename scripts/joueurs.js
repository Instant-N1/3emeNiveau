// Données joueurs intégrées directement
const joueurs = [
  {
    prénom: "Yanis",
    nom: "Barka",
    age: "1998",
    poste: "Buteur",
    club: "Dijon",
    passes: 70,
    transfermarktUrl: "https://www.transfermarkt.fr/yanis-barka/profil/spieler/510258"
  },
  {
    prénom: "Elydjah",
    nom: "Mendy",
    age: "2000",
    poste: "Défenseur",
    club: "Dijon",
    passes: 80,
    transfermarktUrl: "https://www.transfermarkt.fr/elydjah-mendy/profil/spieler/602549"
  }
];

// Récupération des éléments DOM
const filtrePrénom = document.getElementById("filtre-prénom");
const filtreNom = document.getElementById("filtre-nom");
const filtreAge = document.getElementById("filtre-age");
const filtrePoste = document.getElementById("filtre-poste");
const filtreClub = document.getElementById("filtre-club");
const filtrePasses = document.getElementById("filtre-passes");
const conteneur = document.getElementById("conteneur-joueurs");

// Fonction d’affichage
function afficherJoueurs(liste) {
  conteneur.innerHTML = "";
  if (liste.length === 0) {
    conteneur.innerHTML = "<p>Aucun joueur trouvé.</p>";
    return;
  }
  liste.forEach(joueur => {
    const card = document.createElement("div");
    card.classList.add("carte-joueur");
    card.innerHTML = `
      <h3>${joueur.prénom} ${joueur.nom}</h3>
      <p>Poste : ${joueur.poste}</p>
      <p>Club : ${joueur.club}</p>
      <p>Âge : ${joueur.age}</p>
      <p>Indice de performance : ${joueur.passes}/100</p>
    `;

    // Clic vers Transfermarkt
    if (joueur.transfermarktUrl) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.open(joueur.transfermarktUrl, "_blank");
      });
    }

    conteneur.appendChild(card);
  });
}

// Fonction de filtrage
function filtrer() {
  const prenomVal = filtrePrénom.value.toLowerCase();
  const nomVal = filtreNom.value.toLowerCase();
  const ageVal = filtreAge.value.trim(); // string
  const posteVal = filtrePoste.value;
  const clubVal = filtreClub.value.toLowerCase();
  const passesVal = parseInt(filtrePasses.value);

  const joueursFiltres = joueurs.filter(joueur => {
    const prenomOk = joueur.prénom.toLowerCase().includes(prenomVal);
    const nomOk = joueur.nom.toLowerCase().includes(nomVal);
    const ageOk = ageVal === "" || joueur.age === ageVal;
    const posteOk = posteVal === "" || joueur.poste === posteVal;
    const clubOk = joueur.club.toLowerCase().includes(clubVal);
    const passesOk = isNaN(passesVal) || joueur.passes >= passesVal;
    return prenomOk && nomOk && ageOk && posteOk && clubOk && passesOk;
  });

  afficherJoueurs(joueursFiltres);
}

// Ajout des écouteurs
filtrePrénom.addEventListener("input", filtrer);
filtreNom.addEventListener("input", filtrer);
filtreAge.addEventListener("input", filtrer);
filtrePoste.addEventListener("change", filtrer);
filtreClub.addEventListener("input", filtrer);
filtrePasses.addEventListener("input", filtrer);

// Affichage initial
afficherJoueurs(joueurs);