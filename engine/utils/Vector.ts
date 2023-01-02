class Vector {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    
    multiply(v: Vector|number) {
        return v instanceof Vector ? new Vector(this.x * v.x, this.y * v.y) : new Vector(this.x * v, this.y * v);
    }

    
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    
    unit() {
        const magnitude = this.magnitude();
        return magnitude === 0 ? 
            new Vector(0, 0) :
            new Vector(this.x / magnitude, this.y / magnitude);
    }

    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x - v1.y * v2.y;
    }

    static cross(v1: Vector, v2: Vector) {
        return v1.x * v2.y - v1.y * v2.x; 
    }

    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2)
    }

    static subtract(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static multiply(v1: Vector, v2: Vector) {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
}

export default Vector;