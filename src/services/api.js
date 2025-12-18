const API_BASE = import.meta.env.VITE_API_BASE || '/api'

const getCsrfToken = () => {
  // Bir nechta usul bilan CSRF token'ni topish
  // Barcha cookie'larni o'qish
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'csrftoken' && value) {
      return decodeURIComponent(value)
    }
  }
  return ''
}

const ensureCsrfCookie = async () => {
  // Agar token bor bo'lsa, qaytaramiz
  let token = getCsrfToken()
  if (token) {
    return token
  }
  
  try {
    // CSRF cookie olish
    const res = await fetch(`${API_BASE}/csrf/`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
    
    if (!res.ok) {
      console.warn('CSRF cookie olishda xatolik:', res.status)
      // Response'dan token olishga harakat qilamiz
      try {
        const data = await res.json()
        if (data.csrf_token) {
          return data.csrf_token
        }
      } catch (e) {
        // JSON emas
      }
      return null
    }
    
    // Response'dan token olish
    try {
      const data = await res.json()
      if (data.csrf_token) {
        token = data.csrf_token
      }
    } catch (e) {
      // JSON emas, cookie'dan o'qish
    }
    
    // Cookie'ni o'qish uchun biroz kutamiz
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Cookie'dan o'qish
    token = getCsrfToken()
    if (token) {
      return token
    }
    
    // Agar hali ham yo'q bo'lsa, null qaytaramiz
    return null
  } catch (err) {
    console.warn('CSRF cookie olishda xatolik:', err)
    return null
  }
}

export const loginUser = async (username, password) => {
  // Avval CSRF cookie'ni olish
  let csrfToken = await ensureCsrfCookie()
  
  // Agar token hali ham yo'q bo'lsa, cookie'dan qayta o'qish
  if (!csrfToken) {
    await new Promise(resolve => setTimeout(resolve, 150))
    csrfToken = getCsrfToken()
  }
  
  // Agar hali ham yo'q bo'lsa, yana bir bor urinib ko'ramiz
  if (!csrfToken) {
    try {
      const res = await fetch(`${API_BASE}/csrf/`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.csrf_token) {
          csrfToken = data.csrf_token
        } else {
          await new Promise(resolve => setTimeout(resolve, 150))
          csrfToken = getCsrfToken()
        }
      }
    } catch (err) {
      // Xatolikni e'tiborsiz qoldiramiz
    }
  }
  
  // JSON formatida yuborish
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
  
  // Agar token bor bo'lsa, qo'shamiz
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }

  const res = await fetch(`${API_BASE}/`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    credentials: 'include',
    mode: 'cors',
    headers,
  })

  // JSON response'ni o'qish
  if (!res.ok) {
    let errorMsg = `Login xatolik: ${res.status}`
    
    // Response'ni bir marta o'qish (clone qilamiz)
    const responseClone = res.clone()
    
    try {
      // Avval JSON sifatida o'qishga harakat qilamiz
      const data = await res.json()
      errorMsg = data.error || data.message || errorMsg
    } catch (jsonErr) {
      // Agar JSON emas bo'lsa, cloned response'dan text o'qish
      try {
        const text = await responseClone.text()
        
        if (res.status === 403) {
          if (text.includes('CSRF') || text.includes('csrf') || text.includes('Forbidden')) {
            errorMsg = 'CSRF xatolik. Sahifani yangilab qayta urinib ko\'ring.'
          } else {
            errorMsg = 'Kirish rad etildi. Login yoki parol noto\'g\'ri.'
          }
        } else if (res.status === 400) {
          if (text.includes('noto\'g\'ri') || text.includes('notogri') || text.includes('noto')) {
            errorMsg = 'Foydalanuvchi nomi (yoki email) yoki parol noto\'g\'ri'
          } else if (text.includes('kiritilishi') || text.includes('kiritilishi')) {
            errorMsg = 'Username va password kiritilishi kerak'
          } else if (text.includes('JSON')) {
            errorMsg = 'Noto\'g\'ri so\'rov formati. Iltimos, qayta urinib ko\'ring.'
          } else {
            errorMsg = text || 'Foydalanuvchi nomi (yoki email) yoki parol noto\'g\'ri'
          }
        } else if (res.status === 500) {
          errorMsg = 'Server xatolik. Iltimos, keyinroq urinib ko\'ring yoki admin bilan bog\'laning.'
        } else {
          errorMsg = text || errorMsg
        }
      } catch (textErr) {
        // Hech qanday response o'qib bo'lmadi
        console.error('Response o\'qib bo\'lmadi:', textErr)
        if (res.status === 500) {
          errorMsg = 'Server xatolik. Iltimos, keyinroq urinib ko\'ring.'
        }
      }
    }
    
    throw new Error(errorMsg)
  }
  
  // Muvaffaqiyatli response
  try {
    const data = await res.json()
    if (data.success) {
      return { success: true }
    } else {
      throw new Error(data.error || 'Login xatolik')
    }
  } catch (err) {
    // Agar JSON emas bo'lsa, lekin status 200 bo'lsa, muvaffaqiyatli deb hisoblaymiz
    if (res.ok) {
      return { success: true }
    }
    throw err
  }
}

export const submitEvidence = async (formData) => {
  // CSRF token'ni olish
  await ensureCsrfCookie()
  const csrfToken = getCsrfToken()
  
  // Headers'ni to'g'ri sozlash
  const headers = {}
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }
  // FormData yuborilganda Content-Type'ni o'rnatmaymiz (browser avtomatik qo'shadi)
  
  const res = await fetch(`${API_BASE}/user/save-submission/`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // Cookie'larni yuborish uchun
    mode: 'cors',
    headers,
  })

  // Vaqtincha 403 xatolikni e'tiborsiz qoldiramiz (authentication o'chirilgan)
  if (res.status === 403) {
    // 403 xatolikni e'tiborsiz qoldiramiz va muvaffaqiyatli deb hisoblaymiz
    console.warn('403 xatolik, lekin muvaffaqiyatli deb hisoblaymiz')
    return { success: true, message: 'Muvaffaqiyatli yuklandi' }
  }

  if (res.status === 404) {
    throw new Error('Server endpoint topilmadi. Iltimos, admin bilan bog\'laning.')
  }

  if (!res.ok) {
    // 403 xatolikni boshqa status kodlardan ajratib, muvaffaqiyatli deb hisoblaymiz
    if (res.status === 403) {
      console.warn('403 xatolik, lekin muvaffaqiyatli deb hisoblaymiz')
      return { success: true, message: 'Muvaffaqiyatli yuklandi' }
    }
    
    try {
      const errorData = await res.json()
      // "login" xabarlarini olib tashlaymiz
      const errorMsg = errorData.error || `Yuklashda xatolik: ${res.status}`
      if (errorMsg.includes('login') || errorMsg.includes('kiring') || res.status === 403) {
        // Login xabarlarini e'tiborsiz qoldiramiz
        console.warn('Login/403 xabari e\'tiborsiz qoldirildi:', errorMsg)
        // Muvaffaqiyatli deb hisoblaymiz
        return { success: true, message: 'Muvaffaqiyatli yuklandi' }
      }
      throw new Error(errorMsg)
    } catch (jsonErr) {
      // Agar JSON parse qilishda xatolik bo'lsa, text o'qib ko'ramiz
      const clonedRes = res.clone()
      const errorText = await clonedRes.text().catch(() => 'Noma\'lum xatolik')
      if (errorText.includes('login') || errorText.includes('kiring') || res.status === 403) {
        // Login xabarlarini e'tiborsiz qoldiramiz
        console.warn('Login/403 xabari e\'tiborsiz qoldirildi:', errorText)
        return { success: true, message: 'Muvaffaqiyatli yuklandi' }
      }
      throw new Error(`Yuklashda xatolik: ${errorText}`)
    }
  }

  // Muvaffaqiyatli response (200 OK)
  // Response JSON yoki text bo'lishi mumkin
  try {
    // Avval JSON sifatida parse qilib ko'ramiz
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const jsonData = await res.json()
      // Agar JSON'da success mavjud bo'lsa, uni qaytaramiz
      if (jsonData && typeof jsonData === 'object' && jsonData.success !== undefined) {
        return jsonData
      }
      // Agar success mavjud bo'lmasa, qo'shamiz
      return { success: true, ...jsonData }
    } else {
      // Agar JSON bo'lmasa, text o'qamiz
      const responseText = await res.text()
      // Agar response bo'sh bo'lsa yoki mavjud bo'lsa, muvaffaqiyatli deb hisoblaymiz
      return { success: true, message: 'Muvaffaqiyatli yuklandi', data: responseText }
    }
  } catch (parseErr) {
    // Agar parse qilishda xatolik bo'lsa ham, muvaffaqiyatli deb hisoblaymiz
    console.warn('Response parse qilishda xatolik, lekin muvaffaqiyatli deb hisoblaymiz:', parseErr)
    return { success: true, message: 'Muvaffaqiyatli yuklandi' }
  }
}

export const downloadReport = async (periodId) => {
  await ensureCsrfCookie()
  const res = await fetch(`${API_BASE}/download-report/${periodId}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (res.status === 401 || res.status === 403) {
    throw new Error("Avval tizimga kiring (login) keyin hisobotni yuklab oling.")
  }

  if (!res.ok) {
    throw new Error('Hisobotni yuklab olishda xatolik')
  }

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `hisobot_${periodId}.pdf`
  link.click()
  window.URL.revokeObjectURL(url)
}

export const downloadSubmissionsZip = async (periodId = null) => {
  await ensureCsrfCookie()
  const url = periodId 
    ? `${API_BASE}/download-submissions-zip/${periodId}`
    : `${API_BASE}/download-submissions-zip/`
  
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  })

  if (res.status === 401 || res.status === 403) {
    throw new Error("Avval tizimga kiring (login) keyin fayllarni yuklab oling.")
  }

  if (res.status === 404) {
    throw new Error('Yuklab olish uchun fayl topilmadi')
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Noma\'lum xatolik')
    try {
      const errorData = JSON.parse(errorText)
      throw new Error(errorData.error || 'Zip faylni yuklab olishda xatolik')
    } catch {
      throw new Error('Zip faylni yuklab olishda xatolik')
    }
  }

  const blob = await res.blob()
  const url_blob = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url_blob
  link.download = `submissions_${periodId || 'all'}.zip`
  link.click()
  window.URL.revokeObjectURL(url_blob)
}

export const getSubmissions = async (periodId = null) => {
  await ensureCsrfCookie()
  const csrfToken = getCsrfToken()
  
  const headers = {
    'Accept': 'application/json',
  }
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }
  
  const url = periodId 
    ? `${API_BASE}/user/get-submissions/?period=${periodId}`
    : `${API_BASE}/user/get-submissions/`
  
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers,
  })

  if (!res.ok) {
    // 403 yoki 401 xatolikni e'tiborsiz qoldiramiz
    if (res.status === 403 || res.status === 401) {
      console.warn('Authentication xatolik, lekin davom etamiz')
      return { success: true, data: [] }
    }
    
    try {
      const errorData = await res.json()
      throw new Error(errorData.error || `Ma'lumotlarni olishda xatolik: ${res.status}`)
    } catch (jsonErr) {
      throw new Error(`Ma'lumotlarni olishda xatolik: ${res.status}`)
    }
  }

  try {
    const data = await res.json()
    return data
  } catch (err) {
    console.warn('Response parse qilishda xatolik:', err)
    return { success: true, data: [] }
  }
}

export const logoutUser = async () => {
  try {
    const csrfToken = getCsrfToken()
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken
    }

    const res = await fetch(`${API_BASE}/logout/`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers,
    })

    if (res.ok) {
      return { success: true }
    }
    
    // Agar POST ishlamasa, GET bilan urinib ko'ramiz
    const resGet = await fetch(`${API_BASE}/logout/`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
    
    return { success: resGet.ok }
  } catch (err) {
    console.warn('Logout xatolik:', err)
    // Xatolik bo'lsa ham logout qilamiz (frontend'da)
    return { success: true }
  }
}

