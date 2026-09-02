import { parseInput } from './InputParser';
import { Grid } from './domain/Grid';
import { Robot } from './domain/Robot';
import { Simulator } from './simulation/Simulator';

export function run(input: string): string {
    const parsedInput = parseInput(input);
    const grid = new Grid(parsedInput.maxX, parsedInput.maxY);
    const simulator = new Simulator(grid);

    const output = parsedInput.robots.map((robotInput) => {
        if (!grid.contains(robotInput.position)) {
            throw new Error(
                `Robot starting position is outside the grid: ${robotInput.position.x},${robotInput.position.y}`,
            );
        }

        const robot = new Robot(
            robotInput.position,
            robotInput.orientation,
        );

        simulator.execute(robot, robotInput.instructions);

        const lostSuffix = robot.isLost ? ' LOST' : '';

        return `${robot.position.x} ${robot.position.y} ${robot.orientation}${lostSuffix}`;
    });

    return output.join('\n');
}