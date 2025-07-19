'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, MapPin, Utensils, Hash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Recipe } from '@/types';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [rating, setRating] = useState<'liked' | 'disliked' | null>(null);

  return (
    <Card className="w-full max-w-2xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-500 border-border/50 overflow-hidden">
      {recipe.imageUrl && (
        <div className="relative w-full aspect-video">
           <Image 
              src={recipe.imageUrl}
              alt={`A picture of ${recipe.recipeName}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">{recipe.recipeName}</CardTitle>
        <CardDescription className="font-body flex items-center gap-2 pt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" />
          From the beautiful country of {recipe.countryOfOrigin}
        </CardDescription>
      </CardHeader>
      <CardContent className="font-body">
        <div className="space-y-6">
          <div>
            <h3 className="font-headline text-xl flex items-center gap-2 mb-3 text-primary/90"><Utensils className="h-5 w-5 text-accent" />Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-foreground/90">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="font-headline text-xl flex items-center gap-2 mb-3 text-primary/90"><Hash className="h-5 w-5 text-accent"/>Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-foreground/90">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant={rating === 'liked' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setRating(rating === 'liked' ? null : 'liked')}
          aria-label="Like recipe"
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button
          variant={rating === 'disliked' ? 'destructive' : 'outline'}
          size="icon"
          onClick={() => setRating(rating === 'disliked' ? null : 'disliked')}
          aria-label="Dislike recipe"
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
