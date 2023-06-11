import { Body, Composite, Constraint, Engine } from "matter-js";
import * as P5 from "p5";
import MatterWrapper from "./MatterWrapper";

export default class MCar {
    public readonly carComposite: Composite;
    private readonly renderList: {show: () => void}[] = [];

    constructor(wrapperInstance: MatterWrapper, engineInstance: Engine, x: number, y: number, width: number, height: number, wheelSize = 100) {
        const group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

        this.carComposite = Composite.create({ label: 'car' });

        const carBody = wrapperInstance.createRect(x, y, width, height, {
            collisionFilter: {
                group
            },
            chamfer: {
                radius: height * 0.5
            },
            density: 0.0002,

        });

        const wheelA = wrapperInstance.createCircle(x + wheelAOffset, y + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });
                    
        const wheelB = wrapperInstance.createCircle(x + wheelBOffset, y + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });

        this.renderList.push(carBody, wheelA, wheelB);
                    
        const axelA = Constraint.create({
            bodyB: carBody.body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA.body,
            stiffness: 1,
            length: 0
        });
                        
        const axelB = Constraint.create({
            bodyB: carBody.body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB.body,
            stiffness: 1,
            length: 0
        });

        Composite.add(this.carComposite, carBody.body);
        Composite.add(this.carComposite, wheelA.body);
        Composite.add(this.carComposite, wheelB.body);
        // @ts-ignore
        Composite.addConstraint(this.carComposite, axelA);

        // @ts-ignore
        Composite.addConstraint(this.carComposite, axelB);

        /**
         *  Adding just the constrains because  wrapperInstance.create* methods are creating and adding 
         *  the objects to the world, adding them twice is redundant and causes problems.
         * */
        Composite.add(engineInstance.world, this.carComposite.constraints);
    }

    public show(): void {
        this.renderList.forEach(body => body.show());
    }
}