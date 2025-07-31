const articles = [
  {
    titre: "Dijon recrute un nouveau buteur",
    source: "L'Équipe",
    image: "https://footamateur.ouest-france.fr/wp-content/uploads/2024/03/Dijon-696x464.jpg",
    lien: "https://www.francebleu.fr/sports/football/national-le-defenseur-central-waly-diouf-nouvelle-recrue-du-dfco-4449756",
    type: "mercato",
    club: "dijon"
  },
  {
    titre: "Interview exclusive avec l'entraîneur du Red Star",
    source: "Foot-National",
    image: "https://via.placeholder.com/400x180?text=Interview+Red+Star",
    lien: "https://www.foot-national.com/red-star/interview.html",
    type: "interview",
    club: "redstar"
  },
  {
    titre: "Résumé : Versailles vs Niort (2-1)",
    source: "MaLigue2",
    image: "https://via.placeholder.com/400x180?text=Versailles+Match",
    lien: "https://maligue2.fr/2025/07/30/versailles-niort-resume",
    type: "resume",
    club: "versailles"
  }
];

const conteneur = document.getElementById('conteneur-actus');
const radios = document.querySelectorAll('input[name="type-actu"]');
const selectClub = document.getElementById('filtre-club');

function afficherArticles() {
  const inputTypeActu = document.querySelector('input[name="type-actu"]:checked');
  if (!inputTypeActu) {
    console.warn("Aucun type d'actualité sélectionné !");
    return;
  }
  const typeChoisi = inputTypeActu.value;
  const clubChoisi = selectClub ? selectClub.value : "tous";

  if (!conteneur) {
    console.error("Le conteneur d'actus est introuvable !");
    return;
  }

  conteneur.innerHTML = "";

  articles
    .filter(article => (typeChoisi === "toutes" || article.type === typeChoisi) &&
                       (clubChoisi === "tous" || article.club === clubChoisi))
    .forEach(article => {
      const carte = document.createElement("a");
      carte.href = article.lien;
      carte.target = "_blank";
      carte.className = "carte-actu";
      carte.innerHTML = `
        <img src="${article.image}" alt="Image actu">
        <div class="contenu">
          <h3>${article.titre}</h3>
          <p class="source">Source : ${article.source}</p>
        </div>
      `;
      conteneur.appendChild(carte);
    });
}

// Ajout des listeners uniquement si les éléments existent
if (radios.length > 0) {
  radios.forEach(radio => radio.addEventListener("change", afficherArticles));
}

if (selectClub) {
  selectClub.addEventListener("change", afficherArticles);
}

window.addEventListener("DOMContentLoaded", afficherArticles);
