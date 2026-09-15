import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");

const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");

const deckViewTitle = document.querySelector(".deck-view__title");
const deckViewCards = document.querySelector(".deck-view__cards");
const cardTemplate = document.querySelector("#card-template");
const practiceBtn = document.querySelector(".deck-view__practice-btn");

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

  // Clicking a deck now opens the deck instead of
  // immediately starting the carousel.
  deckLink.href = `#deck/${deckData.id}`;

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

function createCardEl(cardData, deckData) {
  const cardEl = cardTemplate.content
    .querySelector(".deck-view__card")
    .cloneNode(true);

  const cardText = cardEl.querySelector(".deck-view__card-text");
  const deleteBtn = cardEl.querySelector(".deck-view__delete-btn");

  cardText.textContent = cardData.question;

  const color = hexToString(deckData.color);
  cardEl.classList.add(`deck-view__card_color_${color}`);

  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  return cardEl;
}

function renderDeckView(deckData) {
  deckViewTitle.textContent = deckData.name;

  // Clear cards from the previously opened deck.
  deckViewCards.innerHTML = "";

  deckData.cards.forEach((cardData) => {
    const cardEl = createCardEl(cardData, deckData);
    deckViewCards.append(cardEl);
  });

  practiceBtn.href = `#carousel/${deckData.id}`;
}

function hideAllSections() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function router() {
  const hash = window.location.hash.replace("#", "");

  hideAllSections();

  mainContent.classList.remove(
    "page__main-content_location_carousel"
  );

  if (hash === "" || hash === "home") {
    homeSection.style.display = "block";
    return;
  }

  if (hash.startsWith("deck/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      renderDeckView(deck);
      deckViewSection.style.display = "block";
    } else {
      notFoundSection.style.display = "block";
    }

    return;
  }

  if (hash.startsWith("carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      renderCarouselView(deck);
      carouselSection.style.display = "flex";

      mainContent.classList.add(
        "page__main-content_location_carousel"
      );
    } else {
      notFoundSection.style.display = "block";
    }

    return;
  }

  notFoundSection.style.display = "block";
}

window.addEventListener("hashchange", router);

router();
