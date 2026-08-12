import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");

function createDeckEl(deckData) {
  const deckEl = deckTemplate.content
    .querySelector(".deck")
    .cloneNode(true);

  const titleEl = deckEl.querySelector(".deck__title");
  const countEl = deckEl.querySelector(".deck__count");
  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  const deckLink = deckEl.querySelector(".deck__link");

  titleEl.textContent = deckData.name;
  countEl.textContent = `${deckData.cards.length} Cards`;

  const color = hexToString(deckData.color);
  deckEl.classList.add(`deck_color_${color}`);

  deckLink.href = `#carousel/${deckData.id}`;

  deleteBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(deckData) {
  const deckEl = createDeckEl(deckData);
  deckList.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function router() {
  const hash = window.location.hash.replace("#", "");

  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  mainContent.classList.remove("page__main-content_location_carousel");

  if (hash === "" || hash === "home") {
    homeSection.style.display = "block";
  } else if (hash.startsWith("carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      renderCarouselView(deck);
      carouselSection.style.display = "flex";
      mainContent.classList.add("page__main-content_location_carousel");
    } else {
      notFoundSection.style.display = "block";
    }
  } else {
    notFoundSection.style.display = "block";
  }
}

window.addEventListener("hashchange", router);

router();

