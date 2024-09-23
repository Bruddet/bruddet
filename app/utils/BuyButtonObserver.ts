import { useEffect } from "react";
import throttle from "lodash/throttle";

export function useBuyButtonObserver() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buttonVisibilityListener);
      } else {
        buttonVisibilityListener();
      }
    } else {
      console.error("document is undefined");
    }
  }, []);
}

function buttonVisibilityListener() {
  const buyButton = document.getElementById("buyButton");
  const eventsList = document.getElementById("tickets");

  if (buyButton !== null && eventsList !== null) {
    toggleButtonVisibility(buyButton, eventsList);
    const toggler = throttle(() => {
      toggleButtonVisibility(buyButton, eventsList);
    }, 100);

    window.addEventListener("scroll", toggler);

    return () => {
      window.removeEventListener("scroll", toggler);
    };
  }
}

function toggleButtonVisibility(button: HTMLElement, list: HTMLElement) {
  const productionInfo = document.getElementById("eventLabels");
  const listIsVisible = elementIsVisibleInViewPort(list, 260);
  const productionInfoIsVisible = productionInfo
    ? elementIsVisibleInViewPort(productionInfo)
    : false;

  button.classList.remove("hidden");

  button.className =
    listIsVisible || productionInfoIsVisible
      ? `${button.className} `
      : `${button.className} hidden`;

  button.style.display =
    listIsVisible || productionInfoIsVisible ? "hidden" : "";
}

function elementIsVisibleInViewPort(
  element: HTMLElement,
  optionalPixelDelay = 0
) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top + optionalPixelDelay < viewportHeight &&
    rect.bottom + optionalPixelDelay > 0
  );
}
