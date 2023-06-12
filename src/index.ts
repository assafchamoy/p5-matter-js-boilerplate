import { Engine, IMouseConstraintDefinition, Mouse, MouseConstraint, World } from "matter-js";
import * as p5 from "p5";
import MatterWrapper from "./utils/MatterWrapper";
import MBoundary, { MBoundaryParams } from "./utils/MBoundary";
import Popcorn from "./utils/Popcorn";
import prePopImage from "./assets/popcorn_grain.png";
import postPopImage from "./assets/popcorn.png";

export const sketch = (p: p5) => {
    const BOUNDARY_SIZE = 20;
    const NUMBER_OF_BODIES = 500;

    let matterWrapper = new MatterWrapper(p);
    let boundaries: MBoundary[] = [];
    let mConstraint: MouseConstraint;
    let popcornGrainImage: p5.Image;
    let popcornImage: p5.Image;
    let popcornBodies: Popcorn[] = [];

    p.preload = () => {
        popcornGrainImage = p.loadImage(prePopImage);
        popcornImage = p.loadImage(postPopImage);
    };

    p.setup = () => {
        const canvas = p.createCanvas(800, 800);
        matterWrapper.engine.gravity.scale = 0.002;

        for (let i = 0; i < NUMBER_OF_BODIES; i++) {
            popcornBodies.push(
                matterWrapper.createPopcorn(
                    p.random(p.width),
                    p.random(p.height),
                    8,
                    {prePopImg: popcornGrainImage, postPopImg: popcornImage},
                    { density: 1, restitution: 0.5, mass: 1 }
                )
            );
        }
        

        const boundariesParams: MBoundaryParams[] = [
            // LEFT WALL
            { x: 0, y: 0, width: BOUNDARY_SIZE, height: p.height * 2, options: {restitution: 1 } },

            // RIGHT WALL
            { x: p.width, y: 0, width: BOUNDARY_SIZE, height: p.height * 2, options: {restitution: 1 } },

            // GROUND
            { x: p.width / 2, y: p.height, width: p.width, height: BOUNDARY_SIZE, options: {restitution: 1 } },

            // CEILING
            { x: 0, y: 0, width: p.width * 2, height: BOUNDARY_SIZE, options: {restitution: 1 } },
        ];

        for (const { x, y, width, height, options } of boundariesParams) {
            const boundary = matterWrapper.createBoundary(x, y, width, height, options);

            boundaries.push(boundary);
        }

        // Mouse Constraint
        const canvasMouse = Mouse.create(canvas.elt);
        const mouseConstraintOpts: IMouseConstraintDefinition = {
            mouse: canvasMouse,
            constraint: {
                stiffness: 1
            }
        };

        // Handle low and high density monitors
        canvasMouse.pixelRatio = p.pixelDensity();
        mConstraint = MouseConstraint.create(matterWrapper.engine, mouseConstraintOpts);

        World.add(matterWrapper.engine.world, mConstraint);
    };

    p.draw = () => {
        p.background(220);        
        Engine.update(matterWrapper.engine);

        for (const popcorn of popcornBodies) {
            popcorn.show();
        }

        p.fill(p.GRAY);
        p.noStroke();
        for (const boundary of boundaries) {
            boundary.show();
        }
    };
};

new p5(sketch, document.querySelector('main'));
