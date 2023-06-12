import { Body, Engine, IBodyDefinition } from "matter-js";
import MCircle from "./MCircle";
import * as P5 from "p5";

export interface PopcornImages {
    prePopImg: P5.Image;
    postPopImg: P5.Image;
}
export default class Popcorn extends MCircle {
    private image: P5.Image;
    private readonly images: { prePopImg: P5.Image; postPopImg: P5.Image };
    private popcornRadius: number;

    constructor(
        p5Instance: P5,
        engineInstance: Engine,
        x: number,
        y: number,
        radius: number,
        images: PopcornImages,
        options?: IBodyDefinition
    ) {
        super(p5Instance, engineInstance, x, y, radius, options);

        this.image = images.prePopImg;
        this.images = images;
        this.popcornRadius = radius;

        this.pop();
    }

    public show(): void {
        const p5 = this.p5;
        const { x, y } = this.body.position;
        const angle = this.body.angle;
        p5.push();

        p5.translate(x, y);
        p5.rotate(angle);
        p5.imageMode(p5.CENTER);
        p5.stroke(255);
        p5.fill(127);
        p5.image(this.image, 0, 0, this.popcornRadius * 2, this.popcornRadius * 2);

        p5.pop();
    }

    private pop(): void {
        const POPCORN_ENLARGE_SCALE = 2;
        const popTime = this.p5.random(10, 20) * 1000; // Seconds

        setTimeout(() => {
            this.body.density = 0.01;
            this.body.restitution = 0.8;
            this.body.mass = 1.5;
            
            // Make them bounce
            Body.applyForce(this.body, this.body.position, {x: 0, y: -2});

            // Make them bigger
            Body.scale(this.body, POPCORN_ENLARGE_SCALE, POPCORN_ENLARGE_SCALE);
            this.image = this.images.postPopImg;
            this.popcornRadius *= POPCORN_ENLARGE_SCALE;
        }, popTime);
    }
}
