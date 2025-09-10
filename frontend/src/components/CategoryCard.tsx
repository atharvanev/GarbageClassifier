import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  examples: string[];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  description,
  icon: Icon,
  color,
  examples
}) => {
  const colorClasses = {
    plastic: 'bg-plastic-secondary border-plastic text-plastic',
    metal: 'bg-metal-secondary border-metal text-metal',
    glass: 'bg-glass-secondary border-glass text-glass',
    cardboard: 'bg-cardboard-secondary border-cardboard text-cardboard',
    paper: 'bg-paper-secondary border-paper text-paper',
    trash: 'bg-trash-secondary border-trash text-trash'
  };

  return (
    <Card className={`p-4 border-l-4 transition-smooth hover:shadow-category ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-lg p-2 bg-background/50">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex flex-wrap gap-1">
            {examples.map((example, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs rounded-full bg-background/30 text-foreground"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};