'use server';

/**
 * @fileOverview This file defines a Genkit flow to determine the country of origin for a given recipe.
 *
 * - contextualizeRecipe - A function that takes a recipe name and returns the country of origin.
 * - ContextualizeRecipeInput - The input type for the contextualizeRecipe function.
 * - ContextualizeRecipeOutput - The return type for the contextualizeRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualizeRecipeInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
});
export type ContextualizeRecipeInput = z.infer<typeof ContextualizeRecipeInputSchema>;

const ContextualizeRecipeOutputSchema = z.object({
  countryOfOrigin: z.string().describe('The country of origin of the recipe.'),
});
export type ContextualizeRecipeOutput = z.infer<typeof ContextualizeRecipeOutputSchema>;

export async function contextualizeRecipe(input: ContextualizeRecipeInput): Promise<ContextualizeRecipeOutput> {
  return contextualizeRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualizeRecipePrompt',
  input: {schema: ContextualizeRecipeInputSchema},
  output: {schema: ContextualizeRecipeOutputSchema},
  prompt: `What is the country of origin for the following recipe: {{{recipeName}}}?`,
});

const contextualizeRecipeFlow = ai.defineFlow(
  {
    name: 'contextualizeRecipeFlow',
    inputSchema: ContextualizeRecipeInputSchema,
    outputSchema: ContextualizeRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
