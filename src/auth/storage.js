const STORAGE_KEY = 'prueba-tecnica-user'

export function getStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  const rawUser = window.localStorage.getItem(STORAGE_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function saveUser(user) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  window.localStorage.removeItem(STORAGE_KEY)
}