import Ball from "../../engine/objects/Ball";
import type { BallArgs } from "../../engine/objects/Ball";
import Vector from "../../engine/utils/Vector";

interface PlayerArgs extends BallArgs {
    entitiesPool?: any[]
    enableControls?: boolean;
}

class Player extends Ball {

    id: string;
    health: number;
    entitiesPool: any[] | null;
    enableControls: boolean;
    controls: {
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean
    }

    constructor(args: PlayerArgs) {
        super(args);

        this.id = 'player_0';
        this.health = 100;
        this.enableControls = true;
        this.controls = {
            left: false,
            up: false,
            down: false,
            right: false
        }

        // console.log(this.enableControls)

        if (args.entitiesPool) {
            this.entitiesPool = args.entitiesPool;
            this.create();
        } else
            this.entitiesPool = null;

        if (this.enableControls) 
            this.registerControls();

    }

    update() {
        let { left, up, down, right } = this.controls;
        if (left) {
            this.acc.x = -this.accelerationMagnitude;
        }
        if (up) {
            this.acc.y = -this.accelerationMagnitude;
        }
        if (right) {
            this.acc.x = this.accelerationMagnitude;
        }
        if (down) {
            this.acc.y = this.accelerationMagnitude;
        }
        if (!left && !right) {
            this.acc.x = 0;
        }
        if (!up && !down) {
            this.acc.y = 0;
        } 

        const oldVel = this.vel;
        this.acc = this.acc.unit().multiply(this.accelerationMagnitude);
        this.vel = Vector.add(this.vel, this.acc);
        this.vel = this.vel.multiply(1 - this.friction);

        const newVel = this.vel.multiply(1 - this.friction);;

        this.vel = newVel.magnitude() >= 5 ? oldVel : newVel;

        this.pos = Vector.add(this.pos, this.vel);

    }

    create(): void {
        if (!this.entitiesPool) return;
        this.entitiesPool.push(this);
    }

    destroy(): void {
        if (!this.entitiesPool) return;
        const idx = this.entitiesPool.indexOf(this.id);

        this.entitiesPool.splice(idx, 1);
    }

    registerControls() {
        window.addEventListener('keydown', this.handleKeys.bind(this));
        window.addEventListener('keyup', this.handleKeys.bind(this));
    }

    private handleKeys(e: KeyboardEvent) {
        let state = e.type == 'keydown' ? true : false;

        switch (e.key) {
            case 'ArrowUp': case 'w':
                this.controls.up = state;
                break; 
            case 'a': case 'ArrowLeft':
                this.controls.left = state;
                break; 
            case 'd': case 'ArrowRight':
                this.controls.right = state;
                break;
            case 'ArrowDown': case 's':
                this.controls.down = state;
                break;
        }
    }
}

export default Player;


