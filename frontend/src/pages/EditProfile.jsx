import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  FaArrowLeft, 
  FaCity, 
  FaMapMarkerAlt, 
  FaHome, 
  FaPhone, 
  FaStickyNote, 
  FaTimes, 
  FaSave, 
  FaLightbulb, 
  FaInfoCircle,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaVenusMars,
  FaCamera,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa'
import avatarImg from '../images/avatar.png'
import { getProfile, updateProfile } from '../api/auth'

function EditProfile() {
  const navigate = useNavigate()
  const { id } = useParams() // Get user ID from URL
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    area: '',
    streetAddress: '',
    phone: '',
    alternatePhone: '',
    instructions: ''
  })
  const [profileImage, setProfileImage] = useState(null) // For preview (base64)
  const [profileImageFile, setProfileImageFile] = useState(null) // For upload (File object)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Load user profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Get user ID from URL parameter
        if (!id) {
          console.log('❌ No user ID in URL, redirecting to login')
          navigate('/login')
          return
        }

        // Get user data from localStorage for verification
        const userData = localStorage.getItem('user')
        if (!userData) {
          console.log('❌ No user data found in localStorage, redirecting to login')
          navigate('/login')
          return
        }

        const user = JSON.parse(userData)
        
        // Verify URL ID matches logged-in user
        if (user.id !== parseInt(id)) {
          console.log('❌ User ID mismatch, redirecting to login')
          navigate('/login')
          return
        }
        
        console.log('✅ User authenticated:', {
          id: id,
          email: user.email,
          name: user.name || user.username,
          source: 'URL & localStorage'
        })

        // Fetch profile data using user ID
        console.log('📡 Fetching profile data for user ID:', id)
        const response = await getProfile(id)
        
        if (response.success && response.profile) {
          console.log('✅ Profile data loaded successfully:', {
            full_name: response.profile.full_name,
            email: response.profile.email,
            has_image: !!response.profile.profile_image
          })
          
          setFormData({
            fullName: response.profile.full_name || '',
            email: response.profile.email || '',
            dateOfBirth: response.profile.date_of_birth || '',
            gender: response.profile.gender || '',
            city: response.profile.city || '',
            area: response.profile.area || '',
            streetAddress: response.profile.street_address || '',
            phone: response.profile.phone || '',
            alternatePhone: response.profile.alternate_phone || '',
            instructions: response.profile.instructions || ''
          })
          // Set profile image if available
          if (response.profile.profile_image) {
            setProfileImage(response.profile.profile_image)
          }
        } else {
          console.log('⚠️ Profile data not found or invalid response')
          // If profile doesn't exist, set default values from localStorage
          setFormData({
            fullName: user.name || user.first_name || '',
            email: user.email || '',
            dateOfBirth: '',
            gender: '',
            city: '',
            area: '',
            streetAddress: '',
            phone: '',
            alternatePhone: '',
            instructions: ''
          })
        }
      } catch (err) {
        console.error('❌ Error loading profile:', err)
        // Only redirect if it's a 404 (user not found) or 401/403 (unauthorized)
        if (err.response?.status === 404 || err.response?.status === 401 || err.response?.status === 403) {
          console.log('❌ User not found or unauthorized, redirecting to login')
          localStorage.removeItem('user')
          navigate('/login')
          return
        }
        // For other errors (network issues, etc.), show error but don't redirect
        setError(err.message || 'Failed to load profile. Please try again.')
        // Set default values from localStorage as fallback
        const userData = localStorage.getItem('user')
        if (userData) {
          try {
            const user = JSON.parse(userData)
            setFormData({
              fullName: user.name || user.first_name || '',
              email: user.email || '',
              dateOfBirth: '',
              gender: '',
              city: '',
              area: '',
              streetAddress: '',
              phone: '',
              alternatePhone: '',
              instructions: ''
            })
          } catch (parseError) {
            console.error('Error parsing user data:', parseError)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [navigate, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store file object for upload
      setProfileImageFile(file)
      // Store base64 for preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      // Get user ID from URL
      if (!id) {
        console.log('❌ No user ID in URL, redirecting to login')
        navigate('/login')
        return
      }

      // Get user data from localStorage for verification
      const userData = localStorage.getItem('user')
      if (!userData) {
        console.log('❌ No user data found, redirecting to login')
        navigate('/login')
        return
      }

      const user = JSON.parse(userData)
      
      // Verify URL ID matches logged-in user
      if (user.id !== parseInt(id)) {
        console.log('❌ User ID mismatch, redirecting to login')
        navigate('/login')
        return
      }
      
      console.log('💾 Updating profile for user ID:', {
        id: id,
        email: user.email,
        has_image: !!profileImageFile,
        form_data: {
          full_name: formData.fullName,
          city: formData.city,
          phone: formData.phone
        }
      })

      // Prepare profile data
      const profileData = {
        user_id: id,
        authenticated_user_id: user.id, // SECURITY: Send logged-in user ID for authorization check
        email: user.email, // Add email for FormData compatibility
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        city: formData.city,
        area: formData.area,
        street_address: formData.streetAddress,
        phone: formData.phone,
        alternate_phone: formData.alternatePhone,
        instructions: formData.instructions
      }

      // Update profile (with image file if selected)
      console.log('📡 Sending update request to backend...')
      let response;
      try {
        response = await updateProfile(profileData, profileImageFile)
      } catch (err) {
        console.error('❌ Error updating profile:', err)
        // Only redirect if it's a 404 (user not found) or 401/403 (unauthorized)
        if (err.response?.status === 404 || err.response?.status === 401 || err.response?.status === 403) {
          console.log('❌ User not found or unauthorized, redirecting to login')
          localStorage.removeItem('user')
          navigate('/login')
          return
        }
        // For other errors, show error message but don't redirect
        setError(err.message || 'Failed to update profile. Please try again.')
        setSaving(false)
        return
      }
      
      if (response.success) {
        console.log('✅ Profile updated successfully:', response.profile)
        setSuccess(response.message || 'Profile updated successfully!')
        
        // Update localStorage with new user data if name changed
        if (response.profile && response.profile.full_name) {
          user.username = response.profile.full_name
          user.email = response.profile.email
          localStorage.setItem('user', JSON.stringify(user))
          console.log('💾 Updated user data in localStorage')
        }
        
        // Show success message and navigate after 2 seconds
        setTimeout(() => {
          console.log('🔄 Redirecting to dashboard...')
          navigate('/dashboard')
        }, 2000)
      } else {
        console.error('❌ Profile update failed:', response.message)
        setError(response.message || 'Failed to update profile')
        setSaving(false)
      }
    } catch (err) {
      // This catch block should not be reached if we handle errors in try block above
      // But keeping it as a safety net
      console.error('❌ Unexpected error:', err)
      setError(err.message || 'Failed to update profile. Please try again.')
      setSaving(false)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Main Content */}
      <main className="pt-32 lg:pt-24 pb-20 lg:pb-8">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBack}
                className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center hover:scale-105 hover:shadow-md transition-all duration-300"
              >
                <FaArrowLeft className="text-gray-700 dark:text-gray-200" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">Edit Profile</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 lg:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-primary-600" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <FaExclamationCircle />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <FaCheckCircle />
                      <span className="text-sm">{success}</span>
                    </div>
                  </div>
                )}

              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className="text-4xl text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                  </div>
                  <label htmlFor="profileImage" className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FaCamera className="text-white" />
                    <input 
                      type="file" 
                      id="profileImage" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Click camera icon to update photo</p>
              </div>

              {/* Personal Information Section */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">Personal Information</h2>
                
                {/* Full Name */}
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaUser className="inline text-gray-400 dark:text-gray-500 mr-2" />Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaEnvelope className="inline text-gray-400 dark:text-gray-500 mr-2" />Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                  />
                </div>

                {/* Date of Birth & Gender Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaCalendarAlt className="inline text-gray-400 dark:text-gray-500 mr-2" />Date of Birth
                    </label>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaVenusMars className="inline text-gray-400 dark:text-gray-500 mr-2" />Gender
                    </label>
                    <select 
                      id="gender" 
                      name="gender" 
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">Delivery Address</h2>

                {/* City Select */}
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaCity className="inline text-gray-400 dark:text-gray-500 mr-2" />City *
                  </label>
                  <select 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                  >
                    <option value="">Choose a city</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                {/* Area Select */}
                <div className="mb-4">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaMapMarkerAlt className="inline text-gray-400 dark:text-gray-500 mr-2" />Area *
                  </label>
                  <select 
                    id="area" 
                    name="area" 
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                  >
                    <option value="">Choose an area</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Shoni Akhra">Shoni Akhra</option>
                    <option value="Rajarbag">Rajarbag</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Banani">Banani</option>
                    <option value="Mohammadpur">Mohammadpur</option>
                  </select>
                </div>

                {/* Street Address */}
                <div className="mb-4">
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaHome className="inline text-gray-400 dark:text-gray-500 mr-2" />Street Address *
                  </label>
                  <textarea 
                    id="streetAddress" 
                    name="streetAddress" 
                    rows="4" 
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 69/1 Salam Mansion, Lalkhan Bazar"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300 resize-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <FaInfoCircle className="inline mr-1" />Include house number, road name, and landmarks
                  </p>
                </div>

                {/* Phone Numbers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Primary Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaPhone className="inline text-gray-400 dark:text-gray-500 mr-2" />Primary Phone *
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="01712345678"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>

                  {/* Alternate Phone Number */}
                  <div>
                    <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaPhone className="inline text-gray-400 dark:text-gray-500 mr-2" />Alternate Phone
                    </label>
                    <input 
                      type="tel" 
                      id="alternatePhone" 
                      name="alternatePhone" 
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      placeholder="01812345678"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaStickyNote className="inline text-gray-400 dark:text-gray-500 mr-2" />Delivery Instructions (Optional)
                  </label>
                  <textarea 
                    id="instructions" 
                    name="instructions" 
                    rows="3"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Ex: Ring the doorbell twice, leave at the gate"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaTimes />Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" />Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />Save Changes
                    </>
                  )}
                </button>
              </div>

              </form>
            )}
          </div>

          {/* Profile Guidelines */}
          <div className="bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 dark:from-primary-900/20 dark:via-primary-900/30 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 mt-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <FaLightbulb className="text-primary-600 dark:text-primary-400 mt-1 text-xl" />
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-300 mb-2">Profile Guidelines</h3>
                <ul className="text-sm text-primary-700 dark:text-primary-400 space-y-1">
                  <li>• Provide accurate personal information for account verification</li>
                  <li>• Upload a clear profile photo for better recognition</li>
                  <li>• Include complete house/apartment number and floor details in address</li>
                  <li>• Add nearby landmarks for easier delivery</li>
                  <li>• Ensure both phone numbers are active and reachable</li>
                  <li>• Double-check spelling of all information before saving</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default EditProfile
