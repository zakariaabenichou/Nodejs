'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';

import { getRecipeDetails } from '@/app/actions';
import { RecipeCard } from '@/components/recipe-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import type { Recipe } from '@/types';

type FormState = {
  error?: {
    dishName?: string[];
    _global?: string[];
  };
  data?: Recipe;
};

const initialState: FormState = {
  error: undefined,
  data: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4 font-body">
      {pending ? <LoaderCircle className="animate-spin" /> : 'Generate Recipe'}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(getRecipeDetails, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      const errorMessages = [
          ...(state.error.dishName || []),
          ...(state.error._global || []),
      ].join(' ');
      
      if(errorMessages) {
        toast({
          title: 'Oops!',
          description: errorMessages,
          variant: 'destructive',
        });
      }
    }
    if (state?.data) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-8">
      <header className="flex flex-col items-center text-center my-8">
        <ChefHat className="w-20 h-20 text-primary mb-4" />
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">RecipeSage</h1>
        <p className="font-body text-lg text-muted-foreground mt-2 max-w-md">
          Your AI-powered culinary companion. Just name a dish, and we'll whip up the recipe.
        </p>
      </header>
      
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 items-center">
        <Card className="w-full shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary/90">Let's Get Cooking!</CardTitle>
            <CardDescription className="font-body">What are we making today?</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-2">
              <div>
                <Label htmlFor="dishName" className="font-body sr-only">Dish Name</Label>
                <Input
                  id="dishName"
                  name="dishName"
                  placeholder="e.g., Spaghetti Carbonara"
                  required
                  className="font-body text-base"
                />
                 {state?.error?.dishName && (
                  <p className="text-sm font-medium text-destructive mt-1 px-1">{state.error.dishName[0]}</p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state.data && (
            <RecipeCard key={state.data.recipeName} recipe={state.data} />
        )}
      </main>

      <footer className="text-center p-4 mt-auto text-muted-foreground font-body text-sm">
        <p>Crafted with <span className="text-primary">&hearts;</span> by RecipeSage.</p>
      </footer>
    </div>
  );
}
