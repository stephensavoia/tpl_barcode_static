import { Carousel } from "flowbite";
// import { CardNumberElement } from "./CardNumberElement";
import { drawWallpaper } from "./drawWallpaper";

export function app() {
  // GLOBAL VARIABLES
  var pageSubmitted = false;
  var validData = true;
  let carousel;
  // END OF GLOBAL VARIABLES

  // VALIDATE FUNCTION

  function validateCardNumber(
    number,
    label,
    input,
    cardErrorMessage,
    generalErrorMessage
  ) {
    if (number.length != 14 || !/^\d+$/.test(number)) {
      validData = false;
      label.classList.add("text-red-700");
      input.classList.add(
        "bg-red-50",
        "border-red-500",
        "text-red-900",
        "placeholder-red-700",
        "focus:ring-red-500",
        "focus:border-red-500"
      );
      if (number.length == 14) {
        cardErrorMessage.textContent = "Card number must contain only digits.";
      } else {
        cardErrorMessage.textContent = "Card number must be exactly 14 digits.";
      }
      cardErrorMessage.classList.remove("hidden");
      generalErrorMessage.classList.remove("hidden");
    } else {
      validData = true;
      label.classList.remove("text-red-700");
      input.classList.remove(
        "bg-red-50",
        "border-red-500",
        "text-red-900",
        "placeholder-red-700",
        "focus:ring-red-500",
        "focus:border-red-500"
      );
      cardErrorMessage.classList.add("hidden");

      generalErrorMessage.classList.add("hidden");
    }
  }

  // END OF VALIDATE FUNCTION

  // ELEMENTS
  const formPage = document.getElementById("formPage");
  const downloadPage = document.getElementById("downloadPage");
  const cardNumberLabel = document.getElementById("cardNumberLabel");
  const cardNumberElement = document.getElementById("cardNumber");
  const cardNumberErrorMessage = document.getElementById(
    "cardNumberErrorMessage"
  );
  const generateBarcodeButton = document.getElementById(
    "generateBarcodeButton"
  );
  const errorMessage = document.getElementById("errorMessage");
  const downloadPreviewCanvas = document.getElementById(
    `downloadPreviewCanvas`
  );
  const downloadWallpaperButton = document.getElementById(
    "downloadWallpaperButton"
  );
  const downloadButtonText = document.getElementById("downloadButtonText");
  const downloadButtonSpinner = document.getElementById(
    "downloadButtonSpinner"
  );
  const downloadErrorMessage = document.getElementById("downloadErrorMessage");
  // END OF ELEMENTS

  // CAROUSEL

  const carouselElement = document.getElementById("carousel");
  if (carouselElement) {
    const items = [
      {
        position: 0,
        el: document.getElementById("carousel-item-0"),
      },
      {
        position: 1,
        el: document.getElementById("carousel-item-1"),
      },
      {
        position: 2,
        el: document.getElementById("carousel-item-2"),
      },
      {
        position: 3,
        el: document.getElementById("carousel-item-3"),
      },
      {
        position: 4,
        el: document.getElementById("carousel-item-4"),
      },
    ];

    // Options with default values
    const options = {
      defaultPosition: 0,
      interval: 3000,

      indicators: {
        activeClasses: "bg-[#304a92]",
        inactiveClasses: "bg-gray-200 border border-gray-300 hover:bg-gray-50",
        items: [
          {
            position: 0,
            el: document.getElementById("carousel-indicator-0"),
          },
          {
            position: 1,
            el: document.getElementById("carousel-indicator-1"),
          },
          {
            position: 2,
            el: document.getElementById("carousel-indicator-2"),
          },
          {
            position: 3,
            el: document.getElementById("carousel-indicator-3"),
          },
          {
            position: 4,
            el: document.getElementById("carousel-indicator-4"),
          },
        ],
      },

      // Callback functions
      onChange: () => {
        if (carousel) {
          const activeItem = items[
            carousel.getActiveItem().position
          ].el.querySelector('input[type="radio"]');
          activeItem.checked = true;
        }
      },
    };

    // Instance options object
    const instanceOptions = {
      id: "carousel",
      override: true,
    };

    carousel = new Carousel(carouselElement, items, options, instanceOptions);

    const $prevButton = document.getElementById("data-carousel-prev");
    const $nextButton = document.getElementById("data-carousel-next");

    $prevButton.addEventListener("click", () => {
      carousel.prev();
    });

    $nextButton.addEventListener("click", () => {
      carousel.next();
    });

    // Touch slide controls
    var touchStartX = 0;
    var touchEndX = 0;

    function handleTouchStart(event) {
      touchStartX = event.targetTouches[0].clientX;
    }

    function handleTouchEnd(event) {
      touchEndX = event.changedTouches[0].clientX;

      if (touchStartX - touchEndX < -50) {
        carousel.prev();
      } else if (touchStartX - touchEndX > 50) {
        carousel.next();
      }
    }

    const carouselSlideLabels = document.querySelectorAll(".radio-img");
    carouselSlideLabels.forEach((label) => {
      label.addEventListener("touchstart", handleTouchStart, { passive: true });
      label.addEventListener("touchend", handleTouchEnd, { passive: true });
    });

    // This is a hack to fix an issue with the Flowbite carousel showing the slide inbetween
    options.indicators.items.forEach((indicator) => {
      indicator.el.addEventListener("click", () => {
        const activeItem = carousel.getActiveItem().position;
        for (let i = 0; i < items.length; i++) {
          if (i !== activeItem) {
            items[i].el.classList.add("hidden");
          }
        }
        setTimeout(() => {
          if (activeItem === 0) {
            items[items.length - 1].el.classList.remove("hidden");
            items[activeItem + 1].el.classList.remove("hidden");
          } else if (activeItem === items.length - 1) {
            items[activeItem - 1].el.classList.remove("hidden");
            items[0].el.classList.remove("hidden");
          } else {
            items[activeItem - 1].el.classList.remove("hidden");
            items[activeItem + 1].el.classList.remove("hidden");
          }
        }, 500);
      });
    });

    // Draw to each canvas
    const canvases = [0, 1, 2, 3, 4];
    for (let i = 0; i < canvases.length; i++) {
      const canvas = document.getElementById(`canvas${i}`);
      drawWallpaper(canvas, i, "00000000000000", "low");
    }
  }
  // END OF CAROUSEL

  // GENERATE BARCODE
  function generateBarcode() {
    pageSubmitted = true;

    let barcodeNumberInput = cardNumberElement
      ? cardNumberElement.value ?? "00000000000000"
      : "00000000000000";
    let designInput =
      document.querySelector('input[name="design"]:checked')?.value || "0";

    // validate barcode
    validateCardNumber(
      barcodeNumberInput,
      cardNumberLabel,
      cardNumberElement,
      cardNumberErrorMessage,
      errorMessage
    );

    if (validData) {
      drawWallpaper(
        downloadPreviewCanvas,
        designInput,
        barcodeNumberInput,
        "low"
      );

      formPage.classList.add("hidden");
      downloadPage.classList.remove("hidden");
    }
  }

  if (generateBarcodeButton) {
    generateBarcodeButton.addEventListener("click", generateBarcode);
  }
  // END OF GENERATE BARCODE

  // ON CHANGE
  if (cardNumberElement) {
    cardNumberElement.addEventListener("input", (e) => {
      // Only validate if the "form" has been submitted at least once
      if (pageSubmitted) {
        validateCardNumber(
          e.target.value,
          cardNumberLabel,
          cardNumberElement,
          cardNumberErrorMessage,
          errorMessage
        );
      }
    });
  }
  // END OF ON CHANGE

  // DOWNLOAD WALLPAPER

  async function downloadWallpaper() {
    let barcodeNumberInput = cardNumberElement
      ? cardNumberElement.value ?? "00000000000000"
      : "00000000000000";
    let designInput =
      document.querySelector('input[name="design"]:checked')?.value || "0";
    downloadButtonText.classList.add("invisible");
    downloadButtonSpinner.classList.remove("hidden");
    downloadWallpaperButton.disabled = true;
    downloadWallpaperButton.classList.add("cursor-not-allowed", "opacity-50");
    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = 1290;
    downloadCanvas.height = 2796;
    await drawWallpaper(
      downloadCanvas,
      designInput,
      barcodeNumberInput,
      "high"
    );
    const dataURL = downloadCanvas.toDataURL("image/png");
    try {
      // Check for browser support
      if (
        typeof Blob === "undefined" ||
        typeof fetch === "undefined" ||
        typeof URL.createObjectURL === "undefined"
      ) {
        throw new Error(
          "Your browser doesn't support required features for this functionality."
        );
      }
      const res = await fetch(dataURL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      // Error message for in-app browsers that don't allow programmatic clicking
      setTimeout(() => {
        downloadErrorMessage.classList.remove("hidden");
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      downloadErrorMessage.classList.remove("hidden");
    } finally {
      downloadButtonSpinner.classList.add("hidden");
      downloadButtonText.classList.remove("invisible");
      downloadWallpaperButton.disabled = false;
      downloadWallpaperButton.classList.remove(
        "cursor-not-allowed",
        "opacity-50"
      );
    }
  }

  if (downloadWallpaperButton) {
    downloadPreviewCanvas.addEventListener("click", downloadWallpaper);
    downloadWallpaperButton.addEventListener("click", downloadWallpaper);
  }
}
