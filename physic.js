const air = document.querySelector("#air");
export const airHeight = parseFloat(getComputedStyle(air).height);
export const airWidth = parseFloat(getComputedStyle(air).width);
export let fallBallId;

export const animate = (objs, g, CORX, CORY) => {
    for (let i = 0; i < objs.length; i++) {
        wallCollision(objs[i], g, CORX, CORY);
        for (let j = i + 1; j < objs.length; j++) {
            ballsCollision(objs[i], objs[j], CORX, CORY)
        }
    }

    fallBallId = requestAnimationFrame(() => animate(objs, g, CORX, CORY));
}

const wallCollision = (obj, g, CORX, CORY) => {


    obj.vy += g;
    obj.x += obj.vx;
    obj.y += obj.vy;

    if (obj.x >= airWidth - parseFloat(obj.ballDiameter) - 6) {
        obj.x = airWidth - parseFloat(obj.ballDiameter) - 6;
        obj.vx = -CORX * obj.vx;
        obj.element.style.left = obj.x + "px";
    }

    if (obj.y >= airHeight - parseFloat(obj.ballDiameter) - 6) {
        obj.y = airHeight - parseFloat(obj.ballDiameter) - 6;
        obj.vy = -CORY * obj.vy;
        obj.element.style.top = obj.y + "px";
    }


    if (obj.x <= 0) {
        obj.x = 0;
        obj.vx = -CORX * obj.vx;
        obj.element.style.left = obj.x + "px";
    }

    if (obj.y <= 0) {
        obj.y = 0;
        obj.vy = -CORY * obj.vy;
        obj.element.style.top = obj.y + "px";
    }

    obj.element.style.left = obj.x + "px";
    obj.element.style.top = obj.y + "px";

    obj.angle = Math.atan2(obj.vy, obj.vx) * (180 / Math.PI);
    obj.length = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);

    obj.arrowElement.style.transform = `rotate(${obj.angle}deg)`;
    obj.lineElement.style.width = `${obj.length * 5}px`;

}

const ballsCollision = (obj1, obj2, CORX, CORY) => {

    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;


    const dr = Math.sqrt(dx * dx + dy * dy);

    if (dr <= (obj1.ballDiameter + obj2.ballDiameter) / 2) {

        const m1 = obj1.m;
        const m2 = obj2.m;

        const vx1 = obj1.vx;
        const vx2 = obj2.vx;
        const vy1 = obj1.vy;
        const vy2 = obj2.vy;

        const newvx1 = (m1 * vx1 + m2 * vx2 - CORX * (m1 * vx1 - m2 * vx2)) / (m1 + m2);
        const newvx2 = (m1 * vx1 + m2 * vx2 + CORX * (m1 * vx1 - m2 * vx2)) / (m1 + m2);

        const newvy1 = (m1 * vy1 + m2 * vy2 - CORY * (m1 * vy1 - m2 * vy2)) / (m1 + m2);
        const newvy2 = (m1 * vy1 + m2 * vy2 + CORY * (m1 * vy1 - m2 * vy2)) / (m1 + m2);

        obj1.vx = newvx1;
        obj2.vx = newvx2;

        obj1.vy = newvy1;
        obj2.vy = newvy2;

        const overlap = (obj1.ballDiameter + obj2.ballDiameter) / 2 - dr;

        const nx = dx / dr;
        const ny = dy / dr;

        obj1.x += nx * (overlap / 2);
        obj1.y += ny * (overlap / 2);
        obj2.x -= nx * (overlap / 2);
        obj2.y -= ny * (overlap / 2);

    }
}

export const dragCollition = (obj, objs, e) => {

    let min = 100;

    for (let i = 0; i < objs.length; i++) {

        const dx = parseFloat(obj.element.style.left) - parseFloat(objs[i].element.style.left);
        const dy = parseFloat(obj.element.style.top) - parseFloat(objs[i].element.style.top);
        const dr = Math.sqrt(dx * dx + dy * dy);

        const N = objs.indexOf(obj)
        if (i != N) {
            if (dr < min) {
                min = dr;
            }
        }

    }
    if ((obj.dragX + e.clientX - obj.clientX) <= 0 ||
        (obj.dragX + e.clientX - obj.clientX + obj.ballDiameter + 8) >= airWidth ||
        (obj.dragY + e.clientY - obj.clientY) <= 0 ||
        (obj.dragY + e.clientY - obj.clientY + obj.ballDiameter + 8) >= airHeight) {
        obj.element.style.borderColor = "red";
        obj.deleteAllow = true;
    } else {
        obj.element.style.borderColor = " #282c34";
        obj.deleteAllow = false;
    }

    if (min <= obj.ballDiameter) {
        obj.x = obj.beforeDragX;
        obj.y = obj.beforeDragY;
        obj.element.style.left = obj.x + "px";
        obj.element.style.top = obj.y + "px";
        obj.dragBall = false;
        obj.element.style.cursor = "grab";
    }
    else {
        obj.beforeDragX = obj.dragX + e.clientX - obj.clientX;
        obj.beforeDragY = obj.dragY + e.clientY - obj.clientY;
    }

}