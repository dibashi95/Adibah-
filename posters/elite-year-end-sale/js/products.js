// Places the two AIHAA Elite cutouts while keeping the original scene's proportions.
// Usage: placeElite({ scale, centerX, bottom, reflection })
//   scale      : size relative to the original 905px artwork (1 = original size)
//   centerX    : horizontal centre of the pair on the poster (px)
//   bottom     : y position of the floor line on the poster (px)
//   reflection : opacity of a mirrored floor reflection (0 = none)
//   reflectionHeight : reflection length as a fraction of machine height
(function () {
  // Bounding boxes of each cutout in original-artwork pixels.
  const BOX = {
    black: { x: 90.67, y: 292.67, w: 363.67, h: 558.67, src: "assets/elite-black-cutout.png", alt: "AIHAA Elite black" },
    white: { x: 479.67, y: 307.67, w: 381.67, h: 551.67, src: "assets/elite-white-cutout.png", alt: "AIHAA Elite white" },
  };
  const SCENE_CX = 476, SCENE_BOTTOM = 855;

  window.placeElite = function ({ scale = 1, centerX = 540, bottom = 960, reflection = 0, reflectionHeight = 0.32, parent, order = ["white", "black"], only } = {}) {
    const host = parent || document.getElementById("poster");
    const keys = only ? [only] : order;
    const placed = {};
    for (const k of keys) {
      const b = BOX[k];
      const left = centerX + (b.x - SCENE_CX) * scale;
      const top = bottom - (SCENE_BOTTOM - b.y) * scale;
      const w = b.w * scale, h = b.h * scale;
      if (reflection > 0) {
        const wrap = document.createElement("div");
        const rh = h * reflectionHeight;
        Object.assign(wrap.style, {
          position: "absolute", left: left + "px", top: top + h - 2 + "px", width: w + "px", height: rh + "px", overflow: "hidden",
          opacity: reflection, pointerEvents: "none",
          webkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0))",
        });
        const r = document.createElement("img");
        r.src = b.src; r.alt = "";
        Object.assign(r.style, { position: "absolute", left: 0, top: -h + "px", width: w + "px", height: h + "px", transform: "scaleY(-1)", transformOrigin: "50% 100%" });
        wrap.appendChild(r);
        host.appendChild(wrap);
      }
      const img = document.createElement("img");
      img.src = b.src; img.alt = b.alt; img.className = "prod prod-" + k;
      Object.assign(img.style, { position: "absolute", left: left + "px", top: top + "px", width: w + "px", height: h + "px" });
      host.appendChild(img);
      placed[k] = { left, top, w, h };
    }
    return placed;
  };
})();
