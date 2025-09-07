import { addBall, starter, mouseDown, clone, reProduct, interLocking } from './ball.js'
import { animate, dragCollition, fallBallId } from './physic.js';
import { balls } from './global.js';

const btnA = document.querySelector("#btnA");
const btnB = document.querySelector("#btnB");
const plus = document.querySelector("#add");
const start = document.querySelector("#start");
const container = document.querySelector("#allContainer")

const vectorInput = document.querySelector("#vector");
const gravityInputs = document.querySelectorAll(".gravityInput")
const CORXInputs = document.querySelectorAll(".CORXInput")
const CORYInputs = document.querySelectorAll(".CORYInput")

let ballN = 0;
let running = false;
let ballsClone = [];



start.addEventListener("click", function () {
    addBall(ballN);
    starter(balls);
    interLocking(gravityInputs);
    interLocking(CORXInputs);
    interLocking(CORYInputs);
    mouseDown();
    ballsClone = [];
    clone(balls, ballsClone);
    container.classList.add("disapear");
    plus.classList.remove("btnDisabled")
    btnA.classList.remove("btnDisabled")
    ballN++;
})

plus.addEventListener("click", function () {
    addBall(ballN);
    starter(balls);
    mouseDown();
    ballsClone = [];
    clone(balls, ballsClone);
    ballN++;
})

btnA.addEventListener("click", function () {

    console.log(balls);

    starter(balls);
    if (!running) {

        ballsClone = [];
        clone(balls, ballsClone);
        if (vectorInput.checked) {
            vectorInput.checked = false;
        }
        running = true;

        for (let i = 0; i < balls.length; i++) {
            balls[i].element.style.opacity = "1";
            balls[i].element.style.borderWidth = "1px";
            balls[i].arrowElement.classList.add("hidden");
        }
        const g = parseFloat(gravityInputs[0].value) / 9.8 * 0.5;
        const CORX = parseFloat(CORXInputs[0].value);
        const CORY = parseFloat(CORYInputs[0].value);

        animate(balls, g, CORX, CORY);

        plus.classList.add("btnDisabled")
        btnA.children[0].classList.add("hidden");
        btnA.children[1].classList.remove("hidden");
        btnB.classList.remove("btnDisabled")
    } else {
        running = false;
        if (!vectorInput.checked) {
            vectorInput.checked = true;
        }

        for (let i = 0; i < balls.length; i++) {
            balls[i].arrowElement.classList.remove("hidden");
        }

        plus.classList.remove("btnDisabled")
        btnA.children[1].classList.add("hidden");
        btnA.children[0].classList.remove("hidden");
        cancelAnimationFrame(fallBallId);
    }

})

btnB.addEventListener("click", function () {
    for (let i = 0; i < balls.length; i++) {
        balls[i].arrowElement.classList.remove("hidden");
    }

    if (!vectorInput.checked) {
        vectorInput.checked = true;
    }

    plus.classList.remove("btnDisabled")
    btnA.children[1].classList.add("hidden");
    btnA.children[0].classList.remove("hidden");
    btnB.classList.add("btnDisabled")
    running = false;
    cancelAnimationFrame(fallBallId);
    reProduct(balls, ballsClone)
    starter(balls);
    mouseDown();
})

vectorInput.addEventListener("change", () => {

    for (let ball of balls) {
        ball.arrowElement.classList.toggle("hidden")
    }
})

document.addEventListener("mousemove", (e) => {

    balls.forEach(ball => {

        if (ball.dragBall) {

            ball.element.style.left = (ball.dragX + e.clientX - ball.clientX) + "px";

            ball.element.style.top = (ball.dragY + e.clientY - ball.clientY) + "px";

            dragCollition(ball, balls, e);

        }


        if (ball.dragArrow) {
            const arrowRect = ball.arrowElement.getBoundingClientRect();
            const arrowX = arrowRect.left + arrowRect.height / 2;
            const arrowY = arrowRect.top + arrowRect.height / 2;

            const dx = e.clientX - arrowX;
            const dy = e.clientY - arrowY;

            ball.angle = Math.atan2(dy, dx) * (180 / Math.PI);
            ball.length = Math.sqrt(dx * dx + dy * dy);

            ball.arrowElement.style.transform = `rotate(${ball.angle}deg)`;
            ball.lineElement.style.width = `${ball.length}px`;

        }
    })
});

document.addEventListener("mouseup", (e) => {


    balls.forEach(ball => {
        if (ball.deleteAllow) {
            console.log("delete");
            const N = balls.indexOf(ball)
            balls.splice(parseFloat(N), 1);
            ball.element.remove();
            starter(balls);
            mouseDown();
        }
        if (ball.dragBall) {
            ball.dragBall = false;

            ball.x = ball.dragX + e.clientX - ball.clientX;
            ball.y = ball.dragY + e.clientY - ball.clientY;

            ball.element.style.cursor = "grab"
        }
    })

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].dragArrow) {
            balls[i].dragArrow = false;
            balls[i].element.style.cursor = "grab";

            balls[i].vx = balls[i].length * Math.cos(balls[i].angle * (Math.PI / 180)) / 5;
            balls[i].vy = balls[i].length * Math.sin(balls[i].angle * (Math.PI / 180)) / 5;
        }
    }

});