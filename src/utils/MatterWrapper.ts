import {
    Composite,
    Constraint,
    Engine,
    IBodyDefinition,
    IChamferableBodyDefinition,
    World
} from "matter-js";
import * as P5 from "p5";
import MCircle from "./MCircle";
import MBoundary from "./MBoundary";
import MRect from "./MRect";
import MCar from "./MCar";

export default class MatterWrapper {
    public readonly engine: Engine;
    private readonly p5Instance: P5;

    public constructor(p5Instance: P5) {
        this.p5Instance = p5Instance;
        this.engine = Engine.create();
    }

    public createCircle(x: number, y: number, radius: number, options?: IBodyDefinition): MCircle {
        const circle = new MCircle(this.p5Instance, this.engine, x, y, radius, options);

        return circle;
    }

    public createBoundary(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: IBodyDefinition
    ): MBoundary {
        const boundary = new MBoundary(this.p5Instance, this.engine, x, y, width, height, options);

        return boundary;
    }

    public createRect(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: IChamferableBodyDefinition
    ): MRect {
        const boundary = new MRect(this.p5Instance, this.engine, x, y, width, height, options);

        return boundary;
    }

    public createCar(
        x: number,
        y: number,
        width: number,
        height: number,
        wheelSize?: number
    ): MCar {
        const car = new MCar(this, this.engine, x, y, width, height, wheelSize);

        return car;
    }
}
