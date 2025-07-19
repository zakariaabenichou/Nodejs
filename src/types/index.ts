import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import type { ContextualizeRecipeOutput } from "@/ai/flows/contextualize-recipe";
import type { GenerateRecipeImageOutput } from "@/ai/flows/generate-recipe-image";

export type Recipe = GenerateRecipeOutput & ContextualizeRecipeOutput & GenerateRecipeImageOutput;
