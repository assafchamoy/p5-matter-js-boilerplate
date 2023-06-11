import { Bodies, IBodyDefinition, Body, Engine, Composite, IChamferableBodyDefinition } from "matter-js";
import * as P5 from "p5";

export default class MRect {
    public readonly width: number;
    public readonly height: number;
    public readonly body: Body;
    public readonly engine: Engine;
    public readonly p5: P5;

    constructor(
        p5Instance: P5,
        engineInstance: Engine,
        x: number,
        y: number,
        width: number,
        height: number,
        options?: IBodyDefinition
    ) {
        this.width = width;
        this.height = height;

        this.engine = engineInstance;
        this.p5 = p5Instance;

        const rectOptions: IChamferableBodyDefinition = {
            ...options
        };

        this.body = Bodies.rectangle(x, y, width, height, rectOptions);
        Composite.add(this.engine.world, this.body);
    }

    public show(): void {
        const p5 = this.p5;
        const { x, y } = this.body.position;
        const angle = this.body.angle;

        p5.push();

        p5.translate(x, y);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.width, this.height);

        p5.pop();
    }
}
