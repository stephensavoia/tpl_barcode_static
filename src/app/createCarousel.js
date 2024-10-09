import { Carousel } from "flowbite";
import { drawWallpaper } from "./drawWallpaper";

export function createCarousel() {
  let carousel;
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
        }
      },
    };

    // Instance options object
    const instanceOptions = {
      id: "carousel",
      override: true,
    };

    carousel = new Carousel(carouselElement, items, options, instanceOptions);

    const $prevButton = document.getElementById("data-carousel-prev");
    const $nextButton = document.getElementById("data-carousel-next");

    $prevButton.addEventListener("click", () => {
      carousel.prev();
    });

    $nextButton.addEventListener("click", () => {
      carousel.next();
    });

    // Touch slide controls
    let touchStartX = 0;
    let touchEndX = 0;

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
}
