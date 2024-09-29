import { isInAppBrowser, showOpenInBrowserMessage } from "./checkBrowser";
import { CardNumberElement } from "./CardNumberElement";
import { createCarousel } from "./createCarousel";
import { generateBarcode } from "./generateBarcode";
import { downloadWallpaper } from "./downloadWallpaper";

export function app() {
  if (isInAppBrowser()) {
    showOpenInBrowserMessage();
  } else {
    const generateBarcodeButton = document.getElementById(
      "generateBarcodeButton"
    );
    const downloadPreviewCanvas = document.getElementById(
      `downloadPreviewCanvas`
    );
    const downloadWallpaperButton = document.getElementById(
      "downloadWallpaperButton"
    );

    const cardNumberElement = new CardNumberElement(); // CardNumberElement.js

    createCarousel(); //createCarousel.js

    generateBarcodeButton?.addEventListener("click", function () {
      generateBarcode(cardNumberElement, downloadPreviewCanvas);
    }); // generateBarcode.js

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
