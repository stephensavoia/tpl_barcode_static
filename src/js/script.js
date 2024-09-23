import { Carousel } from "flowbite";

document.addEventListener("DOMContentLoaded", function () {
  // STATE VARIABLES
  var page = "select"; // There are 2 pages: select, download
  var selectedDesign = "0";
  var validData = true;
  var barcodeNumber = "1234567890"; // There are 2 barcode numbers: 1234567890, 0987654321
  // END OF STATE VARIABLES

  // JsBarcode("#barcode", "1234567890", {
  //   format: "codabar",
  // });

  // DRAW CANVAS

  const loadImageAndDraw = (
    img,
    wallpaperCtx,
    wallpaperRef,
    barcodeRef,
    res
  ) => {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        wallpaperCtx.drawImage(img, 0, 0);
        const bcw =
          res === "low"
            ? Math.floor(barcodeRef.width / 5.81)
            : barcodeRef.width;
        const bch =
          res === "low"
            ? Math.floor(barcodeRef.height / 5.81)
            : barcodeRef.height;
        const x = (wallpaperRef.width - bcw) / 2;
        const y = (wallpaperRef.height - bch) / 2;
        wallpaperCtx.drawImage(barcodeRef, x, y, bcw, bch);
        resolve();
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function drawWallpaper(canvas, design, barcodeNumber, res) {
    const colors = [
      {
        bgColor: "#deeff2",
        fgColor: "#0a1521",
      },
      {
        bgColor: "#e7d5f2",
        fgColor: "#2b2b4d",
      },
      {
        bgColor: "#f3ecf2",
        fgColor: "#162c35",
      },
      {
        bgColor: "#ecf7e0",
        fgColor: "#0f221b",
      },
      {
        bgColor: "#e4e9f2",
        fgColor: "#141f31",
      },
    ];

    const dimensions = {
      low: {
        wWidth: 222,
        wHeight: 472,
        bWidth: 5,
        bHeight: 250,
        fSize: 80,
        margin: 40,
      },
      high: {
        wWidth: 1290,
        wHeight: 2796,
        bWidth: 5,
        bHeight: 250,
        fSize: 80,
        margin: 40,
      },
    };

    const barcodeCanvas = document.createElement("canvas");
    barcodeCanvas.id = "barcodeCanvas";
    JsBarcode(barcodeCanvas, barcodeNumber, {
      format: "codabar",
      height: dimensions[res].bHeight,
      width: dimensions[res].bWidth,
      fontSize: dimensions[res].fSize,
      margin: dimensions[res].margin,
      background: colors[design].bgColor,
      lineColor: colors[design].fgColor,
    });

    if (canvas) {
      const ctx = canvas.getContext("2d");

      const bgImage = new Image();
      bgImage.src =
        res === "low"
          ? `/img/wallpaper-${design}-low-res.png`
          : `/img/wallpaper-${design}.png`;

      try {
        await loadImageAndDraw(bgImage, ctx, canvas, barcodeCanvas, res);
        // find the span element directly under canvas, and make it display none
        const spinner = canvas.nextElementSibling;
        spinner.style.display = "none";
      } catch (error) {
        console.error("Error loading image:", error);
      }
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
          console.log(activeItem.checked);
        }
      },
    };

    // Instance options object
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
    const cardNumberElement = document.getElementById("cardNumber");
    const designElement = document.querySelector(
      'input[name="design"]:checked'
    );

    const cardNumberInput = cardNumberElement
      ? cardNumberElement.value ?? "null"
      : "null";
    const designInput = designElement ? designElement.value ?? "null" : "null";

    alert("Card Number: " + cardNumberInput + " Design: " + designInput);
  }

  const generateBarcodeButton = document.getElementById(
    "generateBarcodeButton"
  );
  if (generateBarcodeButton) {
    generateBarcodeButton.addEventListener("click", generateBarcode);
  }
  // END OF GENERATE BARCODE

  const downloadPreviewCanvas = document.getElementById(
    `downloadPreviewCanvas`
  );
  if (downloadPreviewCanvas) {
    drawWallpaper(downloadPreviewCanvas, "0", "00000000000000", "low");
  }
});
