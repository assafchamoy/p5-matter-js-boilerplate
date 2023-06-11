import { Engine, IBodyDefinition } from "matter-js";
import MCircle from "./MCircle";
import * as P5 from 'p5';

export default class Popcorn extends MCircle {
    private readonly image: P5.Image;
    
    constructor(p5Instance: P5, engineInstance: Engine, x: number, y: number, radius:number, image:  P5.Image, options?: IBodyDefinition) {
        super(p5Instance, engineInstance, x, y, radius, options);
        this.image = image;

    }

    public show(): void {
        const p5 = this.p5;
        const {x, y} = this.body.position;
        const angle = this.body.angle;
        p5.push();

        p5.translate(x, y);
        p5.rotate(angle);
        p5.imageMode(p5.CENTER);
        p5.stroke(255);
        p5.fill(127)
        p5.image(this.image, 0,0, this.radius * 2, this.radius * 2);
        
        p5.pop();
    }
}