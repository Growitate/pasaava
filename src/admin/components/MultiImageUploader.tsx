import React, { useState } from 'react';
import { Upload, X, ArrowLeft, ArrowRight, GripVertical, Image as ImageIcon, Plus } from 'lucide-react';

export interface ProductImageItem {
  url: string;
  alt: string;
}

interface MultiImageUploaderProps {
  images: ProductImageItem[];
  onChange: (images: ProductImageItem[]) => void;
  productTitleFallback?: string;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  onChange,
  productTitleFallback = 'PASAAVA Hardware'
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [altInput, setAltInput] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newImg: ProductImageItem = {
      url: urlInput.trim(),
      alt: altInput.trim() || `${productTitleFallback} - 316L Stainless Steel Men's Jewellery`
    };

    onChange([...images, newImg]);
    setUrlInput('');
    setAltInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate image type & size (max 5MB)
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, WebP).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const newImg: ProductImageItem = {
            url: dataUrl,
            alt: `${productTitleFallback} - ${file.name.replace(/\.[^/.]+$/, '')}`
          };
          onChange([...images, newImg]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleAltChange = (index: number, newAlt: string) => {
    const updated = [...images];
    updated[index].alt = newAlt;
    onChange(updated);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...images];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    onChange(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900">
            Hardware Gallery Images ({images.length})
          </label>
          <p className="text-[11px] text-gray-500">
            Drag to reorder. 1st image is Main, 2nd image shows on Hover slider, 3rd+ in Gallery.
          </p>
        </div>

        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-xs">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* URL Add Input */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste Image URL (e.g. /images/drop-wave-chain.jpg or https://...)"
          className="flex-1 px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        <input
          type="text"
          value={altInput}
          onChange={(e) => setAltInput(e.target.value)}
          placeholder="Image Alt Text (optional)"
          className="sm:w-1/3 px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {/* Images Grid (Drag to Reorder) */}
      {images.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
          <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-gray-700">No images uploaded yet</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Add via URL or upload image files directly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((img, index) => {
            const isPrimary = index === 0;
            const isHover = index === 1;

            return (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative bg-white p-2.5 rounded-xl border transition-all cursor-move flex flex-col justify-between ${
                  draggedIndex === index
                    ? 'border-black ring-2 ring-black/20 shadow-md scale-102'
                    : 'border-gray-200 hover:border-gray-400 shadow-xs'
                }`}
              >
                {/* Image Preview & Badges */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero-masculine-bold.jpg';
                    }}
                  />

                  {/* Status Pills */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isPrimary && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-black text-white shadow-xs">
                        Primary / Main
                      </span>
                    )}
                    {isHover && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                        Hover Slider
                      </span>
                    )}
                    {!isPrimary && !isHover && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                        Gallery #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Alt Text Input */}
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => handleAltChange(index, e.target.value)}
                    placeholder="Alt text for SEO & accessibility"
                    className="w-full px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[10.5px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                  />

                  {/* Reorder Arrows */}
                  <div className="flex items-center justify-between text-gray-500 pt-1">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <GripVertical className="w-3 h-3" />
                      <span>Drag to sort</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'left')}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                        title="Move Earlier"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === images.length - 1}
                        onClick={() => handleMove(index, 'right')}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                        title="Move Later"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
