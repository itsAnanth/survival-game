import Ball from "../engine/objects/Ball";
import Renderer from "../engine/utils/Renderer";
import Player from "./components/player";

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const player = new Player({ x: 500, y: 500, enableControls: true })
const renderer = new Renderer(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(player)

function mainLoop() {
    
    renderer.renderWorld(player);
    renderer.renderBorder(player);
    renderer.renderPlayer(player.render.bind(player));

    player.update();

    requestAnimationFrame(mainLoop);

}

requestAnimationFrame(mainLoop);