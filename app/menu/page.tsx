'use client'

import DashboardLayout from '@/components/DashboardLayout'
import {
  Plus,
  Search,
  Grid3x3,
  List,
  Eye,
  Heart,
  Edit,
  Trash2,
  Copy,
  DollarSign,
  Star,
  TrendingUp,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

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

const initialMenuItems: MenuItem[] = [
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

const initialCategories = ['الكل', 'وجبات رئيسية', 'سلطات', 'حلويات', 'مشروبات']

type Feedback = { type: 'success' | 'error'; message: string } | null

const parseBranches = (text: string) =>
  text
    .split(/،|,/)
    .map((value) => value.trim())
    .filter(Boolean)

const formatBranches = (branches: string[]) => branches.join('، ')

const renderItemVisual = (image: string) => {
  if (image.startsWith('data:')) {
    return <img src={image} alt="صورة الطبق" className="w-full h-full object-cover rounded-lg" />
  }
  return <span className="text-6xl">{image || '🍽️'}</span>
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [categories, setCategories] = useState<string[]>(initialCategories)
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
    image: '',
    availability: true,
    branches: '',
  })
  const [newCategory, setNewCategory] = useState('')
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingBranchesText, setEditingBranchesText] = useState('')
  const [priceEditorConfig, setPriceEditorConfig] = useState({
    scope: 'الكل',
    adjustment: 'increase',
    percentage: 5,
  })

  useEffect(() => {
    if (!feedback) return
    const timeout = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timeout)
  }, [feedback])

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [menuItems, searchQuery, selectedCategory])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, mode: 'new' | 'edit') => {
    if (!event.target.files || !event.target.files[0]) return
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (mode === 'new') {
        setNewDish((prev) => ({ ...prev, image: reader.result as string }))
      } else if (editingItem) {
        setEditingItem({ ...editingItem, image: reader.result as string })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAddDish = () => {
    if (!newDish.name || !newDish.description) {
      setFeedback({ type: 'error', message: 'تأكد من إدخال اسم الطبق ووصفه' })
      return
    }

    const branchList = parseBranches(newDish.branches)

    const dish: MenuItem = {
      id: Date.now(),
      name: newDish.name,
      category: newDish.category,
      price: Number(newDish.price),
      description: newDish.description,
      image: newDish.image || '🍽️',
      views: 0,
      likes: 0,
      orders: 0,
      rating: 4.5,
      availability: newDish.availability,
      branches: branchList.length ? branchList : ['عام'],
    }

    setMenuItems((prev) => [...prev, dish])
    setShowAddDishModal(false)
    setNewDish({
      name: '',
      category: 'وجبات رئيسية',
      price: 0,
      description: '',
      image: '',
      availability: true,
      branches: '',
    })
    setFeedback({ type: 'success', message: 'تم إضافة الطبق الجديد' })
  }

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) {
      setFeedback({ type: 'error', message: 'الرجاء إدخال اسم التصنيف' })
      return
    }
    if (categories.includes(trimmed)) {
      setFeedback({ type: 'error', message: 'هذا التصنيف مضاف مسبقاً' })
      return
    }
    setCategories((prev) => [...prev, trimmed])
    setNewCategory('')
    setShowAddCategoryModal(false)
    setFeedback({ type: 'success', message: 'تم إنشاء التصنيف الجديد' })
  }

  const handleDeleteDish = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
    setFeedback({ type: 'success', message: 'تم حذف الطبق' })
  }

  const handleDuplicateDish = (item: MenuItem) => {
    const copyItem = {
      ...item,
      id: Date.now(),
      name: `${item.name} (نسخة)`,
      views: 0,
      likes: 0,
      orders: 0,
    }
    setMenuItems((prev) => [...prev, copyItem])
    setFeedback({ type: 'success', message: 'تم نسخ الطبق بنجاح' })
  }

  const handleToggleAvailability = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, availability: !item.availability } : item
      )
    )
  }

  const handleSaveEditedDish = () => {
    if (!editingItem) return
    if (!editingItem.name.trim()) {
      setFeedback({ type: 'error', message: 'اسم الطبق مطلوب' })
      return
    }
    const branches = editingBranchesText ? parseBranches(editingBranchesText) : editingItem.branches
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...editingItem, branches } : item
      )
    )
    setEditingItem(null)
    setFeedback({ type: 'success', message: 'تم تحديث الطبق' })
  }

  const handleApplyBulkPriceUpdate = () => {
    if (!priceEditorConfig.percentage) {
      setFeedback({ type: 'error', message: 'أدخل نسبة التعديل' })
      return
    }

    const factor =
      priceEditorConfig.adjustment === 'increase'
        ? 1 + priceEditorConfig.percentage / 100
        : 1 - priceEditorConfig.percentage / 100

    setMenuItems((prev) =>
      prev.map((item) => {
        if (priceEditorConfig.scope !== 'الكل' && item.category !== priceEditorConfig.scope) {
          return item
        }
        const newPrice = Math.max(0, Number((item.price * factor).toFixed(2)))
        return { ...item, price: newPrice }
      })
    )
    setShowPriceEditor(false)
    setFeedback({ type: 'success', message: 'تم تحديث الأسعار حسب الإعدادات' })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المنيو</h1>
            <p className="text-gray-600">تصميم وتحرير قائمة الطعام بسهولة</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowAddCategoryModal(true)} className="btn-secondary">
              <Copy className="w-4 h-4 ml-2" />
              إضافة تصنيف
            </button>
            <button onClick={() => setShowAddDishModal(true)} className="btn-primary">
              <Plus className="w-4 h-4 ml-2" />
              إضافة طبق جديد
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl border ${
              feedback.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

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
                  {menuItems.length
                    ? (menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن طبق..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
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

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card hover:shadow-lg transition-shadow group">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {renderItemVisual(item.image)}
                  </div>
                  {!item.availability && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">غير متوفر</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50"
                      onClick={() => {
                        setEditingItem(item)
                        setEditingBranchesText(formatBranches(item.branches))
                      }}
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50"
                      onClick={() => handleDeleteDish(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-primary-600 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {item.price} ر.ع
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>

                  <button
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.availability ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}
                    onClick={() => handleToggleAvailability(item.id)}
                  >
                    {item.availability ? 'تعطيل مؤقت' : 'تفعيل الطبق'}
                  </button>

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
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                            {renderItemVisual(item.image)}
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
                        <button
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                          onClick={() => handleToggleAvailability(item.id)}
                        >
                          {item.availability ? 'متوفر' : 'غير متوفر'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => {
                              setEditingItem(item)
                              setEditingBranchesText(formatBranches(item.branches))
                            }}
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => handleDuplicateDish(item)}
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => handleDeleteDish(item.id)}
                          >
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

        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">نسخ وتطبيق الأسعار</h3>
              <p className="text-blue-100">طبّق الأسعار على عدة فروع أو فئات دفعة واحدة</p>
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">صورة الطبق</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, 'new')}
                    className="hidden"
                    id="new-dish-image"
                  />
                  <label htmlFor="new-dish-image" className="cursor-pointer text-sm text-gray-600 flex flex-col items-center gap-2">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                    {newDish.image ? 'تم اختيار صورة للطبق' : 'اسحب وأفلت الصورة أو انقر للاختيار'}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الطبق *</label>
                <input
                  type="text"
                  value={newDish.name}
                  onChange={(event) => setNewDish({ ...newDish, name: event.target.value })}
                  className="input-field"
                  placeholder="مثال: برجر كلاسيك"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">التصنيف *</label>
                <select
                  value={newDish.category}
                  onChange={(event) => setNewDish({ ...newDish, category: event.target.value })}
                  className="input-field"
                >
                  {categories.filter((category) => category !== 'الكل').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">السعر (ر.ع) *</label>
                <input
                  type="number"
                  value={newDish.price}
                  onChange={(event) => setNewDish({ ...newDish, price: Number(event.target.value) })}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={newDish.description}
                  onChange={(event) => setNewDish({ ...newDish, description: event.target.value })}
                  rows={3}
                  className="input-field"
                  placeholder="وصف تفصيلي للطبق..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفروع المتاحة</label>
                <input
                  type="text"
                  value={newDish.branches}
                  onChange={(event) => setNewDish({ ...newDish, branches: event.target.value })}
                  className="input-field"
                  placeholder="مثال: مسقط، صلالة"
                />
                <p className="text-xs text-gray-500 mt-1">افصل الفروع بفاصلة (،)</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newDish.availability}
                  onChange={(event) => setNewDish({ ...newDish, availability: event.target.checked })}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  id="new-availability"
                />
                <label htmlFor="new-availability" className="text-sm font-semibold text-gray-700">
                  متوفر حالياً
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setShowAddDishModal(false)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleAddDish} className="btn-primary">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">اسم التصنيف *</label>
              <input
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                className="input-field"
                placeholder="مثال: مشروبات ساخنة"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setShowAddCategoryModal(false)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleAddCategory} className="btn-primary">
                <Plus className="w-4 h-4 ml-2" />
                إضافة التصنيف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dish Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">تعديل {editingItem.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الصورة</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, 'edit')}
                    className="hidden"
                    id="edit-dish-image"
                  />
                  <label htmlFor="edit-dish-image" className="cursor-pointer text-sm text-gray-600 flex flex-col items-center gap-2">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    تعديل الصورة
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الطبق</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(event) => setEditingItem({ ...editingItem, name: event.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">التصنيف</label>
                  <select
                    value={editingItem.category}
                    onChange={(event) => setEditingItem({ ...editingItem, category: event.target.value })}
                    className="input-field"
                  >
                    {categories.filter((category) => category !== 'الكل').map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">السعر</label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(event) => setEditingItem({ ...editingItem, price: Number(event.target.value) })}
                    className="input-field"
                  />
                </div>
                <div className="flex items-center gap-3 mt-6 md:mt-8">
                  <span className="text-sm font-semibold text-gray-700">متوفر؟</span>
                  <button
                    className="flex items-center gap-1 text-sm font-semibold text-primary-600"
                    onClick={() => setEditingItem({ ...editingItem, availability: !editingItem.availability })}
                  >
                    {editingItem.availability ? (
                      <>
                        <ToggleRight className="w-5 h-5" /> مفعل
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5" /> موقوف
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={editingItem.description}
                  onChange={(event) => setEditingItem({ ...editingItem, description: event.target.value })}
                  rows={3}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفروع</label>
                <input
                  type="text"
                  value={editingBranchesText}
                  onChange={(event) => setEditingBranchesText(event.target.value)}
                  className="input-field"
                  placeholder="مثال: مسقط، صلالة"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setEditingItem(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleSaveEditedDish} className="btn-primary">
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price Editor Modal */}
      {showPriceEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">محرر الأسعار الجماعي</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفئة المستهدفة</label>
                <select
                  value={priceEditorConfig.scope}
                  onChange={(event) =>
                    setPriceEditorConfig({ ...priceEditorConfig, scope: event.target.value })
                  }
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">نوع التعديل</label>
                  <select
                    value={priceEditorConfig.adjustment}
                    onChange={(event) =>
                      setPriceEditorConfig({
                        ...priceEditorConfig,
                        adjustment: event.target.value as 'increase' | 'decrease',
                      })
                    }
                    className="input-field"
                  >
                    <option value="increase">زيادة السعر</option>
                    <option value="decrease">تخفيض السعر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">النسبة المئوية</label>
                  <input
                    type="number"
                    value={priceEditorConfig.percentage}
                    onChange={(event) =>
                      setPriceEditorConfig({ ...priceEditorConfig, percentage: Number(event.target.value) })
                    }
                    className="input-field"
                    min={0}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                سيتم تطبيق التعديل على {priceEditorConfig.scope === 'الكل' ? 'جميع الأطباق' : `الأطباق ضمن فئة "${priceEditorConfig.scope}"`}
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setShowPriceEditor(false)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleApplyBulkPriceUpdate} className="btn-primary">
                تطبيق الأسعار
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
