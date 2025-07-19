import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import type { ContextualizeRecipeOutput } from "@/ai/flows/contextualize-recipe";

export type Recipe = GenerateRecipeOutput & ContextualizeRecipeOutput;
