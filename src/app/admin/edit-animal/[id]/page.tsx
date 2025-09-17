'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface Animal {
  id: number
  name: string
  type: 'DOG' | 'COW' | 'BIRD'
  age: number | null
  story: string
  isAvailable: boolean
  imageURL: string[]
  shelter: {
    id: number
    name: string
    city: {
      name: string
    }
  }
}

export default function EditAnimalPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [animal, setAnimal] = useState<Animal | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'DOG' as 'DOG' | 'COW' | 'BIRD',
    age: '',
    story: '',
    isAvailable: true,
    imageURL: [] as string[]
  })

  useEffect(() => {
    if (params.id) {
      fetchAnimal()
    }
  }, [params.id])

  const fetchAnimal = async () => {
    try {
      const response = await fetch(`/api/animals/${params.id}`)
      if (response.ok) {
        const animalData = await response.json()
        setAnimal(animalData)
        setFormData({
          name: animalData.name,
          type: animalData.type,
          age: animalData.age ? animalData.age.toString() : '',
          story: animalData.story,
          isAvailable: animalData.isAvailable,
          imageURL: animalData.imageURL || []
        })
      } else {
        alert('Animal not found')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error fetching animal:', error)
      alert('Failed to load animal details')
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    if (url) {
      setFormData(prev => ({
        ...prev,
        imageURL: [...prev.imageURL, url]
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageURL: prev.imageURL.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/animals/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
        }),
      })

      if (response.ok) {
        alert('Animal updated successfully!')
        router.push('/admin')
      } else {
        alert('Failed to update animal')
      }
    } catch (error) {
      console.error('Error updating animal:', error)
      alert('Failed to update animal')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading animal details...</p>
        </div>
      </div>
    )
  }

  if (!animal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Animal Not Found</h1>
          <button
            onClick={() => router.push('/admin')}
            className="text-teal-600 hover:text-teal-700"
          >
            ← Back to Admin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Edit Animal</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                    placeholder="Animal's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'DOG' | 'COW' | 'BIRD' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-medium"
                  >
                    <option value="DOG">Dog</option>
                    <option value="COW">Cow</option>
                    <option value="BIRD">Bird</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                    placeholder="Age in years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.isAvailable ? 'available' : 'adopted'}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'available' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black font-medium"
                  >
                    <option value="available">Available for Adoption</option>
                    <option value="adopted">Already Adopted</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Story *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                  placeholder="Tell the animal's rescue story..."
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Photos</h2>
              
              <ImageUpload
                onImageUpload={handleImageUpload}
                type="animal"
                category={formData.type.toLowerCase() as 'dogs' | 'cows' | 'birds'}
                className="mb-4"
              />

              {/* Display uploaded images */}
              {formData.imageURL.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Current Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.imageURL.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`${formData.name} ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
