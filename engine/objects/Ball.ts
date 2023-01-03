import Angle from "../utils/Angle";
import { globalConfig as Global } from "../utils/Global";
import Vector from "../utils/Vector";
import Base from "./Base";


interface BallArgs  { 
    x: number, y
    : number, 
    radius?: number, 
    mass?: number, 
    elasticity?: number, 
    friction?: number, 
    collision?: boolean, 
    acceleration?: number, 
    color?: string 
};



abstract class Ball extends Base {

    pos: Vector;
    vel: Vector;
    acc: Vector;
    radius: number;
    mass: number;
    inverse_mass: number;
    elasticity: number;
    accelerationMagnitude: number;
    friction: number;
    collision: boolean;
    color: string;


    constructor({ x, y, radius, mass, elasticity, friction, collision, acceleration, color }:
                BallArgs
    ) {
        super();
        /** @type {Vector} */
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        /** @type {number} */
        this.radius = radius ?? 10;
        /** @type {number} */
        this.mass = mass || 5;
        this.inverse_mass = (mass <= 0) ? 0 : (1 / mass);
        this.elasticity = elasticity ?? 1;
        this.accelerationMagnitude = acceleration ?? 0.5;
        this.friction = friction ?? Global.FRICTION;
        this.collision = collision ?? false;
        this.color = color ?? 'red';

        this.create();
    }


    abstract create(...args: any[]): void;
    abstract destroy(...args: any[]): void;
    abstract update(...args: any[]): void;


    /**
     * main renderer
     */
    render(ctx: CanvasRenderingContext2D, x = this.pos.x, y = this.pos.y) {
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Angle.toRadians(360));
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    moveTo(v: Vector) {
        this.vel = Vector.subtract(v, this.pos).unit().multiply(this.accelerationMagnitude);
    }


    /**
     * Checks collision between two ball entities
     */
    static collision(b1: Ball, b2: Ball) {
        return (b1.radius + b2.radius >= Vector.distance(b1.pos, b2.pos));
    }

    static penetration_resolution(b1: Ball, b2: Ball) {
        let dist = Vector.subtract(b1.pos, b2.pos);
        let pen_depth = b1.radius + b2.radius - dist.magnitude();
        let pen_res = dist.unit().multiply(pen_depth / (b1.inverse_mass + b2.inverse_mass));
        b1.pos = Vector.add(b1.pos, pen_res.multiply(b1.inverse_mass));
        b2.pos = Vector.add(b2.pos, pen_res.multiply(-b2.inverse_mass));
    }

    /**
     * principle -> law of conservation of momentum & kinetic energy
     * total moment before = total momentum after
     * m(a)v(a) + m(b)v(b) = m(a)v(a)' + m(b)v(b)'
     * 
     * total kinetic energey before = total kinetic energy after
     * KE = m(v^2) / 2
     * 
     * if sum of ke remains same after collision its called elastic collision
     */
    static collision_resoluion(b1: Ball, b2: Ball) {
        //collision normal vector
        let normal = b1.pos.subtract(b2.pos).unit();
        //relative velocity vector
        let relVel = b1.vel.subtract(b2.vel);
        //separating velocity - relVel projected onto the collision normal vector
        let sepVel = Vector.dot(relVel, normal);
        //the projection value after the collision (multiplied by -1)
        let new_sepVel = -sepVel * Global.ELASTICITY;

        let sepVelDiff = new_sepVel - sepVel;
        let impulse = sepVelDiff / (b1.inverse_mass + b2.inverse_mass);
        let impulseVec = normal.multiply(impulse);
        // //collision normal vector with the magnitude of the new_sepVel
        // let sepVelVec = normal.multiply(new_sepVel);

        //adding the impulse vector to the original vel. vector
        b1.vel = b1.vel.add(impulseVec.multiply(b1.inverse_mass));
        //adding its opposite to the other balls original vel. vector
        b2.vel = b2.vel.add(impulseVec.multiply(-b2.inverse_mass));
    }
}

export default Ball;
export type { BallArgs }

