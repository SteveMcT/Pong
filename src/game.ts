export class Game {
  ball = getById("ball");
  width = window.innerWidth;
  height = window.innerHeight;

  playerSpeed = 2;

  panel1 = getById("panel1");
  panel2 = getById("panel2");
  score1 = getById("score1");
  score2 = getById("score2");

  s1 = 0;
  s2 = 0;
  velX = 2;
  velY = 2;
  x = this.width / 2;
  y = this.height / 2;

  keyLeftUp = "w";
  keyLeftDown = "s";
  keyRightUp = "ArrowUp";
  keyRightDown = "ArrowDown";

  leftPlayerDirection = Direction.NONE;
  rightPlayerDirection = Direction.NONE;

  constructor() {
    this.setSize();
    this.addKeyListener();
  }

  addKeyListener() {
    document.addEventListener("keydown", (ev) => {
      if (ev.key == this.keyLeftUp) {
        this.leftPlayerDirection = Direction.UP;
      }
      if (ev.key == this.keyLeftDown) {
        this.leftPlayerDirection = Direction.DOWN;
      }
      if (ev.key == this.keyRightUp) {
        this.rightPlayerDirection = Direction.UP;
      }
      if (ev.key == this.keyRightDown) {
        this.rightPlayerDirection = Direction.DOWN;
      }
    });

    document.addEventListener("keyup", (ev) => {
      if (
        (ev.key == this.keyLeftUp && this.leftPlayerDirection == Direction.UP) ||
        (ev.key == this.keyLeftDown && this.leftPlayerDirection == Direction.DOWN)
      ) {
        this.leftPlayerDirection = Direction.NONE;
      }
      if (
        (ev.key == this.keyRightUp && this.rightPlayerDirection == Direction.UP) ||
        (ev.key == this.keyRightDown && this.rightPlayerDirection == Direction.DOWN)
      ) {
        this.rightPlayerDirection = Direction.NONE;
      }
    });

    window.addEventListener("resize", this.setSize, false);
  }

  setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.panel1.style.left = this.width / 6 + "px";
    this.panel2.style.right = this.width / 6 + "px";
    this.score1.style.left = this.width / 6 + "px";
    this.score2.style.right = this.width / 6 + "px";
  }

  renderOnePlayer() {
    setInterval(() => {
      const top1 = this.panel1.getBoundingClientRect().top;
      const top2 = this.panel2.getBoundingClientRect().top;
      const left1 = this.panel1.getBoundingClientRect().left;
      const left2 = this.panel2.getBoundingClientRect().left;

      this.x += this.velX;
      this.y += this.velY;

      this.ball.style.left = this.x + this.velX + "px";
      this.ball.style.top = this.y + this.velY + "px";

      if (this.y > 740) this.velY = -this.velY;
      else if (this.y < 200) this.velY = -this.velY;

      if (this.x < left1 + 15 && this.x > left1 && top1 < this.y + 15 && top1 + 140 > this.y) this.velX = -this.velX;
      else if (this.x > left2 - 15 && this.x < left2 && top2 < this.y + 15 && top2 + 140 > this.y)
        this.velX = -this.velX;

      if (this.x > this.width) {
        this.score1.innerHTML = (this.s1 += 1).toString();
        reset();
      } else if (this.x < 0) {
        this.score2.innerHTML = (this.s2 += 1).toString();
        reset();
      }

      if (this.leftPlayerDirection == Direction.DOWN && top1 <= 600)
        this.panel1.style.top = top1 + this.playerSpeed + "px";
      else if (this.leftPlayerDirection == Direction.UP && top1 > 200)
        this.panel1.style.top = top1 - this.playerSpeed + "px";

      if (this.rightPlayerDirection == Direction.DOWN && top2 <= 600)
        this.panel2.style.top = top2 + this.playerSpeed + "px";
      else if (this.rightPlayerDirection == Direction.UP && top2 > 200)
        this.panel2.style.top = top2 - this.playerSpeed + "px";
    }, 10);

    const reset = () => {
      this.x = window.innerWidth / 2;
      this.y = window.innerHeight / 2;

      // The ball should go into a different direction each start of a round
      if ((this.s1 + this.s2) % 2 == 1) {
        this.velX *= -1;
        this.velY *= -1;
      }
    };
  }
}

const getById = (value: string) => document.getElementById(value)!;

enum Direction {
  NONE,
  UP,
  DOWN,
}
