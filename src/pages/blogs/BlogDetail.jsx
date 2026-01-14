import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { blogApi } from '../../api/blogApi'
import { useAuth } from '../../context/AuthContext'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    setLoading(true)
    try {
      const response = await blogApi.getBlogById(id)
      setBlog(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.deleteBlog(id)
        navigate('/blogs')
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete blog')
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p className="error-message">{error}</p>
        <Link to="/blogs" className="btn-primary">
          Back to Blogs
        </Link>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="error-container">
        <h2>Blog Not Found</h2>
        <Link to="/blogs" className="btn-primary">
          Back to Blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <Link to="/blogs" className="back-link">
          ← Back to Blogs
        </Link>
        {isAuthenticated() && (
          <div className="blog-detail-actions">
            <Link to={`/edit-blog/${blog._id}`} className="btn-edit">
              Edit Blog
            </Link>
            <button onClick={handleDelete} className="btn-delete">
              Delete Blog
            </button>
          </div>
        )}
      </div>

      <article className="blog-detail-content">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <h2 className="blog-detail-subtitle">{blog.subTitle}</h2>
        
        <div className="blog-detail-meta">
          {blog.createdAt && (
            <span className="blog-date">Published: {formatDate(blog.createdAt)}</span>
          )}
          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <span className="blog-date">Updated: {formatDate(blog.updatedAt)}</span>
          )}
        </div>

        <div className="blog-detail-description">
          {blog.description}
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
