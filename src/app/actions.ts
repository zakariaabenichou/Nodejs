'use server';

import { z } from 'zod';
import { generateRecipe } from '@/ai/flows/generate-recipe';
import { contextualizeRecipe } from '@/ai/flows/contextualize-recipe';
import type { Recipe } from '@/types';

const schema = z.object({
  dishName: z.string({ required_error: 'Dish name is required.'}).min(3, 'Please enter a longer dish name.'),
});

type FormState = {
  error?: {
    dishName?: string[];
    _global?: string[];
  };
  data?: Recipe;
};

export async function getRecipeDetails(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    dishName: formData.get('dishName'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const recipeData = await generateRecipe({ dishName: validatedFields.data.dishName });
    if (!recipeData || !recipeData.recipeName) {
      return { error: { _global: ['Could not generate recipe. Please try a different dish name.'] } };
    }
    
    const contextData = await contextualizeRecipe({ recipeName: recipeData.recipeName });

    const fullRecipe: Recipe = {
      ...recipeData,
      ...contextData,
    };

    return { data: fullRecipe };
  } catch (e: any) {
    console.error('Error in getRecipeDetails:', e);
    return { error: { _global: [e.message || 'An unexpected error occurred while generating the recipe.'] } };
  }
}
