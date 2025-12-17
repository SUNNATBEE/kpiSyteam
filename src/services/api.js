const API_BASE = import.meta.env.VITE_API_BASE || '/api'

const getCsrfToken = () => {
  // Bir nechta usul bilan CSRF token'ni topish
  const match1 = document.cookie.match(/csrftoken=([^;]+)/)
  const match2 = document.cookie.match(/csrftoken=([^;]+)/i)
  return match1 ? match1[1] : (match2 ? match2[1] : '')
}

const ensureCsrfCookie = async () => {
  // Agar token bor bo'lsa, qaytaramiz
  if (getCsrfToken()) {
    return getCsrfToken()
  }
  
  try {
    // CSRF cookie olish - bir necha marta urinib ko'ramiz
    for (let i = 0; i < 3; i++) {
      const res = await fetch(`${API_BASE}/csrf/`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
      
      if (!res.ok) {
        console.warn(`CSRF cookie olishda xatolik (${i + 1}/3):`, res.status)
        if (i < 2) {
          await new Promise(resolve => setTimeout(resolve, 200))
          continue
        }
        return null
      }
      
      // Cookie'ni o'qish uchun biroz kutamiz
      await new Promise(resolve => setTimeout(resolve, 150))
      
      const token = getCsrfToken()
      if (token) {
        return token
      }
    }
    
    console.warn('CSRF token cookie\'dan o\'qilmadi, barcha urinishlar tugadi')
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
    csrfToken = getCsrfToken()
  }
  
  // Agar hali ham yo'q bo'lsa, xatolik
  if (!csrfToken) {
    throw new Error('CSRF token olinmadi. Sahifani yangilab qayta urinib ko\'ring.')
  }
  
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  const headers = {
    'X-CSRFToken': csrfToken,
  }

  const res = await fetch(`${API_BASE}/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    mode: 'cors',
    headers,
  })

  if (res.status === 403) {
    const text = await res.text().catch(() => '')
    if (text.includes('CSRF') || text.includes('csrf')) {
      throw new Error('CSRF xatolik. Sahifani yangilab qayta urinib ko\'ring.')
    }
    throw new Error('Kirish rad etildi. Login yoki parol noto\'g\'ri.')
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    if (text.includes('noto\'g\'ri') || text.includes('notogri')) {
      throw new Error('Foydalanuvchi nomi yoki parol noto\'g\'ri')
    }
    throw new Error(`Login xatolik: ${res.status}`)
  }

  // Django redirect qaytaradi, biz HTML olamiz
  const html = await res.text()
  // Muvaffaqiyatli login bo'lsa, redirect URL'ni topish
  if (html.includes('admin') || html.includes('user') || html.includes('validator')) {
    return { success: true, html }
  }

  return { success: true, html }
}

export const submitEvidence = async (formData) => {
  await ensureCsrfCookie()
  const res = await fetch(`${API_BASE}/user/save-submission/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCsrfToken(),
    },
  })

  if (res.status === 403) {
    throw new Error('Avval tizimga kiring (login) keyin dalil yuklang.')
  }

  if (res.status === 404) {
    throw new Error('Server endpoint topilmadi. Iltimos, admin bilan bog\'laning.')
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Noma\'lum xatolik')
    throw new Error(`Yuklashda xatolik: ${errorText}`)
  }

  return res.text()
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

