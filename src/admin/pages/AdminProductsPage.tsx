import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Tag,
  Eye,
  IndianRupee
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { ProductFormModal } from '../components/ProductFormModal';

interface AdminProductsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminProductsPage: React.FC<AdminProductsPageProps> = ({ onNavigate }) => {
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      setProducts(storageService.getProducts());
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (p: Product) => {
    storageService.saveProduct(p);
    setIsFormOpen(false);
    showNotification(`"${p.title}" successfully saved!`);
  };

  const handleToggleStock = (product: Product) => {
    const updated = storageService.saveProduct({
      ...product,
      inStock: !product.inStock,
      stockQty: !product.inStock ? 25 : 0
    });
    showNotification(
      `"${updated.title}" marked as ${updated.inStock ? 'IN STOCK' : 'OUT OF STOCK'}`
    );
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      storageService.deleteProduct(id);
      showNotification(`Deleted "${title}"`);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStock =
      selectedStock === 'all' ||
      (selectedStock === 'in' && p.inStock) ||
      (selectedStock === 'out' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6">
      {/* Header & Notification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Inventory & Catalog
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">
            Products ({products.length})
          </h2>
          <p className="text-xs text-gray-500">
            Hardware items, pricing, stock levels, and badges
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-semibold hover:bg-black transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between animate-fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EBEBEB] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, slug, or subtitle..."
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock Only</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EBEBEB] text-gray-400 uppercase tracking-wider font-semibold text-[10.5px]">
                <th className="py-3 px-4">Hardware Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4">Status & Stock</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {filteredProducts.map((product) => {
                const primaryImage =
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : '/images/hero-masculine-bold.jpg';

                return (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Item Image + Title + Slug */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={primaryImage}
                          alt={product.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-[#F5F5F5] flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/hero-masculine-bold.jpg';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#111111] truncate max-w-[200px] sm:max-w-xs">
                            {product.title}
                          </div>
                          <div className="text-[11px] text-gray-400 font-mono truncate">
                            /{product.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 font-medium text-gray-600">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px] text-gray-700">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#111111]">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold transition-all cursor-pointer ${
                          product.inStock
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                        title="Click to toggle stock status"
                      >
                        {product.inStock ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>In Stock ({product.stockQty ?? 25})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4">
                      {product.badge ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black text-white">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onNavigate(`/product/${product.slug}`)}
                          className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add / Edit Modal Drawer */}
      <ProductFormModal
        isOpen={isFormOpen}
        product={editingProduct}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};
