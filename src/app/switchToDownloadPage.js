const formPage = document.getElementById("formPage");
const downloadPage = document.getElementById("downloadPage");

export function switchToDownloadPage() {
  formPage.classList.add("hidden");
  downloadPage.classList.remove("hidden");
}
