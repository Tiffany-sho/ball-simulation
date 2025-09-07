import { colors, balls } from './global.js';
import { airHeight, airWidth } from './physic.js';

const Width = airWidth;
const MOD = parseInt(Width / 45);

export const addBall = (i) => {
    const ballContainer = document.createElement("div");
    const arrowContainer = document.createElement("div")
    const lineContainer = document.createElement("div")
    const headContainer = document.createElement("div")
    ballContainer.classList.add("ball");
    arrowContainer.classList.add("arrow");
    lineContainer.classList.add("line");
    headContainer.classList.add("head");
    ballContainer.id = `ball${i}`
    arrowContainer.append(lineContainer)
    lineContainer.append(headContainer)
    ballContainer.append(arrowContainer)
    air.append(ballContainer)

    const newObject = {
        x: (i) % MOD * 45,
        y: parseInt(45 * (i + 1) / Width + 1) * 100,
        vx: 10,
        vy: 10,
        m: 1,
        color: colors[i],
        ballDiameter: 40,
        deleteAllow: false,
        dragBall: false,
        dragArrow: false,
        selectBall: false,
        dragX: 0,
        dragY: 0,
        beforeDragX: 0,
        beforeDragY: 0,
        clientX: 0,
        clientY: 0,
        angle: 0,
        length: 0,
        element: ballContainer,
        arrowElement: arrowContainer,
        lineElement: lineContainer,
        headElement: headContainer
    }

    balls.push(newObject);
}

export const starter = (objs) => {

    for (let i = 0; i < objs.length; i++) {

        objs[i].element.style.backgroundColor = objs[i].color;

        objs[i].element.style.left = `${objs[i].x}px`;
        objs[i].element.style.top = `${objs[i].y}px`;

        objs[i].angle = Math.atan2(objs[i].vy, objs[i].vx) * (180 / Math.PI);
        objs[i].length = Math.sqrt(objs[i].vx * objs[i].vx + objs[i].vy * objs[i].vy);

        objs[i].arrowElement.style.transform = `rotate(${objs[i].angle}deg)`;
        objs[i].lineElement.style.width = `${objs[i].length * 5}px`;

    }
}

export const mouseDown = () => {
    balls.forEach(ball => {

        ball.element.addEventListener("mousedown", (e) => {

            ball.dragBall = true;
            ball.selectBall = true;

            for (let i = 0; i < balls.length; i++) {
                if (!balls[i].selectBall) {
                    balls[i].element.style.opacity = "0.7";
                    balls[i].element.style.borderWidth = "1px";
                } else {
                    balls[i].selectBall = false;
                    balls[i].element.style.opacity = "1";
                    balls[i].element.style.borderWidth = "2px";
                }
            }
            ball.dragX = ball.x;
            ball.dragY = ball.y;

            ball.clientX = e.clientX;
            ball.clientY = e.clientY;

            ball.element.style.cursor = "grabbing";

        });

        ball.headElement.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            ball.dragArrow = true;
            ball.element.style.cursor = "grabbing";
        })
    })
}

export const clone = (objs, cloneObjs) => {


    for (let i = 0; i < objs.length; i++) {

        const cloneObject = { x: objs[i].x, y: objs[i].y, vx: objs[i].vx, vy: objs[i].vy };

        cloneObjs.push(cloneObject);

    }
}

export const reProduct = (objs, cloneObjs) => {

    for (let i = 0; i < objs.length; i++) {
        objs[i].x = cloneObjs[i].x;
        objs[i].y = cloneObjs[i].y;
        objs[i].vx = cloneObjs[i].vx;
        objs[i].vy = cloneObjs[i].vy;
    }
}

export const reRordsettings = () => {
    reRordsetting(g, obj[0])
    reRordsetting(CORX, obj[1])
    reRordsetting(CORY, obj[2])
}

const reRordsetting = (setting, obj) => {
    setting = obj.value;
}

export const interLocking = (inputs) => {
    inputs[0].addEventListener("input", function () {
        console.log("aaa")
        inputs[1].value = inputs[0].value;
    })

    inputs[1].addEventListener("input", function () {
        console.log("bbb")
        inputs[0].value = inputs[1].value;
    })
}