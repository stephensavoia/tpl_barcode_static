export class CardNumberElement {
  constructor() {
    this.cardNumberElement = document.getElementById("cardNumber");
    this.cardNumberLabelElement = document.getElementById("cardNumberLabel");
    this.cardNumberErrorElement = document.getElementById(
      "cardNumberErrorMessage"
    );
    this.bottomCardNumberErrorMessageElement = document.getElementById(
      "bottomCardNumberErrorMessage"
    );
    this.init();
  }

  init() {
    // document.querySelectorAll("[data-focus-input-init]").forEach((element) => {
    //   element.addEventListener("focus", () => element.select());
    //   element.addEventListener("keydown", function () {
    //     setTimeout(() => {
    //       const prev = cardNumberElement.querySelector(
    //         `#${this.getAttribute("data-focus-input-prev")}`
    //       );
    //       const next = cardNumberElement.querySelector(
    //         `#${this.getAttribute("data-focus-input-next")}`
    //       );

    //       if (this.value.length === 0) {
    //         prev?.focus();
    //       } else {
    //         next?.focus();
    //       }
    //     });
    //   });
    // });

    this.cardNumberElement.addEventListener("input", () => {
      if (this.isValid()) {
        this.hideErrorMessages();
      }
    });
  }

  get value() {
    // const values = [];

    // for (let i = 1; i <= 14; i += 1) {
    //   const input = this.cardNumberElement.querySelector(`#code-${i}`);
    //   values.push(input.value);
    // }

    // return values.join("");
    return this.cardNumberElement.value;
  }

  hideErrorMessages() {
    this.cardNumberLabelElement.classList.remove("text-red-700");
    this.cardNumberElement.classList.remove(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "placeholder-red-700",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    this.cardNumberErrorElement.classList.add("hidden");
    this.bottomCardNumberErrorMessageElement.classList.add("hidden");
  }

  showErrorMessages() {
    this.cardNumberLabelElement.classList.add("text-red-700");
    this.cardNumberElement.classList.add(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "placeholder-red-700",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    if (this.value.length == 14) {
      this.cardNumberErrorElement.textContent =
        "Card number must contain only digits.";
    } else {
      this.cardNumberErrorElement.textContent =
        "Card number must be 14 digits.";
    }
    this.cardNumberErrorElement.classList.remove("hidden");
    this.bottomCardNumberErrorMessageElement.classList.remove("hidden");
  }

  isValid() {
    const number = this.value;
    return number.length === 14 && /^\d+$/.test(number);
  }
}
