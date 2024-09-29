import { drawWallpaper } from "./drawWallpaper.js";

const formPage = document.getElementById("formPage");
const downloadPage = document.getElementById("downloadPage");

export function switchToDownloadPage() {
  formPage.classList.add("hidden");
  downloadPage.classList.remove("hidden");
}

export function generateBarcode(cardNumberElement, downloadPreviewCanvas) {
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
