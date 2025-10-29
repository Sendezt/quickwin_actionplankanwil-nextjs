import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { FileText, X } from 'lucide-react';

export const FileDropzone = ({ file, onFileSelect, onFileRemove }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      onFileSelect(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      "image/*": [".png", ".jpg", ".jpeg", ".gif"], 
      "application/pdf": [".pdf"] 
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onFileRemove();
  };

  const isImage = file?.type.startsWith("image/");
  const isPdf = file?.type === "application/pdf";

  if (!file) {
    return (
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <FileText className="h-10 w-10 mx-auto mb-2 text-gray-400" />
        {isDragActive ? (
          <p className="text-sm text-blue-600">Letakkan file di sini...</p>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-1">Seret & lepas file atau klik untuk memilih</p>
            <p className="text-xs text-gray-400">Format: PNG, JPG, PDF (Max 1 file)</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isImage && preview && (
        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
          <img src={preview} alt="Preview" className="w-full max-h-48 object-contain" />
          <Button size="sm" variant="destructive" onClick={handleRemove} className="absolute top-2 right-2 shadow-lg">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
              {isImage && " • Gambar"}
              {isPdf && " • PDF"}
            </p>
          </div>
        </div>
        {!isImage && (
          <Button size="sm" variant="ghost" onClick={handleRemove} className="hover:bg-red-50 hover:text-red-600">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
