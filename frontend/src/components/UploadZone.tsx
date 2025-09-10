import React, { useState, useRef } from 'react';
import { Upload, Image, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isClassifying: boolean;
  onReset: () => void;
  hasResult: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onImageUpload,
  isClassifying,
  onReset,
  hasResult
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  };

  const handleClick = () => {
    if (!isClassifying && !hasResult) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center transition-smooth cursor-pointer
            ${isDragOver 
              ? 'border-eco-primary bg-eco-secondary/20 shadow-upload' 
              : 'border-border hover:border-eco-primary hover:bg-eco-secondary/10'
            }
            ${isClassifying ? 'pointer-events-none opacity-75' : ''}
            ${hasResult ? 'pointer-events-none opacity-50' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isClassifying || hasResult}
          />
          
          <div className="flex flex-col items-center gap-4">
            {isClassifying ? (
              <>
                <div className="rounded-full bg-eco-primary/10 p-4">
                  <Loader2 className="h-8 w-8 text-eco-primary animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Classifying...</h3>
                  <p className="text-muted-foreground">AI is analyzing your image</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-eco-secondary p-4">
                  <Image className="h-8 w-8 text-eco-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Upload Litter Image</h3>
                  <p className="text-muted-foreground">
                    Drag & drop an image here, or click to browse
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Supports JPG, PNG, WebP up to 10MB
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {hasResult && (
          <div className="flex justify-center">
            <Button 
              onClick={onReset}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Classify Another Image
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};