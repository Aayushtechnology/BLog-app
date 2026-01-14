import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { blogApi } from '../../api/blogApi'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      await blogApi.createBlog(formData)
      navigate('/blogs')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blog-form-container">
      <div className="blog-form-header">
        <h1 className="page-title">Create New Blog</h1>
        <Link to="/blogs" className="back-link">
          ← Back to Blogs
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
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
          <Link to="/blogs" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
