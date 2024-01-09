//////////////////////Load Check////////////////////////
const sprites = {};
let assetsStillLoading = 0;

function loadSprite(fileName) {
    assetsStillLoading++;

    let spriteImage = new Image()
    spriteImage.src = "./assets/sprites/" + fileName;
    spriteImage.addEventListener("load", function () {
        assetsStillLoading--;
    })
    return spriteImage;
}
//////////////////////Load Check////////////////////////
//////////////////////load Assets CHeck////////////////////////
function loadAssets(callback) {
    sprites.background = loadSprite("background.png")
    sprites.stick = loadSprite("stick.png")
    sprites.whiteBall = loadSprite("ball.png")
    assetsLoadingLoop(callback)
}

function assetsLoadingLoop(callback) {
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback))
    } else {
        callback()
    }
}


//////////////////////load Assets CHeck////////////////////////
//////////////////////Vector////////////////////////
class Vector {
    constructor(X = 0, Y = 0) {
        this.x = X;
        this.y = Y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    addTo(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    mult(value) {
        return new Vector(this.x * value, this.y * value);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    MinusTO(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}

const BALL_ORIGIN = new Vector(25, 25)
const STICK_ORIGIN = new Vector(970, 11);
const SHOOT_ORIGIN = new Vector(950, 11);
//////////////////////Vector////////////////////////
//////////////////////mouse Handler////////////////////////
class ButtonState {
    constructor() {
        this.down = false;
        this.pressed = false;
    }
}

class MouseHandler {
    constructor() {
        this.left = new ButtonState();
        this.right = new ButtonState();
        this.middle = new ButtonState();
        this.position = new Vector();

    }
}

function handleMouseMove(event) {
    Mouse.position.x = event.pageX;
    Mouse.position.y = event.pageY;
}

function handleMouseDown(e) {
    handleMouseMove(e);
    if (e.button == 0) {
        Mouse.left.pressed = true;
        Mouse.left.down = true;
    } else if (e.button == 1) {
        Mouse.middle.pressed = true;
        Mouse.middle.down = true;
    } else if (e.button == 2) {
        Mouse.right.pressed = true;
        Mouse.right.down = true;
    }
}

function handleMouseUp(e) {
    handleMouseMove(e);
    if (e.button == 0) {
        Mouse.left.down = false;
    } else if (e.button == 1) {
        Mouse.middle.down = false;
    } else if (e.button == 2) {
        Mouse.right.down = false;
    }
}

document.addEventListener("mousemove", handleMouseMove)
document.addEventListener("mousedown", handleMouseDown)
document.addEventListener("mouseup", handleMouseUp)

const Mouse = new MouseHandler();

//////////////////////mouse Handler////////////////////////
//////////////////////Canvas////////////////////////
class Canvas2D {
    constructor() {
        this._Canvas = document.getElementById("screen");
        this.ctx = this._Canvas.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, this._Canvas.clientWidth, this._Canvas.clientHeight);

    }

    drawImage(
        image,
        position = new Vector(),
        origin = new Vector(),
        rotation = 0
    ) {
        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(image, -origin.x, -origin.y);
        this.ctx.restore();
    }
}

let Canvas = new Canvas2D();
//////////////////////Canvas////////////////////////
//////////////////////Ball////////////////////////
class Ball {
    constructor(Position) {
        this.position = Position;
        this.velocity = new Vector();
    }
    update(dleta) {

    }
    draw() {
        Canvas.drawImage(sprites.whiteBall, this.position, BALL_ORIGIN,)
    }
    shoot(power, rotation) {

    }
}
//////////////////////Ball////////////////////////
//////////////////////Stick////////////////////////
class Stick {
    constructor(position, onShoot) {
        this.position = position;
        this.rotation = 0;
        this.origin = STICK_ORIGIN.copy();
        this.power = 0;
        this.onShoot = onShoot;
    }
    draw() {
        Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation)
    }
    update() {
        this.updateRotation();
    }
    updateRotation() {
        let opposite = Mouse.position.y - this.position.y;
        let adjacent = Mouse.position.x - this.position.x;

        this.rotation = Math.atan2(opposite, adjacent)
    }
}
//////////////////////Stick////////////////////////
//////////////////////GameWorld////////////////////////
class GameWorld {
    constructor() {
        this.whiteBall = new Ball(new Vector(413, 413));
        this.stick = new Stick(new Vector(413, 413), this.whiteBall.shoot.bind(this.whiteBall));
    }
    update() {
        this.stick.update()
    }
    draw() {
        Canvas.drawImage(sprites.background, { x: 0, y: 0 })
        this.whiteBall.draw();
        this.stick.draw();

    }
}

const gameworld = new GameWorld();
//////////////////////GameWorld////////////////////////

//////////////////////Animate////////////////////////
function animate() {
    Canvas.clear();
    gameworld.update();
    gameworld.draw();

    requestAnimationFrame(animate)
}
function test() { console.log("true") }
loadAssets(animate);
//////////////////////Animate////////////////////////




class Bird {
    constructor() {
        this.x;
        this.y;
    }
    draw() {

    }
    update() {

    }
}


