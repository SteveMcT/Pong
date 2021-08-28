import "./styles/style.scss";

const panel1 = document.getElementById("panel1")!;
const panel2 = document.getElementById("panel2")!;
const score1 = document.getElementById("score1")! as HTMLElement;
const score2 = document.getElementById("score2")! as HTMLElement;
const ball = document.getElementById("ball")!;

const keyLeftUp = "w",
  keyLeftDown = "s";
const keyRightUp = "ArrowUp",
  keyRightDown = "ArrowDown";

const playerSpeed = 3;

panel1.style.top = "200px";
panel2.style.top = "200px";
let width = window.innerWidth;
let height = window.innerHeight;
setSize();

enum Direction {
  NONE,
  UP,
  DOWN,
}

let leftPlayerDirection = Direction.NONE;
let rightPlayerDirection = Direction.NONE;

document.addEventListener("keydown", (ev) => {
  if (ev.key == keyLeftUp) {
    leftPlayerDirection = Direction.UP;
  }
  if (ev.key == keyLeftDown) {
    leftPlayerDirection = Direction.DOWN;
  }
  if (ev.key == keyRightUp) {
    rightPlayerDirection = Direction.UP;
  }
  if (ev.key == keyRightDown) {
    rightPlayerDirection = Direction.DOWN;
  }
});

document.addEventListener("keyup", (ev) => {
  if (
    (ev.key == keyLeftUp && leftPlayerDirection == Direction.UP) ||
    (ev.key == keyLeftDown && leftPlayerDirection == Direction.DOWN)
  ) {
    leftPlayerDirection = Direction.NONE;
  }
  if (
    (ev.key == keyRightUp && rightPlayerDirection == Direction.UP) ||
    (ev.key == keyRightDown && rightPlayerDirection == Direction.DOWN)
  ) {
    rightPlayerDirection = Direction.NONE;
  }
});

function setSize() {
  width = window.innerWidth;
  height = window.innerHeight;

  console.log(width);

  panel1.style.left = width / 6 + "px";
  panel2.style.right = width / 6 + "px";
  score1.style.left = width / 6 + "px";
  score2.style.right = width / 6 + "px";
}

window.addEventListener("resize", setSize, false);

let s1 = 0;
let s2 = 0;
let velX = 2;
let velY = 2;
let x = width / 2;
let y = height / 2;

setInterval(() => {
  const top1 = panel1.getBoundingClientRect().top;
  const top2 = panel2.getBoundingClientRect().top;
  const left1 = panel1.getBoundingClientRect().left;
  const left2 = panel2.getBoundingClientRect().left;

  x += velX;
  y += velY;

  ball.style.left = x + velX + "px";
  ball.style.top = y + velY + "px";

  if (y > 740) velY = -velY;
  else if (y < 200) velY = -velY;

  if (x < left1 + 15 && x > left1 && top1 < y + 15 && top1 + 140 > y) velX = -velX;
  else if (x > left2 - 15 && x < left2 && top2 < y + 15 && top2 + 140 > y) velX = -velX;

  if (x > width) {
    score1.innerHTML = (s1 += 1).toString();
    reset();
  } else if (x < 0) {
    score2.innerHTML = (s2 += 1).toString();
    reset();
  }

  if (leftPlayerDirection == Direction.DOWN && top1 <= 600) panel1.style.top = top1 + playerSpeed + "px";
  else if (leftPlayerDirection == Direction.UP && top1 > 200) panel1.style.top = top1 - playerSpeed + "px";

  if (rightPlayerDirection == Direction.DOWN && top2 <= 600) panel2.style.top = top2 + playerSpeed + "px";
  else if (rightPlayerDirection == Direction.UP && top2 > 200) panel2.style.top = top2 - playerSpeed + "px";
}, 10);

const reset = () => {
  x = width / 2;
  y = height / 2;

  // The ball should go into a different direction each start of a round
  if ((s1 + s2) % 2 == 1) {
    velX *= -1;
    velY *= -1;
  }
};
