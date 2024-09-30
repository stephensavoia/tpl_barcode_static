import { isInAppBrowser, showOpenInBrowserMessage } from "./checkBrowser";
import { CardNumberElement } from "./CardNumberElement";
import { createCarousel } from "./createCarousel";
import { generateBarcode } from "./generateBarcode";
import { downloadWallpaper } from "./downloadWallpaper";

export function app() {
  if (isInAppBrowser()) {
    showOpenInBrowserMessage(); // checkBrowser.js
  } else {
    const cardNumberElement = new CardNumberElement(); // CardNumberElement.js

    createCarousel(); //createCarousel.js

    const generateBarcodeButton = document.getElementById(
      "generateBarcodeButton"
    );
    generateBarcodeButton?.addEventListener("click", function () {
      generateBarcode(cardNumberElement, downloadPreviewCanvas);
    }); // generateBarcode.js

    const downloadPreviewCanvas = document.getElementById(
      `downloadPreviewCanvas`
    );
    const downloadWallpaperButton = document.getElementById(
      "downloadWallpaperButton"
    );
    if (downloadWallpaperButton) {
      downloadPreviewCanvas.addEventListener("click", function () {
        downloadWallpaper(cardNumberElement, downloadWallpaperButton);
      });
      downloadWallpaperButton.addEventListener("click", function () {
        downloadWallpaper(cardNumberElement, downloadWallpaperButton);
      });
    } // downloadWallpaper.js
  }
}
