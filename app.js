/* =========================
   LOAD ARTICLE
========================= */

async function loadArticle(file) {

  try {

    /* LOAD JSON */

    const response =
      await fetch(
        `tutoriales/${file}.json`
      );

    if (!response.ok) {

      throw new Error(
        'No se pudo cargar el tutorial'
      );

    }

    const article =
      await response.json();

    /* CONTAINER */

    const container =
      document.getElementById(
        'articleContainer'
      );

    container.classList.remove(
      'hidden'
    );

    /* BUILD STEPS */

    let stepsHTML = '';

    if (article.steps) {

      article.steps.forEach(
        (step, index) => {

          stepsHTML += `

            <div class="step">

              <div class="step-number">
                ${index + 1}
              </div>

              <h3>
                ${step.title}
              </h3>

              <p>
                ${step.text}
              </p>

              <video
                autoplay
                muted
                loop
                playsinline>

                <source
                  src="${step.video}"
                  type="video/mp4">

              </video>

            </div>

          `;
        }
      );

    }

    /* =========================
       VIDEO ONLY
    ========================= */

    if (
      article.type ===
      'video-only'
    ) {

      container.innerHTML = `

        <div class="breadcrumb">
          ${article.breadcrumb}
        </div>

        <h2>
          ${article.title}
        </h2>

        <p class="article-description">
          ${article.description}
        </p>

        <div class="video-box">

          <iframe
            src="${article.video}"
            allowfullscreen>

          </iframe>

        </div>

      `;

    }

    /* =========================
       FULL TUTORIAL
    ========================= */

    else {

      container.innerHTML = `

        <div class="breadcrumb">
          ${article.breadcrumb}
        </div>

        <h2>
          ${article.title}
        </h2>

        <p class="article-description">
          ${article.description}
        </p>

        <!-- MODE BUTTONS -->

        <div class="tutorial-mode">
        ` + /* =========================

          /*<button
            class="mode-button active"
            onclick="showGuide()">

            🖼️ Guía visual

          </button>

          <button
            class="mode-button"
            onclick="showVideo()">

            🎥 Video tutorial

          </button>*/

        `</div>

        <!-- VIDEO MODE -->

        <div
          class="video-mode hidden"
          id="videoMode">

          <div class="video-box">

            <iframe
              src="${article.video}"
              allowfullscreen>

            </iframe>

          </div>

        </div>

        <!-- GUIDE MODE -->

        <div
          class="guide-mode"
          id="guideMode">

          ${stepsHTML}

          <div class="tip">
            💡 ${article.tip}
          </div>

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

    document.getElementById(
      'articleContainer'
    ).innerHTML = `

      <div class="error-box">

        ❌ Error al cargar el tutorial.

      </div>

    `;

  }

}

/* =========================
   SHOW GUIDE
========================= */

function showGuide() {

  document
    .getElementById(
      'guideMode'
    )
    .classList.remove(
      'hidden'
    );

  document
    .getElementById(
      'videoMode'
    )
    .classList.add(
      'hidden'
    );

  /* ACTIVE BUTTON */

  document
    .querySelectorAll(
      '.mode-button'
    )
    .forEach(button => {

      button.classList.remove(
        'active'
      );

    });

  document
    .querySelectorAll(
      '.mode-button'
    )[0]
    .classList.add(
      'active'
    );

}

/* =========================
   SHOW VIDEO
========================= */

function showVideo() {

  document
    .getElementById(
      'videoMode'
    )
    .classList.remove(
      'hidden'
    );

  document
    .getElementById(
      'guideMode'
    )
    .classList.add(
      'hidden'
    );

  /* ACTIVE BUTTON */

  document
    .querySelectorAll(
      '.mode-button'
    )
    .forEach(button => {

      button.classList.remove(
        'active'
      );

    });

  document
    .querySelectorAll(
      '.mode-button'
    )[1]
    .classList.add(
      'active'
    );

}

/* =========================
   SEARCH
========================= */

const searchInput =
  document.getElementById(
    'searchInput'
  );

if (searchInput) {

  searchInput.addEventListener(
    'keyup',
    function () {

      const value =
        this.value.toLowerCase();

      const cards =
        document.querySelectorAll(
          '.help-card'
        );

      cards.forEach(card => {

        const text =
          card.innerText.toLowerCase();

        if (
          text.includes(value)
        ) {

          card.style.display =
            'flex';

        } else {

          card.style.display =
            'none';

        }

      });

    }
  );

}