'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Edit3 } from 'lucide-react'

interface Event {
  id: number
  name: string
  description: string
  date: string
  imageURL?: string
  location: string
  eventType: string
  article?: string
  city: {
    name: string
    state: string
  }
}

export default function EventArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [article, setArticle] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setEvent(data)
          setArticle(data.article || '')
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

  const handleSave = async () => {
    if (!event) return

    setSaving(true)
    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          article: article
        }),
      })

      if (response.ok) {
        alert('Event article saved successfully!')
        // Update local state
        setEvent({ ...event, article: article })
      } else {
        alert('Failed to save article')
      }
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Failed to save article')
    } finally {
      setSaving(false)
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
              <h1 className="text-3xl font-bold text-gray-800">Event Article</h1>
              <p className="text-gray-600">{event.name}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Article
              </>
            )}
          </button>
        </div>

        {/* Article Editor */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Edit3 className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Write Event Report</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Event Report/Article
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Write a detailed report about how the event went, what was accomplished, 
              and any highlights or outcomes. This will be visible to visitors on the event detail page.
            </p>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none placeholder-gray-900"
              placeholder="Write your event report here... 

Example:
Our Tree Plantation Day was a huge success! Over 50 volunteers joined us to plant 150 native trees around our shelter. The community came together beautifully, and we created a greener environment for our rescued animals. The event was covered by local media, and we received positive feedback from all participants. We plan to make this an annual event."
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {article.length} characters
            </div>
            <div className="text-sm text-gray-500">
              {article.split('\n').length} lines
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {article && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article}</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Writing Tips</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Include key statistics (number of participants, animals helped, etc.)</li>
            <li>• Mention any special highlights or memorable moments</li>
            <li>• Describe the impact and outcomes of the event</li>
            <li>• Thank volunteers and participants</li>
            <li>• Mention any future plans or follow-up events</li>
            <li>• Keep it engaging and positive</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
