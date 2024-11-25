
const uploadInput = document.getElementById("imageUpload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.getElementById("downloadButton");
const traits = document.querySelectorAll(".trait");

// Filter text overlays
const filterText = {
  "X-Bold": { text: "Fearless, daring, unapologetically stands out.", emoji: "🔥" },
  "X-Young": { text: "Vibrant, playful, energetic, always curious.", emoji: "✨" },
  "X-Rebel": { text: "Challenges norms, thrives on uniqueness.", emoji: "⚡" },
  "X-Dreamer": { text: "Visionary, imaginative, driven by ambition.", emoji: "🌌" },
  "X-Creator": { text: "Innovates, builds, turns ideas real.", emoji: "💡" },
  "X-Adventurer": { text: "Explores, dares, embraces the unknown.", emoji: "🏔️" },
  "X-Loyal": { text: "Faithful, reliable, stands by values.", emoji: "🤝" },
  "X-Charismatic": { text: "Inspires, attracts, leads with charm.", emoji: "🌟" },
  "X-Passionate": { text: "Dedicated, driven, fueled by fire.", emoji: "🔥" },
  "X-Edgy": { text: "Provocative, unconventional, pushes boundaries.", emoji: "🖤" },
};

// Load image onto canvas
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    };
    reader.readAsDataURL(file);
  }
});

// Apply personality filters with text overlays
traits.forEach((trait) => {
  trait.addEventListener("click", () => {
    const filter = trait.getAttribute("data-filter");
    applyFilter(filter);
  });
});

function applyFilter(filter) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = canvas.toDataURL();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Add overlay text and emoji
    const { text, emoji } = filterText[filter];
    ctx.globalAlpha = 0.8;
    ctx.font = "40px 'Poppins', sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;

    // Emoji
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2 - 30);

    // Text
    ctx.font = "20px 'Poppins', sans-serif";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 30);
  };
}

// Download image
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
