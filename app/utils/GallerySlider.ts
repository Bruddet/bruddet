import {
  activeGallerySlideClassName,
  inactiveGallerySlideClassName,
} from "~/components/EventTextContent";

export const swapActiveImage = () => {
  const slides = document.getElementsByClassName("gallery-slide");
  const eventHeaderHeight =
    document.getElementById("event-header")?.offsetHeight || 0;

  const slidesArray = [].slice.call(slides);

  var scroll = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const maxScroll = scrollHeight - viewportHeight;

  const sectionHeight = maxScroll / slidesArray.length;

  slidesArray.forEach((el: Element, i) => {
    const sectionLowerBound = sectionHeight * i + eventHeaderHeight;
    const sectionHigherBound = sectionHeight * (i + 1) + eventHeaderHeight;

    console.log("sectionHeight", sectionHeight);
    console.log("scroll", scroll);
    console.log("eventHeaderHeight", eventHeaderHeight);

    if (scroll > eventHeaderHeight) {
      el.className = inactiveGallerySlideClassName;
      if (scroll >= sectionLowerBound && scroll <= sectionHigherBound) {
        el.className = activeGallerySlideClassName;
      }
    }
  });
};
