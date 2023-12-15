const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "unlock") {
    const node =
      event.target.tagName.toLowerCase() === "img"
        ? event.target
        : event.target.children[0];

    node.src = "./Images/lockwhite.png";
  }
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "img"
        ? event.target
        : event.target.children[0];

    node.src = "./Images/lockblack.png";
  }
  if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});

function copyToClickboard(text) {
  return navigator.clipboard.write(text);
}

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";

  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector("img").getAttribute("src");
    const color = generateRandomColor();

    if (
      isLocked === "./Images/lockwhite.png" ||
      isLocked === "./Images/lockblack.png"
    ) {
      return;
    }

    col.style.background = color;

    const text = col.querySelector(".text");
    text.textContent = color;

    setTextColor(text, color);

    const icon = col.querySelector(".lock img");
    if (text.style.color === "black") {
      icon.src = "./Images/unlockblack.png";
      icon.setAttribute("data-type", "lock");
    }
    if (text.style.color === "white") {
      icon.src = "./Images/unlockwhite.png";
    }
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();

  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors();
