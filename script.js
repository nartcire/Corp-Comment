// -- GLOBAL -- //
const MAX_CHARS = 150;

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

// -- COUNTER COMPONENT -- //
const inputHandler = () => {
  const maxChars = MAX_CHARS;
  const numCharsTyped = textareaEl.value.length;
  const charsLeft = maxChars - numCharsTyped;

  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener("input", inputHandler);

// -- FORM COMPONENT -- //
const showVisualIndicator = (textCheck) => {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";

  formEl.classList.add(className);

  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
};

const submitHandler = (event) => {
  event.preventDefault();

  const text = textareaEl.value;

  // validate text
  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");

    textareaEl.focus();

    return;
  }

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // new feedback item HTML
  const feedbackItemHTML = `
    <li class="feedback">
      <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upvoteCount}</span>
      </button>
      <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
      </section>
      <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${text}</p>
      </div>
      <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
    </li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);
