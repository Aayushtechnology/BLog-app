import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from '../../api/authApi'

const VerifyOTP = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail')
    if (!storedEmail) {
      navigate('/forgot-password')
    } else {
      setEmail(storedEmail)
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await authApi.verifyOTP(email, otp)
      setSuccess(response.message)
      setTimeout(() => {
        navigate('/reset-password')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Verify OTP</h1>
        <p className="auth-subtitle">
          Enter the OTP sent to your email: <strong>{email}</strong>
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
              pattern="[0-9]{4}"
              maxLength="4"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="auth-switch">
          Didn't receive OTP? <Link to="/forgot-password">Resend OTP</Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP
