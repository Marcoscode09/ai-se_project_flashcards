import { hexToString } from "./colors.js";

let currentDeck = null;
let currentIndex = 0;
let showingQuestion = true;

const carouselSection = document.querySelector("#carousel");
const titleEl = carouselSection.querySelector(".carousel__title");
const cardEl = carouselSection.querySelector(".carousel__card");
const cardTextEl = carouselSection.querySelector(".carousel__card-text");

const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

function updateDisplay() {
  const currentCard = currentDeck.cards[currentIndex];

  titleEl.textContent = `${currentDeck.name} • ${currentIndex + 1} / ${
    currentDeck.cards.length
  }`;

  cardEl.classList.remove(
    "carousel__card_color_green",
    "carousel__card_color_blue",
    "carousel__card_color_purple",
    "carousel__card_color_white"
  );

  const color = hexToString(currentDeck.color);
  cardEl.classList.add(`carousel__card_color_${color}`);

  if (showingQuestion) {
    cardTextEl.textContent = currentCard.question;
  } else {
    cardTextEl.textContent = currentCard.answer;
    cardEl.classList.add("carousel__card_color_white");
  }

  leftBtn.classList.toggle(
    "carousel__btn_disabled",
    currentIndex === 0
  );

  rightBtn.classList.toggle(
    "carousel__btn_disabled",
    currentIndex === currentDeck.cards.length - 1
  );
}

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showingQuestion = true;
    updateDisplay();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex < currentDeck.cards.length - 1) {
    currentIndex++;
    showingQuestion = true;
    updateDisplay();
  }
});

flipBtn.addEventListener("click", () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
});

function renderCarouselView(deck) {
  currentDeck = deck;
  currentIndex = 0;
  showingQuestion = true;

  updateDisplay();
}

export { renderCarouselView };
