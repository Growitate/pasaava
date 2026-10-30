import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, ArrowUp, ArrowDown, Edit2, Upload, Image as ImageIcon, Check, ExternalLink } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { CategoryItem } from '../../types';

interface AdminCategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const AdminCategoriesPage: React.FC<AdminCategoriesPageProps> = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(() => storageService.getCategories());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('/images/cat-chains-prod.jpg');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      setCategories(storageService.getCategories());
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setImage('/images/cat-chains-prod.jpg');
    setSeoTitle('');
    setSeoDesc('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setImage(cat.image);
    setSeoTitle(cat.seoTitle || `${cat.name} | Men's Jewellery | PASAAVA`);
    setSeoDesc(
      cat.seoDesc ||
        `Explore handcrafted men's ${cat.name.toLowerCase()} engineered from waterproof 316L surgical stainless steel at PASAAVA.`
    );
    setIsFormOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      const generated = storageService.generateUniqueCategorySlug(val);
      setSlug(generated);
      setSeoTitle(`${val} | Men's Jewellery | PASAAVA`);
      setSeoDesc(
        `Explore handcrafted men's ${val.toLowerCase()} engineered from waterproof 316L surgical steel. Premium men's jewellery from PASAAVA. Shop now.`
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) setImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rawSlug = (slug || name).trim().toLowerCase();
    const cleanSlug = storageService.generateUniqueCategorySlug(rawSlug, editingId || undefined);

    const defaultTitle = `${name.trim()} | Men's Jewellery | PASAAVA`;
    const defaultDesc = `Explore handcrafted men's ${name.trim().toLowerCase()} engineered from waterproof 316L surgical steel. Premium men's jewellery from PASAAVA. Shop now.`;

    const catPayload: CategoryItem = {
      id: editingId || `cat-${Date.now()}`,
      name: name.trim(),
      slug: cleanSlug,
      image: image || '/images/cat-chains-prod.jpg',
      order: editingId
        ? categories.find((c) => c.id === editingId)?.order || categories.length
        : categories.length + 1,
      itemCount: categories.find((c) => c.id === editingId)?.itemCount || 0,
      seoTitle: seoTitle.trim() || defaultTitle,
      seoDesc: seoDesc.trim() || defaultDesc
    };

    storageService.saveCategory(catPayload);
    setIsFormOpen(false);
    setEditingId(null);
    setName('');
    setSlug('');
    setSeoTitle('');
    setSeoDesc('');
    showNotification(`Category "${catPayload.name}" saved!`);
  };

  const handleRestoreArtwork = () => {
    storageService.resetCategoriesToDefaults();
    showNotification('Default category images restored successfully!');
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      storageService.deleteCategory(id);
      showNotification(`Deleted category "${catName}"`);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    storageService.reorderCategories(updated);
    showNotification('Category ordering updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Navigation & Taxonomy
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">
            Categories ({categories.length})
          </h2>
          <p className="text-xs text-gray-500">
            Hardware category taxonomy, circular strip order, and icons
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestoreArtwork}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            title="Reset to official category product photos"
          >
            <span>Restore Artwork</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-semibold hover:bg-black transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Add / Edit Category Form Modal */}
      {isFormOpen && (
        <form
          onSubmit={handleSave}
          className="bg-white p-6 rounded-2xl border border-black/15 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-[#111111]">
              {editingId ? 'Edit Category' : 'Create New Category'}
            </h3>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-black"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Cuffs & Bands"
                required
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">URL Slug</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs text-gray-400 font-mono">
                  /category/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="cuffs-and-bands"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-r-xl text-xs text-black font-mono focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Circle Image Preview & Upload */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={image}
              alt="Category Preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-black/20 bg-white flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/cat-chains-prod.jpg';
              }}
            />

            <div className="flex-1 space-y-2 w-full">
              <label className="block text-xs font-semibold text-gray-700">
                Category Circular Image
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/cat-chains-prod.jpg or URL"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* SEO Metadata & Google SERP Preview */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Category SEO & Google Snippet
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">SEO Meta Title</label>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    seoTitle.length === 0
                      ? 'bg-gray-100 text-gray-500 border-gray-200'
                      : seoTitle.length > 60
                      ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                      : seoTitle.length >= 45
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                      : 'bg-amber-50 text-amber-700 border-amber-200 font-medium'
                  }`}
                >
                  {seoTitle.length}/60 chars ({seoTitle.length > 60 ? 'Too long (>60)' : seoTitle.length >= 45 ? 'Optimal' : seoTitle.length === 0 ? 'Empty' : 'Short (<45)'})
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={`${name || 'Category'} | Men's Jewellery | PASAAVA`}
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[11px] text-gray-400 mt-1">Recommended length: 45–60 characters.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">SEO Meta Description</label>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    seoDesc.length === 0
                      ? 'bg-gray-100 text-gray-500 border-gray-200'
                      : seoDesc.length > 155
                      ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                      : seoDesc.length >= 120
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                      : 'bg-amber-50 text-amber-700 border-amber-200 font-medium'
                  }`}
                >
                  {seoDesc.length}/155 chars ({seoDesc.length > 155 ? 'Too long (max 155)' : seoDesc.length >= 120 ? 'Optimal (120–155)' : seoDesc.length === 0 ? 'Empty' : 'Too short (min 120)'})
                </span>
              </div>
              <textarea
                rows={2}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder={`Explore luxury handcrafted ${name.toLowerCase() || 'pieces'} engineered from waterproof surgical steel...`}
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[11px] text-gray-400 mt-1">Recommended length: 120–155 characters.</p>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="bg-[#F8F9FA] p-3.5 rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Google Search Result Snippet Preview
                </span>
                <a
                  href={`/#/category/${slug || 'chains'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  title="Open live category page in new tab"
                >
                  <span>Open Live Category Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-2xs font-sans">
                <a
                  href={`/#/category/${slug || 'chains'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#202124] flex items-center gap-1.5 mb-0.5 hover:underline cursor-pointer group"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-black text-white text-[8px] flex items-center justify-center font-bold">P</span>
                  <span className="text-gray-700 truncate font-mono text-[10px]">https://pasaava.growithcp.live › category › {slug || 'chains'}</span>
                </a>
                <a
                  href={`/#/category/${slug || 'chains'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug block"
                >
                  {seoTitle || `${name || 'Category'} | Men's Jewellery | PASAAVA`}
                </a>
                <div className="text-xs text-[#4d5156] line-clamp-2 mt-1 leading-relaxed">
                  {seoDesc ||
                    `Explore handcrafted men's ${(name || 'jewellery').toLowerCase()} engineered from waterproof 316L surgical stainless steel at PASAAVA.`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-900 shadow-sm"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Categories Reorderable List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="bg-white p-4 rounded-2xl border border-[#EBEBEB] flex items-center justify-between shadow-xs hover:border-gray-400 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/cat-chains-prod.jpg';
                }}
              />
              <div>
                <h4 className="text-xs font-bold text-[#111111]">{cat.name}</h4>
                <p className="text-[10px] text-gray-400 font-mono">slug: /{cat.slug}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-gray-500">Order: #{idx + 1}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={idx === 0}
                onClick={() => handleMove(idx, 'up')}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 disabled:opacity-20 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                disabled={idx === categories.length - 1}
                onClick={() => handleMove(idx, 'down')}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 disabled:opacity-20 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Edit Category"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
