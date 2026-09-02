import { Grid } from '../domain/Grid';
import { Position } from '../domain/Position';
import { Robot } from '../domain/Robot';

export type Command = (robot: Robot, grid: Grid) => void;

export function moveForward(robot: Robot, grid: Grid): void {
    const destination = nextPosition(robot);

    if (grid.contains(destination)) {
        robot.moveTo(destination);
        return;
    }

    if (grid.hasScent(robot.position)) {
        return;
    }

    grid.addScent(robot.position);
    robot.markAsLost();
}

function nextPosition(robot: Robot): Position {
    const { x, y } = robot.position;

    switch (robot.orientation) {
        case 'N':
            return { x, y: y + 1 };

        case 'E':
            return { x: x + 1, y };

        case 'S':
            return { x, y: y - 1 };

        case 'W':
            return { x: x - 1, y };
    }
}

export const defaultCommands: Record<string, Command> = {
    L: (robot) => robot.turnLeft(),
    R: (robot) => robot.turnRight(),
    F: moveForward,
};

export class Simulator {
    constructor(
        private readonly grid: Grid,
        private readonly commands: Record<string, Command> = defaultCommands,
    ) {}

    execute(robot: Robot, instructions: string): void {
        for (const instruction of instructions) {
            if (robot.isLost) {
                break;
            }

            const command = this.commands[instruction];

            if (command === undefined) {
                throw new Error(`Unsupported instruction: ${instruction}`);
            }

            command(robot, this.grid);
        }
    }
}