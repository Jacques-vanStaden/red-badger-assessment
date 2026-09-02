import { Orientation } from './domain/Orientation';
import { Position } from './domain/Position';

export interface RobotInput {
    position: Position;
    orientation: Orientation;
    instructions: string;
}

export interface ParsedInput {
    maxX: number;
    maxY: number;
    robots: RobotInput[];
}

const validOrientations: readonly Orientation[] = [
    'N',
    'E',
    'S',
    'W',
];

function isOrientation(value: string): value is Orientation {
    return validOrientations.includes(value as Orientation);
}

function parseInteger(value: string): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed)) {
        throw new Error(`Invalid integer: ${value}`);
    }

    return parsed;
}

export function parseInput(input: string): ParsedInput {
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        throw new Error('Input cannot be empty');
    }

    const lines = trimmedInput
        .split(/\r?\n/)
        .map((line) => line.trim());

    const gridParts = lines[0]!.split(/\s+/);

    if (gridParts.length !== 2) {
        throw new Error('Invalid grid dimensions');
    }

    const maxX = parseInteger(gridParts[0]!);
    const maxY = parseInteger(gridParts[1]!);

    const robots: RobotInput[] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const positionLine = lines[i];
        const instructions = lines[i + 1];

        if (
            positionLine === undefined ||
            instructions === undefined ||
            instructions.length === 0
        ) {
            throw new Error('Invalid robot input');
        }

        const positionParts = positionLine.split(/\s+/);

        if (positionParts.length !== 3) {
            throw new Error('Invalid robot input');
        }

        const [xValue, yValue, orientationValue] = positionParts;

        if (
            xValue === undefined ||
            yValue === undefined ||
            orientationValue === undefined
        ) {
            throw new Error('Invalid robot input');
        }

        if (!isOrientation(orientationValue)) {
            throw new Error(`Invalid orientation: ${orientationValue}`);
        }

        robots.push({
            position: {
                x: parseInteger(xValue),
                y: parseInteger(yValue),
            },
            orientation: orientationValue,
            instructions,
        });
    }

    return {
        maxX,
        maxY,
        robots,
    };
}