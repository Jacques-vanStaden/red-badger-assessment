import { readFileSync } from 'node:fs';
import { run } from './Application';

const input = readFileSync(0, 'utf8');

console.log(run(input));