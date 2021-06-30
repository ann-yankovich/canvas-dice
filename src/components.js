import {
  BORDER_WIDTH,
  BET_ON_ALL_WIDTH,
  BET_ON_ALL_HEIGHT,
  SPOT_WIDTH,
  SPOT_HEIGHT,
  BIG_SPOT_HEIGHT,
  BORDER_RADIUS
} from "./consts";
import { roundedRect, shadowedText } from "./utils";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 3990;
const height = 964;
canvas.width = width;
canvas.height = height;
canvas.style.width = `${width / 4}px`;
canvas.style.height = `${height / 4}px`;
canvas.getContext("2d").scale(4, 4);

export function getComponents() {
  const betspot = {
    x: BORDER_WIDTH,
    y: BORDER_WIDTH,
    width: SPOT_WIDTH - BORDER_WIDTH,
    height: SPOT_HEIGHT - BORDER_WIDTH,
    number: 0,
    fontSize: 44,
    draw: function () {
      const width = this.width - BORDER_WIDTH * 2;
      const height = this.height - BORDER_WIDTH * 2;
      const fontSize = this.fontSize || 44;

      const x = this.x;
      const y = this.y;

      ctx.save();
      roundedRect(ctx, x, y, width, height, BORDER_RADIUS);
      ctx.restore();

      ctx.save();
      shadowedText(
        ctx,
        this.x + width / 2,
        this.y + (height * 0.75) / 2 - fontSize / 2,
        width,
        fontSize,
        this.number
      );
      ctx.restore();

      ctx.save();
      const multiplierGradient = ctx.createLinearGradient(
        width / 2 + x,
        height * 0.75 + y,
        width / 2 + x,
        height + y
      );
      multiplierGradient.addColorStop(0, "rgba(210, 210, 210, 0.315)");
      multiplierGradient.addColorStop(1, "rgba(91, 91, 91, 0.315)");

      ctx.fillStyle = multiplierGradient;
      ctx.fillRect(x, height * 0.75 + y, width, height * 0.25);

      ctx.fillStyle = "#FFF";
      ctx.font = `bold 14px Inter`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      ctx.fillText(
        `x${Math.ceil(Math.random() * (100 - 5) + 5)}`,
        this.x + width / 2,
        this.y + height * 0.95,
        width
      );

      ctx.restore();
    }
  };

  const asideSpots = {
    draw: function () {
      ctx.save();
      const { fontSize } = betspot;

      betspot.fontSize = 18;
      betspot.height = BIG_SPOT_HEIGHT;
      betspot.x = BORDER_WIDTH;
      betspot.y = BORDER_WIDTH;

      betspot.number = "LOW";
      betspot.draw();

      betspot.x = SPOT_WIDTH * 9 + BORDER_WIDTH;
      betspot.number = "HIGH";
      betspot.draw();

      betspot.x = BORDER_WIDTH;
      betspot.y = BIG_SPOT_HEIGHT + BORDER_WIDTH;
      betspot.number = "DOUBLE";
      betspot.draw();

      betspot.x = SPOT_WIDTH * 9 + BORDER_WIDTH;
      betspot.y = BIG_SPOT_HEIGHT + BORDER_WIDTH;
      betspot.number = "TRIPLE";
      betspot.draw();

      ctx.restore();

      betspot.fontSize = fontSize;
    }
  };

  const betOnAll = {
    x: SPOT_WIDTH + BORDER_WIDTH * 1.5,
    y: SPOT_HEIGHT * 2,
    width: BET_ON_ALL_WIDTH,
    height: BET_ON_ALL_HEIGHT,
    draw: function () {
      ctx.save();

      const width = this.width;
      const height = this.height;

      const x = this.x - BORDER_WIDTH;
      const y = this.y - BORDER_WIDTH;

      ctx.save();
      roundedRect(ctx, x, y, width, height, BORDER_RADIUS);
      ctx.restore();

      ctx.save();
      shadowedText(
        ctx,
        this.x + width / 2,
        this.y + height * 0.2,
        width,
        20,
        "BET ON ALL NUMBERS"
      );
      ctx.restore();

      ctx.restore();
    }
  };

  const grid = {
    betspotHeigh: SPOT_HEIGHT,
    isOpened: true,
    draw: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 1; i <= 16; i++) {
        const baseOffsetX = SPOT_WIDTH;
        const x = i > 8 ? (i - 8) * baseOffsetX : i * baseOffsetX;
        const y = i > 8 ? this.betspotHeigh : 0;

        betspot.x = x + BORDER_WIDTH;
        betspot.y = y + BORDER_WIDTH;
        betspot.height = this.betspotHeigh;
        betspot.number = i + 2;
        betspot.draw();
      }

      asideSpots.draw();

      betOnAll.y = (this.betspotHeigh + BORDER_WIDTH) * 2;
      betOnAll.draw();
    }
  };

  return {
    grid
  };
}
