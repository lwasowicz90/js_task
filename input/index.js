import { readFileSync } from 'fs';

const dataPath = process.argv.slice(2)[0];
const rawData = readFileSync(dataPath);

export default JSON.parse(rawData);
