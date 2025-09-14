'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, User, Mail, Phone, FileText } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface CoreMember {
  id: number
  firstName: string
  lastName: string
  role: string
  bio?: string
  imageURL?: string
  email?: string
  phone?: string
  isActive: boolean
  displayOrder: number
}

export default function EditCoreMemberPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [coreMember, setCoreMember] = useState<CoreMember | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'Contributor' as 'Main' | 'Contributor',
    bio: '',
    email: '',
    phone: '',
    imageURL: '',
    displayOrder: 0,
    isActive: true
  })

  useEffect(() => {
    if (params.id) {
      fetchCoreMember()
    }
  }, [params.id])

  const fetchCoreMember = async () => {
    try {
      const response = await fetch(`/api/core-members/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCoreMember(data)
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          bio: data.bio || '',
          email: data.email || '',
          phone: data.phone || '',
          imageURL: data.imageURL || '',
          displayOrder: data.displayOrder,
          isActive: data.isActive
        })
      } else {
        alert('Core member not found')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error fetching core member:', error)
      alert('Failed to fetch core member')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    if (url) {
      setFormData(prev => ({
        ...prev,
        imageURL: url
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/core-members/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          displayOrder: parseInt(formData.displayOrder.toString()) || 0,
        }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        alert('Failed to update core member')
      }
    } catch (error) {
      console.error('Error updating core member:', error)
      alert('Failed to update core member')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading core member...</p>
        </div>
      </div>
    )
  }

  if (!coreMember) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Core member not found</p>
          <button
            onClick={() => router.push('/admin')}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Back to Admin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Core Member</h1>
            <p className="text-gray-600">Update {coreMember.firstName} {coreMember.lastName}'s information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Member Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-gray-900"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-gray-900"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Main' | 'Contributor' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                >
                  <option value="Main">Main (Founder/Director)</option>
                  <option value="Contributor">Contributor</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.role === 'Main' ? 'This member will be displayed as "Founder & Director" on the homepage' : 'This member will be displayed as "Contributor" on the homepage'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-gray-900"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Lower numbers appear first on homepage</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Status
                </label>
                <select
                  value={formData.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                >
                  <option value="active">Active (Visible on homepage)</option>
                  <option value="inactive">Inactive (Hidden from homepage)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-gray-900"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-900 text-gray-900"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Bio/Description
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none placeholder-gray-900 text-gray-900"
                  placeholder="Brief description of the member's role and background..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Profile Photo (Optional)
                </label>
                <ImageUpload onImageUpload={handleImageUpload} type="event" />
                {formData.imageURL && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Current Photo:</p>
                    <img 
                      src={formData.imageURL} 
                      alt="Member preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
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
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Core Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
