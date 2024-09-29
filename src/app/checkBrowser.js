export function isInAppBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  console.log(userAgent);
  return /FBAN|FBAV|Instagram|Line|LinkedIn|Snapchat|Twitter|WhatsApp/.test(
    userAgent
  );
}

export function showOpenInBrowserMessage() {
  const formPage = document.getElementById("formPage");
  if (formPage) {
    formPage.innerHTML = `
        <div class="flex h-full flex-col justify-center gap-4 px-6 pt-6 pb-6">
          <div class="flex max-w-md flex-col gap-4">
            <div>
              <div class="block">

                <div
                    class="flex items-center"
                    data-testid="flowbite-alert-wrapper"
                >
                    <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    class="mr-3 inline h-5 w-5 flex-shrink-0"
                    data-testid="flowbite-alert-icon"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    ></path>
                    </svg>
                    <div>
                      TPL Barcode Generator is not supported by in-app browsers. 
                      <a href="https://tplbarcode.com" class="text-md text-[#304a92] underline hover:no-underline">Open in main browser</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
  }
}
