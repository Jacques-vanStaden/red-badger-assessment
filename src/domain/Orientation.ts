export type Orientation = 'N' | 'E' | 'S' | 'W';

const orientations: readonly Orientation[] = ['N', 'E', 'S', 'W'];

export function turnLeft(orientation: Orientation): Orientation {
    const currentIndex = orientations.indexOf(orientation);
    const nextIndex = (currentIndex - 1 + orientations.length) % orientations.length;

    return orientations[nextIndex]!;
}

export function turnRight(orientation: Orientation): Orientation {
    const currentIndex = orientations.indexOf(orientation);
    const nextIndex = (currentIndex + 1) % orientations.length;

    return orientations[nextIndex]!;
}