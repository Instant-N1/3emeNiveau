// Changement d'onglets
const btns = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".section");

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    btns.forEach(b => b.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

// Expérience au stade
const experienceSection = document.getElementById("experience");

// Stockage local simulé
let posts = JSON.parse(localStorage.getItem("posts_stade")) || [];

function afficherPosts() {
  const container = document.getElementById("feed-posts");
  container.innerHTML = "";

  posts.slice().reverse().forEach((post, index) => {
    const bloc = document.createElement("div");
    bloc.className = "post";

    bloc.innerHTML = `
      <img src="${post.image}" alt="photo stade">
      <p>${post.commentaire}</p>
      <div class="interactions">
        <span onclick="aimer(${index})">❤️ ${post.likes} J'aime</span>
        <span>💬 Commentaires (à venir)</span>
      </div>
    `;
    container.appendChild(bloc);
  });
}

function aimer(index) {
  posts[index].likes++;
  localStorage.setItem("posts_stade", JSON.stringify(posts));
  afficherPosts();
}

document.getElementById("form-post").addEventListener("submit", e => {
  e.preventDefault();
  const imageInput = document.getElementById("image");
  const commentaire = document.getElementById("commentaire").value;

  const reader = new FileReader();
  reader.onload = function (e) {
    posts.push({
      image: e.target.result,
      commentaire: commentaire,
      likes: 0
    });
    localStorage.setItem("posts_stade", JSON.stringify(posts));
    afficherPosts();
    imageInput.value = "";
    document.getElementById("commentaire").value = "";
  };
  reader.readAsDataURL(imageInput.files[0]);
});

afficherPosts();
