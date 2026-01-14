import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogApi } from '../../api/blogApi'
import { useAuth } from '../../context/AuthContext'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await blogApi.getAllBlogs()
      setBlogs(response.blogs || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog._id !== id))
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete blog')
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    )
  }

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h1 className="page-title">All Blogs</h1>
        {isAuthenticated() && (
          <Link to="/create-blog" className="btn-primary">
            Create New Blog
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blogs found. Be the first to create one!</p>
          {isAuthenticated() && (
            <Link to="/create-blog" className="btn-primary">
              Create Blog
            </Link>
          )}
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="blog-card-content">
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-subtitle">{blog.subTitle}</p>
                <p className="blog-card-description">
                  {blog.description?.substring(0, 150)}
                  {blog.description?.length > 150 ? '...' : ''}
                </p>
                {blog.createdAt && (
                  <p className="blog-card-date">{formatDate(blog.createdAt)}</p>
                )}
              </div>
              <div className="blog-card-actions">
                <Link to={`/blogs/${blog._id}`} className="btn-secondary">
                  Read More
                </Link>
                {isAuthenticated() && (
                  <>
                    <Link to={`/edit-blog/${blog._id}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
