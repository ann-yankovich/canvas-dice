import { BORDER_WIDTH } from "./consts";

export function roundedRect(ctx, x, y, width, height, radius) {
  ctx.save();
  ctx.beginPath();

  ctx.lineWidth = BORDER_WIDTH;
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);

  const betspotGradient = ctx.createLinearGradient(
    width / 2 + x,
    0 + y,
    width / 2 + x,
    height + y
  );
  betspotGradient.addColorStop(0, "rgba(46, 46, 46, 0.8)");
  betspotGradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
  ctx.fillStyle = betspotGradient;

  const borderGradient = ctx.createLinearGradient(
    width / 2 + x,
    height + y,
    width / 2 + x,
    0 + y
  );
  borderGradient.addColorStop(0, "#BC8836");
  borderGradient.addColorStop(1, "#ECD778");
  ctx.strokeStyle = borderGradient;

  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function shadowedText(ctx, x, y, width, fontSize, text) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `bold ${fontSize}px Inter`;
  ctx.textBaseline = "top";
  ctx.save();
  ctx.shadowColor = "rgba(255,255,255,0.8)";
  ctx.shadowBlur = fontSize * 0.25;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "#F1EBD9";
  ctx.fillText(text, x, y, width);
  ctx.restore();

  // ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = fontSize * 0.1;
  ctx.shadowOffsetX = -0.5;
  ctx.shadowOffsetY = 1;
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = "#F4F4F0";
  ctx.strokeText(text, x, y, width);
  // ctx.restore();
  ctx.restore();
}
