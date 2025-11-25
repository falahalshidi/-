'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Plus,
  Search,
  Grid3x3,
  List,
  Eye,
  Heart,
  Share2,
  Edit,
  Trash2,
  Copy,
  DollarSign,
  Star,
  TrendingUp,
  AlertTriangle,
  Filter,
  Image as ImageIcon
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
  views: number
  likes: number
  orders: number
  rating: number
  availability: boolean
  branches: string[]
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'برجر كلاسيك',
    category: 'وجبات رئيسية',
    price: 45,
    description: 'برجر لحم بقري طازج مع الخس والطماطم والصوص الخاص',
    image: '🍔',
    views: 1234,
    likes: 456,
    orders: 389,
    rating: 4.8,
    availability: true,
    branches: ['مسقط', 'صلالة', 'صحار'],
  },
  {
    id: 2,
    name: 'بيتزا مارغريتا',
    category: 'وجبات رئيسية',
    price: 55,
    description: 'بيتزا إيطالية كلاسيكية مع صوص الطماطم والجبن الموتزاريلا',
    image: '🍕',
    views: 1123,
    likes: 389,
    orders: 312,
    rating: 4.7,
    availability: true,
    branches: ['مسقط', 'صلالة'],
  },
  {
    id: 3,
    name: 'سلطة سيزر',
    category: 'سلطات',
    price: 35,
    description: 'خس طازج مع الدجاج المشوي وصوص السيزر الكريمي',
    image: '🥗',
    views: 987,
    likes: 312,
    orders: 267,
    rating: 4.6,
    availability: true,
    branches: ['الرياض', 'جدة', 'الدمام', 'مكة'],
  },
  {
    id: 4,
    name: 'باستا الفريدو',
    category: 'وجبات رئيسية',
    price: 48,
    description: 'باستا مع صوص الكريمة الإيطالي والدجاج المشوي',
    image: '🍝',
    views: 876,
    likes: 289,
    orders: 234,
    rating: 4.5,
    availability: true,
    branches: ['مسقط', 'صلالة'],
  },
  {
    id: 5,
    name: 'عصير برتقال طازج',
    category: 'مشروبات',
    price: 15,
    description: 'عصير برتقال طبيعي 100% بدون إضافات',
    image: '🍊',
    views: 765,
    likes: 267,
    orders: 456,
    rating: 4.9,
    availability: true,
    branches: ['الرياض', 'جدة', 'الدمام', 'مكة'],
  },
  {
    id: 6,
    name: 'تشيز كيك',
    category: 'حلويات',
    price: 28,
    description: 'تشيز كيك كريمي مع صوص الفراولة',
    image: '🍰',
    views: 654,
    likes: 234,
    orders: 198,
    rating: 4.7,
    availability: false,
    branches: ['مسقط'],
  },
]

const categories = ['الكل', 'وجبات رئيسية', 'سلطات', 'حلويات', 'مشروبات']

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showPriceEditor, setShowPriceEditor] = useState(false)
  const [showAddDishModal, setShowAddDishModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'وجبات رئيسية',
    price: 0,
    description: '',
    image: null as File | null,
    availability: true,
    branches: [] as string[]
  })
  const [newCategory, setNewCategory] = useState('')

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory
    const matchesSearch = item.name.includes(searchQuery) || item.description.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const handleAddDish = () => {
    console.log('إضافة طبق جديد:', newDish)
    setShowAddDishModal(false)
    // هنا يمكن إضافة الطبق للقائمة
  }

  const handleAddCategory = () => {
    console.log('إضافة تصنيف جديد:', newCategory)
    setShowAddCategoryModal(false)
    // هنا يمكن إضافة التصنيف للقائمة
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDish({ ...newDish, image: e.target.files[0] })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المنيو</h1>
            <p className="text-gray-600">تصميم وتحرير قائمة الطعام بسهولة</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddCategoryModal(true)}
              className="btn-secondary"
            >
              <Copy className="w-4 h-4 ml-2" />
              إضافة تصنيف
            </button>
            <button 
              onClick={() => setShowAddDishModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة طبق جديد
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الأطباق</p>
                <p className="text-3xl font-bold text-gray-900">{menuItems.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي المشاهدات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {menuItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {menuItems.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">متوسط التقييم</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {(menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن طبق..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card hover:shadow-lg transition-shadow group">
                {/* Image */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  {!item.availability && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        غير متوفر
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-primary-600">{item.price} ر.ع</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {item.orders}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                  </div>

                  {/* Branches */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">متوفر في:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.branches.map((branch) => (
                        <span key={branch} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الطبق</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الفئة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">السعر</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">المشاهدات</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الطلبات</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">التقييم</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-2xl">
                            {item.image}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description.substring(0, 40)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-primary-600">{item.price} ر.ع</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.views}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.orders}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.availability 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.availability ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bulk Price Editor Modal Trigger */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">نسخ وتطبيق الأسعار</h3>
              <p className="text-blue-100">طبّق الأسعار على عدة فروع دفعة واحدة</p>
            </div>
            <button 
              onClick={() => setShowPriceEditor(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              فتح محرر الأسعار
            </button>
          </div>
        </div>
      </div>

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">إضافة طبق جديد</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  صورة الطبق
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="dish-image"
                  />
                  <label htmlFor="dish-image" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {newDish.image ? newDish.image.name : 'اسحب وأفلت الصورة أو انقر للاختيار'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم الطبق *
                </label>
                <input
                  type="text"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="مثال: برجر كلاسيك"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  التصنيف *
                </label>
                <select
                  value={newDish.category}
                  onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.filter(c => c !== 'الكل').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  السعر (ر.ع) *
                </label>
                <input
                  type="number"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="وصف تفصيلي للطبق..."
                />
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newDish.availability}
                  onChange={(e) => setNewDish({ ...newDish, availability: e.target.checked })}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  id="availability"
                />
                <label htmlFor="availability" className="text-sm font-semibold text-gray-700">
                  متوفر حالياً
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddDishModal(false)}
                className="btn-secondary"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddDish}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة الطبق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">إضافة تصنيف جديد</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اسم التصنيف *
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="مثال: مشروبات ساخنة"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="btn-secondary"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddCategory}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة التصنيف
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

