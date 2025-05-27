import React, { useState, useCallback } from "react";
import Button from "@/components/ui/Button";
// import { Input } from "@/components/ui/input";
import {
  File,
  UploadCloud,
  CheckCircle,
  XCircle,
  ImagePlus,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  selectedImage: File | null;
  isUploading?: boolean;
  error?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  onClear,
  selectedImage,
  isUploading = false,
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      if (acceptedFiles?.length) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      onImageSelect(files[0]);
    }
  };

  const clearSelection = () => {
    onClear();
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed border-gray-300",
        "p-6 flex flex-col items-center justify-center",
        "transition-colors duration-300",
        isDragging
          ? "bg-gray-50 border-blue-500"
          : "bg-white/80 hover:border-gray-400",
        error && "border-red-500"
      )}
      onDrop={(event) => handleDrop(Array.from(event.dataTransfer.files))}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer bg-black"
        aria-describedby="image-upload-instructions"
      />

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded Preview"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center gap-4 outline px-3 py-1 rounded">
              <p className="text-sm text-gray-700 truncate max-w-[200px]">
                {selectedImage.name}
              </p>
              <Button
                // variant="outline"
                size="icon"
                onClick={clearSelection}
                className="text-red-500 hover:bg-red-50"
                title="Clear Selection"
              >
                <XCircle className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <ImagePlus className="w-12 h-12 mx-auto text-gray-500" />
            <p
              className={cn("text-gray-600 text-sm", error && "text-red-500")}
              id="image-upload-instructions"
            >
              Drag and drop an image here, or click to select a file.
              <br />
              (JPG, PNG, GIF)
            </p>
            <label htmlFor="image-upload">
              <Button variant="outline" type="button" className="px-4 py-2">
                <UploadCloud className="mr-2 w-4 h-4" />
                Choose File
              </Button>
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {isUploading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {error && (
        <p className="absolute bottom-2 text-center text-red-500 text-sm w-full">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
