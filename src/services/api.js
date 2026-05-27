const BASE = 'https://69bbf31e0915748735babfd6.mockapi.io/Producto'

async function request(path = '', options = {}) {
  const url = path ? `${BASE}/${path}` : BASE

  const res = await fetch(url, options)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${text}`)
  }

  const data = await res.json()
  return data
}

export async function fetchProducts() {
  const data = await request('')
  // Normalizar tipos: precio -> number, stock -> integer
  return Array.isArray(data)
    ? data.map((p) => ({
        ...p,
        precio: typeof p.precio === 'string' ? parseFloat(p.precio.replace(',', '.')) : Number(p.precio),
        stock: Number(p.stock),
      }))
    : []
}

export default { fetchProducts }
