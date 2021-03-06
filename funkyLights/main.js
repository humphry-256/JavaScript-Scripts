// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball class

class Shape {
  constructor(x, y, velX, velY,exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }
  // define ball draw method
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  // define ball update method
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
  // define ball collision detection
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j]) && balls[j].exists) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color =
            "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")";
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y, velX, velY, exists) {
    super(x, y, (velX = 20), (velY = 20), exists);
    this.color = "white";
    this.size = 10;
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = -this.x;
    }

    if (this.x - this.size <= 0) {
      this.x = -this.x;
    }

    if (this.y + this.size >= height) {
      this.y = -this.y;
    }

    if (this.y - this.size <= 0) {
      this.y = -this.y;
    }

  }
  setControls(){
    let _this = this;
    window.onkeydown = function (e) {
      if (e.key === "a") {
        _this.x -= _this.velX;
      } else if (e.key === "d") {
        _this.x += _this.velX;
      } else if (e.key === "w") {
        _this.y -= _this.velY;
      } else if (e.key === "s") {
        _this.y += _this.velY;
      }
    };

  }
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
        }
      }
    }
  }
}

// define array to store balls and populate it

let balls = [];
let ballCount = balls.length;

while (balls.length < 10) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
    size
  );
  balls.push(ball);
  ballCount++;
  
}

let countPara = document.querySelector("p"); 

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  let evil = new EvilCircle(10,10,(exists = true));
  evil.setControls();

  for (let i = 0; i < balls.length; i++) {
    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
    if (balls[i].exists){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

}
  countPara.textContent = `Ball Count: ${ballCount}`;
  requestAnimationFrame(loop);
}

loop();
