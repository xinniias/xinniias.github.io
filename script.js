
/* ARTWORK COLLECTION
   Add new paintings here.
   Upload images to the images/ folder first.
*/

const artworks = [
  {
    title: "",
    year: "2024",
    medium: "",
    image: "images/2024/guitar.jpg"
  },
  {
    title: "",
    year: "2024",
    medium: "",
    image: "images/2024/umbrella.jpg"
  },
  {
    title: "",
    year: "2024",
    medium: "",
    image: "images/2024/witch.jpg"
  }
];

const main = document.querySelector("#content");
const viewer = document.querySelector("#viewer");
const workIndex = document.querySelector("#work-index");

let current = 0;
let selectedYear = "all";
let visibleArtworks = [];

const escapeHtml = s =>
  String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

/* RENDER WEBSITE */

function render() {
  const page = (location.hash.slice(1) || "work").toLowerCase();

  document.querySelectorAll("[data-page]").forEach(a => {
    a.setAttribute(
      "aria-current",
      a.dataset.page === page ? "page" : "false"
    );
  });

  // Show the year navigation only on Work.
  if (workIndex) {
    workIndex.style.display = page === "work" ? "" : "none";
  }

  if (page === "work") {
    renderGallery();
  } else if (page === "about") {
    main.innerHTML = `
      <section class="text-page">
        <h1>About</h1>
        <p>Cindy Wang is an artist working in painting and drawing.</p>
      </section>`;
  } else if (page === "cv") {
    main.innerHTML = `
      <section class="text-page">
        <h1>CV</h1>
        <p>Education, exhibitions, residencies, and selected projects.</p>
      </section>`;
  } else if (page === "contact") {
    main.innerHTML = `
      <section class="text-page">
        <h1>Contact</h1>
        <p>Add your professional email address here.</p>
      </section>`;
  } else {
    location.hash = "#work";
    return;
  }

  window.scrollTo(0, 0);
}

/* ARTWORK GALLERY */

function renderGallery() {
  visibleArtworks = selectedYear === "all"
    ? artworks
    : artworks.filter(a => a.year === selectedYear);

  // Update selected year styling.
  document.querySelectorAll(".year-nav a").forEach(a => {
    a.classList.toggle(
      "active",
      a.dataset.year === selectedYear
    );
  });

  if (visibleArtworks.length === 0) {
    main.innerHTML = `
      <p class="empty-gallery">
        No artworks added for ${escapeHtml(selectedYear)} yet.
      </p>`;
    return;
  }

  main.innerHTML = `
    <section class="gallery" aria-label="Artwork">
      ${visibleArtworks.map((a, i) => `
        <article class="artwork">
          <button
            type="button"
            data-index="${i}"
            aria-label="Enlarge ${escapeHtml(a.title)}"
          >
            <img
              src="${escapeHtml(a.image)}"
              alt="${escapeHtml(a.title)}"
              loading="lazy"
            >
          </button>

          ${a.year === "2024" ? "" : `
            <div class="details">
              ${escapeHtml(a.title)}, ${escapeHtml(a.year)}
              <div class="secondary">
                ${escapeHtml(a.medium)}
              </div>
            </div>
          `}
        </article>
      `).join("")}
    </section>`;

  main.querySelectorAll("[data-index]").forEach(button => {
    button.addEventListener("click", () => {
      openViewer(Number(button.dataset.index));
    });
  });
}

/* YEAR NAVIGATION */

document.querySelectorAll(".year-nav a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    selectedYear = link.dataset.year;
    renderGallery();
  });
});

// Clicking "all works" resets the gallery.
document.querySelector(".work-index h1")?.addEventListener(
  "click",
  () => {
    selectedYear = "all";
    renderGallery();
  }
);

/* ARTWORK VIEWER */

function openViewer(i) {
  if (!visibleArtworks.length) return;

  current =
    (i + visibleArtworks.length) % visibleArtworks.length;

  const a = visibleArtworks[current];

  document.querySelector("#viewer-image").src = a.image;
  document.querySelector("#viewer-image").alt = a.title;

  document.querySelector("#viewer-caption").textContent =
    `${a.title}, ${a.year} — ${a.medium}`;

  if (!viewer.open) viewer.showModal();
}

document.querySelector(".close").onclick = () => viewer.close();

document.querySelector(".previous").onclick = () =>
  openViewer(current - 1);

document.querySelector(".next").onclick = () =>
  openViewer(current + 1);

viewer.addEventListener("click", event => {
  if (event.target === viewer) viewer.close();
});

document.addEventListener("keydown", event => {
  if (!viewer.open) return;

  if (event.key === "ArrowRight") {
    openViewer(current + 1);
  }

  if (event.key === "ArrowLeft") {
    openViewer(current - 1);
  }
});

/* INITIALIZE */

window.addEventListener("hashchange", render);

document.querySelector("#year").textContent =
  new Date().getFullYear();

render();
