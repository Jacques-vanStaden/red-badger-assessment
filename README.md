# Martian Robots

A TypeScript implementation of the Martian Robots programming challenge.

The application simulates robots moving across a bounded rectangular grid. Robots can turn left or right, move forward, and may be lost when attempting to move beyond the grid. Lost robots leave a scent that prevents subsequent robots from being lost in the same way.

## Requirements

- Node.js 20+
- npm

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the application

The application reads input from standard input.

Using the supplied sample:

```bash
npm start < data/sample-input.txt
```

Expected output:

```
1 1 E
3 3 N LOST
2 3 S
```

## Running tests

Run the complete test suite:

```bash
npm test
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Run the test suite in watch mode during development:

```bash
npm run test:watch
```

## Architecture

The solution is intentionally small and follows a simple separation of responsibilities.

### Domain

- `Robot` owns the robot's position, orientation and lost state.
- `Grid` owns the grid boundaries and scents left by lost robots.
- `Position` represents an immutable coordinate.
- `Orientation` defines the valid compass directions and rotation behaviour.

### Input

`InputParser` converts the text input into typed application data and validates the input structure.

### Simulation

`Simulator` executes robot instructions sequentially. Movement rules are kept separate from the orchestration logic. Commands are registered through a command map, allowing additional command types to be introduced without changing the simulation loop.

### Application

`Application` coordinates parsing, grid creation, robot creation, simulation and output formatting.

The CLI entry point in `src/index.ts` is intentionally thin and is responsible only for reading standard input and passing it to the application.

## Design decisions

### KISS

The challenge does not require a UI, database or external services, so none are introduced. The implementation focuses on the domain behaviour and makes the application easy to run and test.

### Robot state

Robot state is encapsulated inside the `Robot` class. Consumers interact with the robot through its public behaviour rather than directly modifying its internal state.

### Grid and scents

The `Grid` owns scent information because scents are part of the grid's simulation state.

A `Set` is used because a scent is simply the presence or absence of a marker at a coordinate, providing efficient lookup and avoiding unnecessary domain objects.

### Command registration

Instructions are resolved through a command registry rather than a large conditional inside the simulator. This provides a straightforward extension point for future command types while keeping the current implementation simple.

### Input validation

The parser validates the structure and values of the input before simulation begins. The challenge specifies maximum coordinate and instruction lengths; these limits are not enforced as separate application constraints because the implementation can safely process the stated input range without requiring additional complexity.

### Sequential simulation

Robots are processed in input order and share the same `Grid` instance. This is important because scents left by earlier lost robots must affect later robots.

## Project structure

```
src/
├── domain/
│   ├── Grid.ts
│   ├── Orientation.ts
│   ├── Position.ts
│   └── Robot.ts
├── simulation/
│   └── Simulator.ts
├── Application.ts
├── InputParser.ts
└── index.ts

tests/
├── Application.test.ts
├── Grid.test.ts
├── InputParser.test.ts
├── Orientation.test.ts
├── Robot.test.ts
└── Simulator.test.ts

data/
├── sample-input.txt
└── sample-output.txt
```

## Testing

The test suite covers:

- Robot movement and rotation
- All four grid edges
- Lost robot behaviour
- Scent creation
- Scent-aware movement
- Sequential robot interaction
- Input parsing and validation
- Unsupported instructions
- Custom command registration
- End-to-end application execution using the challenge sample
