import { Bodies, IBodyDefinition, Body, Engine, World, Composite } from "matter-js";
import * as P5 from "p5";
import MRect from "./MRect";

export interface MBoundaryParams {
    x: number;
    y: number;
    width: number;
    height: number;
    options?: IBodyDefinition;
}

export default class MBoundary extends MRect {
    constructor(
        p5Instance: P5,
        engineInstance: Engine,
        x: number,
        y: number,
        width: number,
        height: number,
        options?: IBodyDefinition
    ) {
        super(p5Instance, engineInstance, x, y, width, height, options);
        this.body.isStatic = true;
    }
}
