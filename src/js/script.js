import { Carousel } from "flowbite";

document.addEventListener("DOMContentLoaded", function () {
  // STATE VARIABLES
  var page = "select"; // There are 2 pages: select, download
  var selectedDesign = "blue"; // There are 4 designs: blue, green, red, yellow
  var validData = true;
  var barcodeNumber = "1234567890"; // There are 2 barcode numbers: 1234567890, 0987654321
  // END OF STATE VARIABLES

  // JsBarcode("#barcode", "1234567890", {
  //   format: "codabar",
  // });

  // DRAW CANVAS

  function drawWallpaper(canvas, design, barcodeNumber, res) {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = design;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log(`Barcode number: ${barcodeNumber} and Res: ${res}`);
    } else {
      console.warn(`Canvas element not found`);
    }
  }

  // Example usage:
  // drawOnCanvas(downloadPreviewCanvas, "blue", 123456);

  // END DRAW CANVAS

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

    // options with default values
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

      // callback functions
      onNext: () => {
        console.log("next slider item is shown");
      },
      onPrev: () => {
        console.log("previous slider item is shown");
      },
      onChange: () => {
        // hide each element in items array EXCEPT for the current slide
        console.log(this);
      },
    };

    // instance options object
    const instanceOptions = {
      id: "carousel",
      override: true,
    };

    const carousel = new Carousel(
      carouselElement,
      items,
      options,
      instanceOptions
    );

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

    // draw to each canvas
    const canvases = [0, 1, 2, 3, 4];
    const colors = ["red", "green", "blue", "yellow", "purple"];
    for (let i = 0; i < canvases.length; i++) {
      const canvas = document.getElementById(`canvas${i}`);
      drawWallpaper(canvas, colors[i], 123456, "low");
    }
  }
  // END OF CAROUSEL

  const downloadPreviewCanvas = document.getElementById(
    `downloadPreviewCanvas`
  );
  if (downloadPreviewCanvas) {
    drawWallpaper(downloadPreviewCanvas, "blue", 123456, "high");
  }
});
