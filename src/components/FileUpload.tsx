import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onClose: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      onClose();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'txt':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Add Context File</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-purple-400 bg-purple-500/10' 
              : 'border-gray-400 hover:border-purple-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <>
              <div className="text-4xl mb-4">📁</div>
              <p className="text-gray-300 mb-2">
                Drag and drop your file here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-400">
                Supports PDF, DOC, DOCX, XLS, XLSX, TXT files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                className="hidden"
              />
            </>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">{getFileIcon(selectedFile.name)}</div>
              <p className="text-white font-medium mb-2">{selectedFile.name}</p>
              <p className="text-gray-400 text-sm mb-4">
                {formatFileSize(selectedFile.size)}
              </p>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-purple-400 hover:text-purple-300 underline text-sm"
              >
                Choose different file
              </button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleUpload}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Upload File
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

