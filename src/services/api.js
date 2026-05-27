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

export async function createProduct(product) {
  return request('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export async function updateProduct(id, product) {
  try {
    return await request(id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  } catch (err) {
    // Si la petición PATCH falla por red/CORS, reintentar con PUT (algunos endpoints prefieren PUT)
    if (err && /Failed to fetch/i.test(String(err.message || ''))) {
      return request(id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
    }

    throw err
  }
}

export async function deleteProduct(id) {
  return request(id, {
    method: 'DELETE',
  })
}

export default { fetchProducts, createProduct, updateProduct, deleteProduct }
