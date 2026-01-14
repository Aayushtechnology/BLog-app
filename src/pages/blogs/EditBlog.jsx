import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { blogApi } from '../../api/blogApi'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    setFetchLoading(true)
    try {
      const response = await blogApi.getBlogById(id)
      setFormData({
        title: response.data.title,
        subTitle: response.data.subTitle,
        description: response.data.description,
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.subTitle.trim() || !formData.description.trim()) {
      setError('All fields are required')
      return
    }

    setLoading(true)

    try {
      await blogApi.updateBlog(id, formData)
      navigate(`/blogs/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    )
  }

  return (
    <div className="blog-form-container">
      <div className="blog-form-header">
        <h1 className="page-title">Edit Blog</h1>
        <Link to={`/blogs/${id}`} className="back-link">
          ← Back to Blog
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subTitle">Subtitle *</label>
          <input
            type="text"
            id="subTitle"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            required
            placeholder="Enter blog subtitle"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter blog description"
            rows="10"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Blog'}
          </button>
          <Link to={`/blogs/${id}`} className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditBlog
