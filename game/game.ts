import Ball from "../engine/objects/Ball";
import Renderer from "../engine/utils/Renderer";

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const player = new Ball({ x: 500, y: 0 });
const renderer = new Renderer(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function mainLoop() {
    
    renderer.renderWorld(player);
    renderer.renderBorder(player);
    renderer.renderPlayer(player.render.bind(player));

    requestAnimationFrame(mainLoop);

}

requestAnimationFrame(mainLoop);