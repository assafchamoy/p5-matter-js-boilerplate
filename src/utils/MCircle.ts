import { Bodies, IBodyDefinition, Body, Engine, World } from "matter-js"
import * as P5 from "p5";

export default class MCircle {
    public readonly radius: number;
    public readonly body: Body;
    public readonly p5: P5;
    public readonly engine: Engine;

    constructor(p5Instance: P5, engineInstance: Engine, x: number, y: number, radius:number, options?: IBodyDefinition) {
        this.radius = radius;
        this.engine = engineInstance;
        this.p5 = p5Instance;

        const circleOptions: IBodyDefinition = {
            ...options
        }

        this.body = Bodies.circle(x, y, radius, circleOptions);
        World.add(this.engine.world, this.body);
    }

    public show(): void {
        const p5 = this.p5;
        const {x, y} = this.body.position;
        const angle = this.body.angle;
        p5.push();

        p5.translate(x, y);
        p5.rotate(angle);
        p5.ellipseMode(p5.CENTER);
        p5.rectMode(p5.CENTER);
        p5.stroke(255);
        p5.fill(127)
        p5.ellipse(0,0, this.radius * 2);
        p5.line(0, 0, this.radius, 0)
        
        p5.pop();
    }
}