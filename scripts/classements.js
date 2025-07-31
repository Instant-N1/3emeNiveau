document.addEventListener("DOMContentLoaded", () => {
  const selectJournee = document.getElementById("filtre-journee");
  const radiosType = document.querySelectorAll('input[name="typeClassement"]');
  const conteneur = document.getElementById("conteneur-classements");

  // Générer options J1 à J34
  for (let i = 1; i <= 34; i++) {
    const option = document.createElement("option");
    option.value = "J" + i;
    option.textContent = "Journée " + i;
    selectJournee.appendChild(option);
  }

  // Exemple données factices (à remplacer par fetch API ou base réelle)
  const donnees = {
    equipe: [
      { position: 1, nom: "FC Dijon", points: 75, matches: 34 },
      { position: 2, nom: "US Orléans", points: 70, matches: 34 },
      { position: 3, nom: "SM Caen", points: 68, matches: 34 }
    ],
    buteurs: [
      { position: 1, nom: "Alex Parsemain", buts: 21 },
      { position: 2, nom: "Yanis Barka", buts: 19 },
      { position: 3, nom: "Jovanny Ikanga", buts: 17 }
    ],
    passeurs: [
      { position: 1, nom: "Adel Lembezat", passes: 14 },
      { position: 2, nom: "Nassim Titebah", passes: 11 },
      { position: 3, nom: "Alex Parsemain", passes: 10 }
    ],
    dribbleurs: [
      { position: 1, nom: "Jovanny Ikanga", dribbles: 52 },
      { position: 2, nom: "Yanis Barka", dribbles: 47 },
      { position: 3, nom: "Adel Lembezat", dribbles: 40 }
    ],
    gardiens: [
      { position: 1, nom: "Izak Akakpo", cleanSheets: 15 },
      { position: 2, nom: "Gardien 2", cleanSheets: 13 },
      { position: 3, nom: "Gardien 3", cleanSheets: 12 }
    ],
  };

  // Fonction pour afficher un classement selon le type choisi
  function afficherClassement(type) {
    conteneur.innerHTML = ""; // Reset

    if (!donnees[type]) {
      conteneur.textContent = "Aucune donnée pour ce classement.";
      return;
    }

    // Créer tableau
    const table = document.createElement("table");
    table.classList.add("classement-table");

    // En-têtes selon type
    let headers = ["Position", "Nom"];
    switch(type) {
      case "equipe":
        headers.push("Points", "Matches joués");
        break;
      case "buteurs":
        headers.push("Buts");
        break;
      case "passeurs":
        headers.push("Passes décisives");
        break;
      case "dribbleurs":
        headers.push("Dribbles réussis");
        break;
      case "gardiens":
        headers.push("Clean Sheets");
        break;
    }

    // Création ligne header
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Corps du tableau
    const tbody = document.createElement("tbody");

    donnees[type].forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.position}</td>
        <td>${item.nom}</td>
        <td>${item.points ?? item.buts ?? item.passes ?? item.dribbles ?? item.cleanSheets ?? "-"}</td>
        <td>${item.matches ?? ""}</td>
      `.trim();
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    conteneur.appendChild(table);
  }

  // Initial affichage
  afficherClassement("equipe");

  // Écoute changement radio
  radiosType.forEach(radio => {
    radio.addEventListener("change", e => {
      afficherClassement(e.target.value);
    });
  });

  // Écoute changement journée (tu peux intégrer le filtre plus tard côté données)
  selectJournee.addEventListener("change", e => {
    // Pour l'instant, on peut juste réafficher le classement sans filtrage
    const selectedType = document.querySelector('input[name="typeClassement"]:checked').value;
    afficherClassement(selectedType);
  });
});