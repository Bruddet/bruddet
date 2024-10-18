import {
  activeGallerySlideClassName,
  inactiveGallerySlideClassName,
} from "~/components/EventTextContent";

export const swapActiveImage = () => {
  const slides = document.getElementsByClassName("gallery-slide");
  const eventHeaderHeight =
    document.getElementById("event-header")?.offsetHeight || 0;

  const slidesArray = [].slice.call(slides);

  var scroll = window.scrollY + eventHeaderHeight;

  var body = document.body;
  var html = document.documentElement;

  const pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const viewportHeight = window.innerHeight;

  const sectionHeight = (pageHeight - viewportHeight) / slidesArray.length;

  slidesArray.forEach((el: Element, n) => {
    var sectionLowerBound = 0;

    if (n !== 0) {
      sectionLowerBound = sectionHeight * n + eventHeaderHeight;
    }

    var sectionHigherBound = sectionHeight * (n + 1) + eventHeaderHeight;

    if (scroll > eventHeaderHeight) {
      el.className = inactiveGallerySlideClassName;
      if (scroll >= sectionLowerBound && scroll <= sectionHigherBound) {
        el.className = activeGallerySlideClassName;
      }
    }
  });
};
