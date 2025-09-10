import React from 'react';
import { CategoryCard } from './CategoryCard';
import { 
  Recycle, 
  Wrench, 
  Wine, 
  Package, 
  FileText, 
  Trash2 
} from 'lucide-react';

const categories = [
  {
    name: 'Plastic',
    description: 'Bottles, containers, bags, packaging materials',
    icon: Recycle,
    color: 'plastic',
    examples: ['Water bottles', 'Food containers', 'Plastic bags', 'Packaging']
  },
  {
    name: 'Metal',
    description: 'Cans, foil, metal containers and objects',
    icon: Wrench,
    color: 'metal',
    examples: ['Aluminum cans', 'Steel cans', 'Foil', 'Metal containers']
  },
  {
    name: 'Glass',
    description: 'Bottles, jars, and glass containers',
    icon: Wine,
    color: 'glass',
    examples: ['Wine bottles', 'Glass jars', 'Beverage bottles', 'Glass containers']
  },
  {
    name: 'Cardboard',
    description: 'Boxes, packaging, corrugated materials',
    icon: Package,
    color: 'cardboard',
    examples: ['Shipping boxes', 'Cereal boxes', 'Pizza boxes', 'Packaging']
  },
  {
    name: 'Paper',
    description: 'Newspapers, magazines, office paper',
    icon: FileText,
    color: 'paper',
    examples: ['Newspapers', 'Magazines', 'Office paper', 'Books']
  },
  {
    name: 'Trash',
    description: 'Non-recyclable waste and mixed materials',
    icon: Trash2,
    color: 'trash',
    examples: ['Food waste', 'Dirty items', 'Mixed materials', 'Non-recyclables']
  }
];

export const CategoryGrid: React.FC = () => {
  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          description={category.description}
          icon={category.icon}
          color={category.color}
          examples={category.examples}
        />
      ))}
    </div>
  );
};