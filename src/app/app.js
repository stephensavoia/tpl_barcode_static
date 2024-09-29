import { CardNumberElement } from "./CardNumberElement";
import { createCarousel } from "./createCarousel";
import { drawWallpaper } from "./drawWallpaper";
import { switchToDownloadPage } from "./switchToDownloadPage";

export function app() {
  // BUTTON ELEMENTS (AND PREVIEW CANVAS, WHICH CAN BE CLICKED)
  const generateBarcodeButton = document.getElementById(
    "generateBarcodeButton"
  );
  const downloadPreviewCanvas = document.getElementById(
    `downloadPreviewCanvas`
  );
  const downloadWallpaperButton = document.getElementById(
    "downloadWallpaperButton"
  );
  // END OF BUTTON ELEMENTS

  // Below can be moved into downloadButton function
  const downloadButtonText = document.getElementById("downloadButtonText");
  const downloadButtonSpinner = document.getElementById(
    "downloadButtonSpinner"
  );
  const downloadErrorMessage = document.getElementById("downloadErrorMessage");

  // INSTANTIATE CARD NUMBER ELEMENT
  const cardNumberElement = new CardNumberElement();

  // CREATE CAROUSEL
  createCarousel();

  // HANDLE GENERATE BARCODE BUTTON
  // params cardNumberElement, downloadPreviewCanvas
  function generateBarcode() {
    let barcodeNumberInput = cardNumberElement.value;
    let designInput =
      document.querySelector('input[name="design"]:checked')?.value || "0";

    if (cardNumberElement.isValid()) {
      cardNumberElement.hideErrorMessages();
      drawWallpaper(
        downloadPreviewCanvas,
        designInput,
        barcodeNumberInput,
        "low"
      );
      switchToDownloadPage();
    } else {
      cardNumberElement.showErrorMessages();
    }
  }

  generateBarcodeButton?.addEventListener("click", generateBarcode);
  // END OF GENERATE BARCODE

  // HANDLE WALLPAPER DOWNLOAD
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
