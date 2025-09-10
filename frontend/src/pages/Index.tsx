import React, { useState } from 'react';
import { UploadZone } from '@/components/UploadZone';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ClassificationResult } from '@/components/ClassificationResult';
import { Leaf, Sparkles } from 'lucide-react';

export interface ClassificationResult {
  category: string;
  confidence: number;
  color: string;
}

const Index = () => {
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsClassifying(true);
    setUploadedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const categories = ["Cardboard", "Glass", "Metal", "Paper", "Plastic", "Trash"];
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult({
        category: categories[data.predicted_class],
        confidence: data.confidence,
        color: categories[data.predicted_class].toLowerCase(),
      });
    } catch (error) {
      setResult(null);
      // Optionally show an error toast here
    }
    setIsClassifying(false);
  };

  const handleReset = () => {
    setResult(null);
    setUploadedImage(null);
    setIsClassifying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-eco-primary p-2">
              <Leaf className="h-6 w-6 text-eco-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">EcoClassify</h1>
              <p className="text-sm text-muted-foreground">AI-powered litter classification</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-eco-primary" />
            <h2 className="text-4xl font-bold text-foreground">Smart Waste Classification</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image of litter and our AI will classify it into the correct recycling category. 
            Help make recycling easier and more accurate!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Upload and Results Section */}
          <div className="space-y-8">
            <UploadZone 
              onImageUpload={handleImageUpload}
              isClassifying={isClassifying}
              onReset={handleReset}
              hasResult={!!result}
            />
            
            {result && uploadedImage && (
              <ClassificationResult 
                result={result}
                uploadedImage={uploadedImage}
                onReset={handleReset}
              />
            )}
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Classification Categories</h3>
            <CategoryGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;