import { SPOT_HEIGHT, BIG_SPOT_HEIGHT, ANIMATION_DURATION } from "./consts";
import { getComponents } from "./components";

let raf, startTime;

const { grid } = getComponents();
const delta = BIG_SPOT_HEIGHT - SPOT_HEIGHT;

function animate(now) {
  const duration = now - startTime;
  const progress =
    duration < ANIMATION_DURATION ? duration / ANIMATION_DURATION : 1;
  const offset = delta * progress;

  if (grid.isOpened) {
    grid.betspotHeigh = SPOT_HEIGHT + offset;
  } else {
    grid.betspotHeigh = BIG_SPOT_HEIGHT - offset;
  }
  grid.draw();

  if (progress < 1) {
    raf = window.requestAnimationFrame(animate);
  } else {
    window.cancelAnimationFrame(raf);
    grid.isOpened = !grid.isOpened;
  }
}

grid.draw();

const button = document.getElementById("animate");
button.addEventListener("click", function (e) {
  startTime = performance.now();
  raf = window.requestAnimationFrame(animate);
});
