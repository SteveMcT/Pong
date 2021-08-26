import "./styles/style.scss";

const panel1 = document.getElementById("panel1")!;
const panel2 = document.getElementById("panel2")!;
const score1 = document.getElementById("score1")! as HTMLElement;
const score2 = document.getElementById("score2")! as HTMLElement;
const ball = document.getElementById("ball")!;

const width = window.innerWidth;

panel1.style.top = "200px";
panel2.style.top = "200px";

document.addEventListener("keydown", (ev) => {
  const top1 = parseInt(panel1.style.top.slice(0, -2));
  const top2 = parseInt(panel2.style.top.slice(0, -2));

  if (ev.key == "s" && top1 <= 600) panel1.style.top = top1 + 20 + "px";
  else if (ev.key == "w" && top1 > 200) panel1.style.top = top1 - 20 + "px";
  else if (ev.key == "ArrowUp" && top2 > 200) panel2.style.top = top2 - 20 + "px";
  else if (ev.key == "ArrowDown" && top2 <= 600) panel2.style.top = top2 + 20 + "px";
});

let s1 = 0;
let s2 = 0;
let velX = 2;
let velY = 2;
let x = width / 2;
let y = window.innerHeight / 2;

setInterval(() => {
  const top1 = parseInt(panel1.style.top.slice(0, -2));
  const top2 = parseInt(panel2.style.top.slice(0, -2));

  x += velX;
  y += velY;

  ball.style.left = x + velX + "px";
  ball.style.top = y + velY + "px";

  if (y > 740) velY = -velY;
  else if (y < 200) velY = -velY;

  if (x < 420 && x > 400 && top1 < y + 20 && top1 + 140 > y) velX = -velX;
  else if (x > width - 430 && x < width - 400 && top2 < y + 20 && top2 + 140 > y) velX = -velX;

  if (x > width) {
    s1++;
    score1.innerHTML = s1.toString();
    reset();
  } else if (x < 0) {
    s2++;
    score2.innerHTML = s2.toString();
    reset();
  }
}, 10);

const reset = () => {
  x = width / 2;
  y = window.innerHeight / 2;
};
