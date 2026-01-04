'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface FileData {
  name: string;
  data: string;
  type: string;
}

export const useFileUpload = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData({ name: file.name, data: reader.result as string, type: file.type });
        toast.success('PDF uploaded successfully');
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast.error('Only PDF files are allowed');
    }
  };

  const clearFile = () => setFileData(null);

  return {
    fileData,
    fileInputRef,
    handleFileChange,
    clearFile,
  };
};

