import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const recipesData = JSON.parse(
  readFileSync(join(__dirname, './recipes.json'), 'utf8')
);

export const recipes = recipesData;