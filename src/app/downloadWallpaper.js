import { drawWallpaper } from "./drawWallpaper";

export async function downloadWallpaper(
  cardNumberElement,
  downloadWallpaperButton
) {
  const downloadButtonText = document.getElementById("downloadButtonText");
  const downloadButtonSpinner = document.getElementById(
    "downloadButtonSpinner"
  );
  const downloadErrorMessage = document.getElementById("downloadErrorMessage");

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
  await drawWallpaper(downloadCanvas, designInput, barcodeNumberInput, "high");
  const dataURL = downloadCanvas.toDataURL("image/png");
  try {
    // Check for browser support
    // if (
    //   typeof Blob === "undefined" ||
    //   typeof fetch === "undefined" ||
    //   typeof URL.createObjectURL === "undefined"
    // ) {
    //   throw new Error(
    //     "Your browser doesn't support required features for this functionality."
    //   );
    // }
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
    // setTimeout(() => {
    //   downloadErrorMessage.classList.remove("hidden");
    // }, 1000);
  } catch (err) {
    console.error("Error:", err);
    // downloadErrorMessage.classList.remove("hidden");
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
