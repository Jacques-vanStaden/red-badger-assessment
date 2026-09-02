import { describe, expect, it } from 'vitest';
import { Grid } from '../src/domain/Grid';
import { Robot } from '../src/domain/Robot';
import { Simulator } from '../src/simulation/Simulator';

describe('Simulator', () => {
    it('executes the sample robot instructions', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const robot = new Robot({ x: 1, y: 1 }, 'E');

        simulator.execute(robot, 'RFRFRFRF');

        expect(robot.position).toEqual({ x: 1, y: 1 });
        expect(robot.orientation).toBe('E');
        expect(robot.isLost).toBe(false);
    });

    it('marks a robot as lost when it moves off the grid', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const robot = new Robot({ x: 3, y: 3 }, 'N');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 3, y: 3 });
        expect(robot.orientation).toBe('N');
        expect(robot.isLost).toBe(true);
    });

    it('leaves a scent when a robot is lost', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const robot = new Robot({ x: 3, y: 3 }, 'N');

        simulator.execute(robot, 'F');

        expect(grid.hasScent({ x: 3, y: 3 })).toBe(true);
    });

    it('ignores movement from a scented position', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const firstRobot = new Robot({ x: 3, y: 3 }, 'N');
        simulator.execute(firstRobot, 'F');

        const secondRobot = new Robot({ x: 3, y: 3 }, 'N');
        simulator.execute(secondRobot, 'F');

        expect(secondRobot.position).toEqual({ x: 3, y: 3 });
        expect(secondRobot.orientation).toBe('N');
        expect(secondRobot.isLost).toBe(false);
    });

    it('loses a robot moving north from the northern edge', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);
        const robot = new Robot({ x: 5, y: 3 }, 'N');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 5, y: 3 });
        expect(robot.orientation).toBe('N');
        expect(robot.isLost).toBe(true);
    });

    it('loses a robot moving south from the southern edge', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);
        const robot = new Robot({ x: 0, y: 0 }, 'S');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 0, y: 0 });
        expect(robot.orientation).toBe('S');
        expect(robot.isLost).toBe(true);
    });

    it('loses a robot moving east from the eastern edge', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);
        const robot = new Robot({ x: 5, y: 0 }, 'E');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 5, y: 0 });
        expect(robot.orientation).toBe('E');
        expect(robot.isLost).toBe(true);
    });

    it('loses a robot moving west from the western edge', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);
        const robot = new Robot({ x: 0, y: 3 }, 'W');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 0, y: 3 });
        expect(robot.orientation).toBe('W');
        expect(robot.isLost).toBe(true);
    });

    it('ignores repeated attempts to leave from a scented position', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const firstRobot = new Robot({ x: 5, y: 3 }, 'E');
        simulator.execute(firstRobot, 'F');

        const secondRobot = new Robot({ x: 5, y: 3 }, 'E');
        simulator.execute(secondRobot, 'FF');

        expect(secondRobot.position).toEqual({ x: 5, y: 3 });
        expect(secondRobot.orientation).toBe('E');
        expect(secondRobot.isLost).toBe(false);
    });

    it('allows other movements from a scented position', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);

        const firstRobot = new Robot({ x: 5, y: 3 }, 'E');
        simulator.execute(firstRobot, 'F');

        const secondRobot = new Robot({ x: 5, y: 3 }, 'E');
        simulator.execute(secondRobot, 'RF');

        expect(secondRobot.position).toEqual({ x: 5, y: 2 });
        expect(secondRobot.orientation).toBe('S');
        expect(secondRobot.isLost).toBe(false);
    });

    it('rejects unsupported instructions', () => {
        const grid = new Grid(5, 3);
        const simulator = new Simulator(grid);
        const robot = new Robot({ x: 1, y: 1 }, 'N');

        expect(() => simulator.execute(robot, 'X')).toThrow(
            'Unsupported instruction: X',
        );
    });

    it('supports additional commands through the command registry', () => {
        const grid = new Grid(5, 3);

        const simulator = new Simulator(grid, {
            F: (robot) => robot.moveTo({
                x: robot.position.x,
                y: robot.position.y + 1,
            }),
        });

        const robot = new Robot({ x: 1, y: 1 }, 'N');

        simulator.execute(robot, 'F');

        expect(robot.position).toEqual({ x: 1, y: 2 });
    });
});