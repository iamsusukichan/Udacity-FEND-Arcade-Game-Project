//all the characteristics and behaviors
class Entity {
  constructor() {
    this.sprite = "images/";
    this.x = 2;
    this.y = 5;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
  update(dt) {
    this.isOutOfBoundX = this.x > 5;
    this.isOutOfBoundY = this.y === 0;
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.sprite += "sully.png";
    this.moving = false;
    this.win = false;
  }

  handleInput(keyname) {
    switch (keyname) {
      case "left":
        this.x > 0 ? (this.x -= 1) : (this.x = 0);
        break;
      case "right":
        this.x < 4 ? (this.x += 1) : (this.x = 4);
        break;
      case "up":
        this.y > 0 ? (this.y -= 1) : (this.y = 0);
        break;
      case "down":
        this.y < 5 ? (this.y += 1) : (this.y = 5);
        break;
      default:
        break;
    }
    this.moving = true;
  }

  render() {
    super.render();
    this.moving = false;
  }

  update(dt) {
    super.update();
    if (this.isOutOfBoundY && !this.win && !this.moving) {
      this.win = true;
      alert("You win!");
    }
  }
}

class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += "mike.png";
    this.x = x;
    this.y = y;
  }
  update(dt) {
    super.update();
    this.randomSpeed = Math.floor(Math.random() * 5) * dt;
    this.isOutOfBoundX ? (this.x = -1) : (this.x += this.randomSpeed);
  }

  checkCollisions(player) {
    if (this.y === player.y) {
      if (this.x >= player.x - 0.7 && this.x <= player.x + 0.7) {
        return true;
      }
    } else {
      return false;
    }
  }
}