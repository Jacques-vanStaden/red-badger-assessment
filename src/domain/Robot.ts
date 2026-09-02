import { Orientation, turnLeft, turnRight } from './Orientation';
import { Position } from './Position';

export class Robot {
    private currentPosition: Position;
    private currentOrientation: Orientation;
    private lost = false;

    constructor(position: Position, orientation: Orientation) {
        this.currentPosition = position;
        this.currentOrientation = orientation;
    }

    get position(): Position {
        return this.currentPosition;
    }

    get orientation(): Orientation {
        return this.currentOrientation;
    }

    get isLost(): boolean {
        return this.lost;
    }

    turnLeft(): void {
        this.currentOrientation = turnLeft(this.currentOrientation);
    }

    turnRight(): void {
        this.currentOrientation = turnRight(this.currentOrientation);
    }

    moveTo(position: Position): void {
        this.currentPosition = position;
    }

    markAsLost(): void {
        this.lost = true;
    }
}