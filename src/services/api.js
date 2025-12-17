const API_BASE = import.meta.env.VITE_API_BASE || '/api'

const getCsrfToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/)
  return match ? match[1] : ''
}

const ensureCsrfCookie = async () => {
  if (getCsrfToken()) return
  await fetch(`${API_BASE}/csrf/`, {
    method: 'GET',
    credentials: 'include',
  })
}

export const loginUser = async (username, password) => {
  await ensureCsrfCookie()
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  const res = await fetch(`${API_BASE}/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCsrfToken(),
    },
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  return res.text()
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

  if (!res.ok) {
    throw new Error('Submit failed')
  }

  return res.text()
}

export const downloadReport = (periodId) => {
  const url = `${API_BASE}/download-report/${periodId}`
  window.open(url, '_blank', 'noopener')
}

