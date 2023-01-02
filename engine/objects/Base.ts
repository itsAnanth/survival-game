import Vector from "../utils/Vector";

abstract class Base {

    abstract pos: Vector;
    abstract vel: Vector;
    abstract acc: Vector;

    abstract destroy(...args: any[]): void;
    abstract render(ctx: CanvasRenderingContext2D, x?: number, y?: number): void;
    abstract update(...args: any[]): void;

}

export default Base;



