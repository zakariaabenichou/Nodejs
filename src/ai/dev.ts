import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe.ts';
import '@/ai/flows/contextualize-recipe.ts';
import '@/ai/flows/generate-recipe-image.ts';
