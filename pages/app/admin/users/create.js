import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateUserPage() {
    const [form, setForm] = useState({
        mail: '',
        password: '',
        phone: '',
        role: 'user',
        full_name: '',
        restaurant_id: '',
    })

    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()

    //obtener restaaurantes para asignar
    useEffect(() => {
        async function fetchRestaurants() {
            const res = await fetch('/api/restaurants')
            const data = await res.json()
            setRestaurants(data)
        }
        fetchRestaurants()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const res = await fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
            const data = await res.json()

            if (res.ok) {
                setMessage('Usuario creado con éxito.')

                setForm({
                    mail: '',
                    password: '',
                    phone: '',
                    role: 'user',
                    full_name: '',
                    restaurant_id: '',
                })
            } else {
                setMessage(` Error: ${data.message}`)
            }
        } catch (error) {
            setMessage(` Error: ${error.message}`)
        }
        finally {
            setLoading(false)
        }
        router.push('/app/admin/users')
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear nuevo usuario</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    name="mail"
                    placeholder="Email"
                    value={form.mail}
                    onChange={handleChange}
                    required
                />

                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    name="full_name"
                    placeholder="Nombre completo"
                    value={form.full_name}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                />

                <select
                    className="w-full p-2 border rounded"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                </select>

                <select
                    className="w-full p-2 border rounded"
                    name="restaurant_id"
                    value={form.restaurant_id}
                    onChange={handleChange}
                >
                    <option value="">Sin restaurante asignado</option>
                    {restaurants.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Crear usuario'}
                </button>
            </form>

            {message && <p className="mt-4">{message}</p>}
        </div>
    )
}
