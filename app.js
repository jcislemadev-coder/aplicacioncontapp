/* =========================
   LOAD ARTICLE
========================= */

async function loadArticle(file) {

  try {

    /* LOAD JSON */
    const response = await fetch(`tutoriales/${file}.json`);

    if (!response.ok) {
      throw new Error('No se pudo cargar el tutorial');
    }

    const article = await response.json();

    /* CONTAINER */
    const container = document.getElementById('articleContainer');
    container.classList.remove('hidden');

    /* =========================
       VIDEO ONLY RENDER
    ========================= */

    if (article?.type === "video-only") {

      container.innerHTML = `
        <div class="breadcrumb">
          ${article?.breadcrumb || ""}
        </div>

        <h2>
          ${article?.title || ""}
        </h2>

        <p class="article-description">
          ${article?.description || ""}
        </p>

        <div class="video-box">
          <iframe
            src="${article?.video || ""}"
            allowfullscreen>
          </iframe>
        </div>

        ${article?.tip ? `
          <div class="tip">
            💡 ${article.tip}
          </div>
        ` : ""}
      `;

    }

    /* =========================
       FULL TUTORIAL RENDER
    ========================= */

    else {

      let stepsHTML = "";

      if (article?.steps?.length) {

        stepsHTML = article.steps.map((step, index) => `
          <div class="step">

            <div class="step-number">
              ${index + 1}
            </div>

            <h3>
              ${step?.title || ""}
            </h3>

            <p>
              ${step?.text || ""}
            </p>

            ${step?.video ? `
              <video autoplay muted loop playsinline>
                <source src="${step.video}" type="video/mp4">
              </video>
            ` : ""}

          </div>
        `).join("");
      }

      container.innerHTML = `
        <div class="breadcrumb">
          ${article?.breadcrumb || ""}
        </div>

        <h2>
          ${article?.title || ""}
        </h2>

        <p class="article-description">
          ${article?.description || ""}
        </p>

        <!-- VIDEO MODE -->
        ${article?.video ? `
          <div class="video-mode">
            <div class="video-box">
              <iframe
                src="${article.video}"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        ` : ""}

        <!-- GUIDE MODE -->
        <div class="guide-mode">
          ${stepsHTML}

          ${article?.tip ? `
            <div class="tip">
              💡 ${article.tip}
            </div>
          ` : ""}
        </div>
      `;
    }

    /* SCROLL */
    container.scrollIntoView({
      behavior: 'smooth'
    });

  }

  catch (error) {

    console.error(error);

    document.getElementById('articleContainer').innerHTML = `
      <div class="error-box">
        ❌ Error al cargar el tutorial.
      </div>
    `;
  }
}

/* =========================
   SEARCH
========================= */

const searchInput = document.getElementById('searchInput');

if (searchInput) {

  searchInput.addEventListener('keyup', function () {

    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll('.help-card');

    cards.forEach(card => {

      const text = card.innerText.toLowerCase();

      card.style.display = text.includes(value)
        ? 'flex'
        : 'none';

    });

  });
}