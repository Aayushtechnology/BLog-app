import api from './config'

export const blogApi = {
  getAllBlogs: async () => {
    const response = await api.get('/blogs')
    return response.data
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  },

  createBlog: async (blogData) => {
    const response = await api.post('/blog', {
      title: blogData.title,
      subTitle: blogData.subTitle,
      description: blogData.description,
    })
    return response.data
  },

  updateBlog: async (id, blogData) => {
    const response = await api.patch(`/blogs/${id}`, {
      title: blogData.title,
      subTitle: blogData.subTitle,
      description: blogData.description,
    })
    return response.data
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`)
    return response.data
  },
}
