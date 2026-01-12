'use client';

import { useState } from 'react';
import { Download, Upload, Check, X } from 'lucide-react';

interface BuildImportExportProps {
  buildCode?: string;
  onImport?: (code: string) => void;
  onExport?: () => string;
}

export function BuildImportExport({ buildCode, onImport, onExport }: BuildImportExportProps) {
  const [importCode, setImportCode] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [exportCode, setExportCode] = useState(buildCode || '');

  const handleImport = () => {
    if (!importCode.trim()) return;
    
    setIsImporting(true);
    // Simulate import process
    setTimeout(() => {
      if (onImport) {
        onImport(importCode);
      }
      setIsImporting(false);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    }, 1000);
  };

  const handleExport = () => {
    const code = onExport ? onExport() : buildCode || '';
    setExportCode(code);
    
    // Copy to clipboard
    navigator.clipboard.writeText(code);
    
    // Create download link
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="bg-[#141417] border border-[#3d3d43] p-6">
        <h3 className="text-xl font-serif text-[#c5a059] mb-4 flex items-center gap-2">
          <Download size={20} />
          Export Build
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Export your build code to share with others or import into Path of Building.
        </p>
        <div className="space-y-4">
          <textarea
            value={exportCode}
            readOnly
            className="w-full h-32 px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-gray-300 font-mono text-sm resize-none focus:border-[#c5a059] focus:outline-none"
            placeholder="Build code will appear here..."
          />
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Export & Copy
            </button>
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-[#141417] border border-[#3d3d43] p-6">
        <h3 className="text-xl font-serif text-[#c5a059] mb-4 flex items-center gap-2">
          <Upload size={20} />
          Import Build
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Paste a build code from Path of Building or another source to import.
        </p>
        <div className="space-y-4">
          <textarea
            value={importCode}
            onChange={(e) => setImportCode(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-gray-300 font-mono text-sm resize-none focus:border-[#c5a059] focus:outline-none"
            placeholder="Paste build code here..."
          />
          {importSuccess && (
            <div className="flex items-center gap-2 text-green-500">
              <Check size={18} />
              <span className="text-sm">Build imported successfully!</span>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={handleImport}
              disabled={isImporting || !importCode.trim()}
              className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={18} />
              {isImporting ? 'Importing...' : 'Import Build'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
