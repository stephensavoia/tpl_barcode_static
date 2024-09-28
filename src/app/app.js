import { Carousel } from "flowbite";
import { validateCardNumber } from "./validateCardNumber";
import { drawWallpaper } from "./drawWallpaper";

export function app() {
  let pageSubmitted = false;
  let designInput = "0";
  let barcodeNumberInput = "00000000000000";

  let carousel;

  // ELEMENTS

  const formPage = document.getElementById("formPage");
  const downloadPage = document.getElementById("downloadPage");
  const cardNumberLabel = document.getElementById("cardNumberLabel");
  const cardNumberElement = document.getElementById("cardNumber");
  const cardNumberErrorMessage = document.getElementById(
    "cardNumberErrorMessage"
  );
  let designElement = document.querySelector('input[name="design"]:checked');
  const generateBarcodeButton = document.getElementById(
    "generateBarcodeButton"
  );
  const errorMessage = document.getElementById("errorMessage");
  const downloadPreviewCanvas = document.getElementById(
    "downloadPreviewCanvas"
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
      { position: 0, el: document.getElementById("carousel-item-0") },
      { position: 1, el: document.getElementById("carousel-item-1") },
      { position: 2, el: document.getElementById("carousel-item-2") },
      { position: 3, el: document.getElementById("carousel-item-3") },
      { position: 4, el: document.getElementById("carousel-item-4") },
    ];

    const options = {
      defaultPosition: 0,
      interval: 3000,
      indicators: {
        activeClasses: "bg-[#304a92]",
        inactiveClasses: "bg-gray-200 border border-gray-300 hover:bg-gray-50",
        items: [
          { position: 0, el: document.getElementById("carousel-indicator-0") },
          { position: 1, el: document.getElementById("carousel-indicator-1") },
          { position: 2, el: document.getElementById("carousel-indicator-2") },
          { position: 3, el: document.getElementById("carousel-indicator-3") },
          { position: 4, el: document.getElementById("carousel-indicator-4") },
        ],
      },
      onChange: () => {
        if (carousel) {
          const activeItem = items[
            carousel.getActiveItem().position
          ].el.querySelector('input[type="radio"]');
          activeItem.checked = true;
          designElement = activeItem;
        }
      },
    };

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

    barcodeNumberInput = cardNumberElement
      ? cardNumberElement.value ?? barcodeNumberInput
      : barcodeNumberInput;
    designInput = designElement
      ? designElement.value ?? designInput
      : designInput;

    const isValidCardNumber = validateCardNumber(
      barcodeNumberInput,
      cardNumberLabel,
      cardNumberElement,
      cardNumberErrorMessage,
      errorMessage
    );

    if (isValidCardNumber) {
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
