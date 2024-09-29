export const loadImageAndDraw = (
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
        res === "low" ? Math.floor(barcodeRef.width / 5.81) : barcodeRef.width;
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

export async function drawWallpaper(canvas, design, barcodeNumber, res) {
  const colors = [
    { bgColor: "#deeff2", fgColor: "#0a1521" },
    { bgColor: "#e7d5f2", fgColor: "#2b2b4d" },
    { bgColor: "#f3ecf2", fgColor: "#162c35" },
    { bgColor: "#ecf7e0", fgColor: "#0f221b" },
    { bgColor: "#e4e9f2", fgColor: "#141f31" },
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
      if (res === "low") {
        const spinner = canvas.nextElementSibling;
        spinner.style.display = "none";
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  } else {
    console.warn(`Canvas element not found`);
  }
}
