import Ball from "../objects/Ball";
import Base from "../objects/Base";

class Renderer {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    renderPlayer(callback: (ctx: CanvasRenderingContext2D, dx: number, dy: number) => void) {
        const dx = this.canvas.width / 2, dy = this.canvas.height / 2;
        callback(this.ctx, dx, dy);
    }

    // static renderName(x, y, { username, color }) {
    //     ctx.fillStyle = color;
    //     ctx.textAlign = 'center';
    //     ctx.font = `bold ${USERNAME_FONT_SIZE}px Arial`;
    //     ctx.fillText(username, x, y - (PLAYER_RADIUS + USERNAME_FONT_SIZE));
    // }

    renderEntities(me: Base, p: Base, callback?: (dx: number, dy: number) => void) {
        const relativeX = p.pos.x - me.pos.x;
        const relativeY = p.pos.y - me.pos.y;
        const dx = relativeX + this.canvas.width / 2;
        const dy = relativeY + this.canvas.height / 2;

        // if (
        //     relativeX > canvas.height ||
        //     relativeX < -canvas.height ||
        //     relativeY > canvas.width ||this.
        //     relativeY < -canvas.width
        // ) return;

        if (callback)
            callback(dx, dy);
        else
            p.render(this.ctx, dx, dy);
    }


    renderWorld(p: Base) {
        const MAP_SIZE = 3000;
        this.ctx.fillStyle = "#323232";
        this.ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
        this.ctx.lineWidth = 3;
        this.ctx.save();

        const dx = p.pos.x - this.canvas.width / 2;
        const dy = p.pos.y - this.canvas.height / 2;
        this.ctx.fillStyle = "#121212";
        this.ctx.strokeStyle = "#635f5f";
        const size = MAP_SIZE / 30;
        for (let x = 0; x < MAP_SIZE; x += size) {
            for (let y = 0; y < MAP_SIZE; y += size) {
                this.ctx.strokeRect(-dx + x, -dy + y, size, size);
            }
        }

        this.renderBorder(p);

        this.ctx.restore();
    }

    renderBorder(p: any) {
        const PLAYER_RADIUS = p.radius
        const MAP_SIZE = 3000;
        const dx = p.pos.x - this.canvas.width / 2;
        const dy = p.pos.y - this.canvas.height / 2;
        this.ctx.strokeStyle = "#010101";
        this.ctx.strokeRect(
            -dx - PLAYER_RADIUS,
            -dy - PLAYER_RADIUS,
            MAP_SIZE + (PLAYER_RADIUS * 4) / 2,
            MAP_SIZE + (PLAYER_RADIUS * 4) / 2
        );
    }
}

export default Renderer;