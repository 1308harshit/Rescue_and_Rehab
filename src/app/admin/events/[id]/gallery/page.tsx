'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Upload, X, Edit, Trash2, Eye, Plus, Save, ArrowLeft, Camera } from 'lucide-react'
import Image from 'next/image'

interface Event {
  id: number
  name: string
  gallery: {
    id: number
    mediaType: string
    url: string
    caption?: string
    altText?: string
    isFeatured: boolean
    order: number
  }[]
}

interface GalleryItem {
  id?: number
  mediaType: 'IMAGE' | 'VIDEO'
  url: string
  caption?: string
  altText?: string
  isFeatured: boolean
  order: number
}

export default function EventGalleryPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    mediaType: 'IMAGE' as 'IMAGE' | 'VIDEO',
    caption: '',
    altText: '',
    isFeatured: false,
    order: 0,
    url: ''
  })

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setEvent(data)
        }
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'event')
      formData.append('category', 'gallery')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setUploadData({ ...uploadData, url: data.url })
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadData.url) {
      alert('Please upload a file first')
      return
    }

    try {
      const response = await fetch(`/api/events/${params.id}/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })

      if (response.ok) {
        // Refresh event data
        const eventResponse = await fetch(`/api/events/${params.id}`)
        if (eventResponse.ok) {
          const eventData = await eventResponse.json()
          setEvent(eventData)
        }
        setShowUploadForm(false)
        setUploadData({
          mediaType: 'IMAGE',
          caption: '',
          altText: '',
          isFeatured: false,
          order: 0,
          url: ''
        })
      } else {
        alert('Failed to add gallery item')
      }
    } catch (error) {
      console.error('Error adding gallery item:', error)
      alert('Failed to add gallery item')
    }
  }

  const handleUpdateGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem?.id) return

    try {
      const response = await fetch(`/api/events/${params.id}/gallery/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      })

      if (response.ok) {
        // Refresh event data
        const eventResponse = await fetch(`/api/events/${params.id}`)
        if (eventResponse.ok) {
          const eventData = await eventResponse.json()
          setEvent(eventData)
        }
        setEditingItem(null)
      } else {
        alert('Failed to update gallery item')
      }
    } catch (error) {
      console.error('Error updating gallery item:', error)
      alert('Failed to update gallery item')
    }
  }

  const handleDeleteGalleryItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    try {
      const response = await fetch(`/api/events/${params.id}/gallery/${itemId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh event data
        const eventResponse = await fetch(`/api/events/${params.id}`)
        if (eventResponse.ok) {
          const eventData = await eventResponse.json()
          setEvent(eventData)
        }
      } else {
        alert('Failed to delete gallery item')
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      alert('Failed to delete gallery item')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-red-600 hover:text-red-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 hover:bg-gray-200 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Event Gallery</h1>
              <p className="text-gray-600">{event.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Media
          </button>
        </div>

        {/* Gallery Grid */}
        {event.gallery && event.gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {event.gallery
              .sort((a, b) => a.order - b.order)
              .map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={item.url}
                    alt={item.altText || item.caption || 'Event media'}
                    fill
                    className="object-cover"
                  />
                  {item.mediaType === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                  {item.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {item.caption && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.caption}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingItem({
                        id: item.id,
                        mediaType: item.mediaType as 'IMAGE' | 'VIDEO',
                        url: item.url,
                        caption: item.caption || '',
                        altText: item.altText || '',
                        isFeatured: item.isFeatured,
                        order: item.order
                      })}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center justify-center"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center justify-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Gallery Items</h3>
            <p className="text-gray-500 mb-6">Start building your event gallery by adding photos and videos.</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              Add First Media
            </button>
          </div>
        )}

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Gallery Item</h3>
              <form onSubmit={handleAddGalleryItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Media Type</label>
                  <select
                    value={uploadData.mediaType}
                    onChange={(e) => setUploadData({...uploadData, mediaType: e.target.value as 'IMAGE' | 'VIDEO'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  >
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Upload File</label>
                  <input
                    type="file"
                    accept={uploadData.mediaType === 'IMAGE' ? 'image/*' : 'video/*'}
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                  {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Caption</label>
                  <input
                    type="text"
                    value={uploadData.caption}
                    onChange={(e) => setUploadData({...uploadData, caption: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={uploadData.altText}
                    onChange={(e) => setUploadData({...uploadData, altText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={uploadData.order}
                    onChange={(e) => setUploadData({...uploadData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={uploadData.isFeatured}
                    onChange={(e) => setUploadData({...uploadData, isFeatured: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isFeatured" className="text-sm text-gray-900">Featured Item</label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Form Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Gallery Item</h3>
              <form onSubmit={handleUpdateGalleryItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Caption</label>
                  <input
                    type="text"
                    value={editingItem.caption}
                    onChange={(e) => setEditingItem({...editingItem, caption: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={editingItem.altText}
                    onChange={(e) => setEditingItem({...editingItem, altText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({...editingItem, order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editIsFeatured"
                    checked={editingItem.isFeatured}
                    onChange={(e) => setEditingItem({...editingItem, isFeatured: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="editIsFeatured" className="text-sm text-gray-900">Featured Item</label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
