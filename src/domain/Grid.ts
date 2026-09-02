import { Position } from './Position';

export class Grid {
    private readonly scents = new Set<string>();

    constructor(
    readonly maxX: number,
    readonly maxY: number,
    ) {
        if (maxX < 0 || maxY < 0) {
            throw new Error('Grid dimensions cannot be negative');
        }
    }

    contains(position: Position): boolean {
        return (
            position.x >= 0 &&
            position.x <= this.maxX &&
            position.y >= 0 &&
            position.y <= this.maxY
        );
    }

    hasScent(position: Position): boolean {
        return this.scents.has(this.positionKey(position));
    }

    addScent(position: Position): void {
        this.scents.add(this.positionKey(position));
    }

    private positionKey(position: Position): string {
        return `${position.x},${position.y}`;
    }
}