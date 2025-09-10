import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, RotateCcw, TrendingUp } from 'lucide-react';
import type { ClassificationResult as ClassificationResultType } from '@/pages/Index';

interface ClassificationResultProps {
  result: ClassificationResultType;
  uploadedImage: string;
  onReset: () => void;
}

export const ClassificationResult: React.FC<ClassificationResultProps> = ({
  result,
  uploadedImage,
  onReset
}) => {
  const colorClasses = {
    plastic: 'from-plastic/20 to-plastic-secondary border-plastic',
    metal: 'from-metal/20 to-metal-secondary border-metal',
    glass: 'from-glass/20 to-glass-secondary border-glass',
    cardboard: 'from-cardboard/20 to-cardboard-secondary border-cardboard',
    paper: 'from-paper/20 to-paper-secondary border-paper',
    trash: 'from-trash/20 to-trash-secondary border-trash'
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-eco-primary';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <Card className="p-6 shadow-eco">
      <div className="space-y-6">
        {/* Success Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-eco-primary/10 p-2">
            <CheckCircle className="h-6 w-6 text-eco-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Classification Complete</h3>
            <p className="text-sm text-muted-foreground">AI analysis results</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Uploaded Image */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Uploaded Image</h4>
            <div className="rounded-lg overflow-hidden border border-border">
              <img 
                src={uploadedImage} 
                alt="Uploaded litter"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Classification Result */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Classification Result</h4>
            <Card className={`p-4 bg-gradient-to-br border-l-4 ${colorClasses[result.color as keyof typeof colorClasses]}`}>
              <div className="space-y-3">
                <div>
                  <h5 className="text-lg font-semibold text-foreground">{result.category}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                      {getConfidenceText(result.confidence)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence Score</span>
                    <span className="font-semibold text-foreground">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-eco-primary transition-smooth"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4 border-t border-border">
          <Button 
            onClick={onReset}
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Classify Another Image
          </Button>
        </div>
      </div>
    </Card>
  );
};