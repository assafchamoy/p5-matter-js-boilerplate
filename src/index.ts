import { Engine, IMouseConstraintDefinition, Mouse, MouseConstraint, World } from 'matter-js';
import * as p5 from 'p5';
import MatterWrapper from './utils/MatterWrapper';
import MCircle from './utils/MCircle';
import MBoundary, { MBoundaryParams } from './utils/MBoundary';
import MCar from './utils/MCar';

export const sketch = (p: p5) => {
    const BOUNDARY_SIZE = 100;

    let matterWrapper = new MatterWrapper(p);
    let circles: MCircle[] = [];
    let boundaries: MBoundary[] = [];
    let mConstraint: MouseConstraint;
    let car: MCar;

    p.setup = () => {
        const canvas = p.createCanvas(1000, 800);
        
        for (let i=0;i< 100;i++) {
            circles.push(matterWrapper.createCircle(50, 50, 20, {density: 1, restitution: 0.2}));
        }

        const boundariesParams: MBoundaryParams[] = [
            // LEFT WALL
            {x: 0, y: 0, width: BOUNDARY_SIZE, height: p.height * 2},

            // RIGHT WALL
            {x: p.width, y: 0, width: BOUNDARY_SIZE, height: p.height * 2},

            // GROUND
            {x: p.width / 2, y: p.height, width: p.width, height: BOUNDARY_SIZE},
        ];

        for(const {x, y, width, height, options} of boundariesParams) {
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

        const carScale = 0.6;
        car = matterWrapper.createCar(500, 100, 200 * carScale, 30 * carScale, 40 * carScale)        

    }

    p.draw = () => {
        p.background(220);        
        Engine.update(matterWrapper.engine);
        
        p.fill(0 , 0, 255)
        for(const circle of circles) {
            circle.show();
        }

        p.fill(0 , 255, 0)

        p.fill(0);
        for(const boundary of boundaries) {
            boundary.show();
        }

        car.show();

    }
}

new p5(sketch, document.body);