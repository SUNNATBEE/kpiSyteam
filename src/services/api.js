const API_BASE = import.meta.env.VITE_API_BASE || '/api'

const getCsrfToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/)
  return match ? match[1] : ''
}

const ensureCsrfCookie = async () => {
  if (getCsrfToken()) return
  try {
    const res = await fetch(`${API_BASE}/csrf/`, {
      method: 'GET',
      credentials: 'include',
    })
    if (!res.ok) {
      console.warn('CSRF cookie olishda xatolik:', res.status)
    }
  } catch (err) {
    console.warn('CSRF cookie olishda xatolik:', err)
  }
}

export const loginUser = async (username, password) => {
  await ensureCsrfCookie()
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  const csrfToken = getCsrfToken()
  const headers = {}
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }

  const res = await fetch(`${API_BASE}/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
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

