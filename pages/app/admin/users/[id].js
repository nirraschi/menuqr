import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { supabase as supabaseClient } from '@/lib/supabaseClient'
import { supabase as supabaseAdmin } from '@/lib/supabaseAdmin'


const EditUser = ({ user, restaurants }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        full_name: user.full_name || '',
        mail: user.mail || '',
        phone: user.phone || '',
        role: user.role || 'user',
        restaurant_id: user.restaurant_id || null,
    })

    useEffect(() => {
        setFormData({
            full_name: user.full_name,
            mail: user.mail,
            phone: user.phone,
            role: user.role,
            restaurant_id: user.restaurant_id,
        })
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabaseClient
            .from('users')
            .update({
                full_name: formData.full_name,
                mail: formData.mail,
                phone: formData.phone,
                role: formData.role,
                restaurant_id: formData.restaurant_id,
            })
            .eq('id', user.id)

        if (error) {
            console.error(error)
            return
        }

        router.push('/app/admin/users') // Redirigir a la lista de usuarios
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="full_name" className="mb-1 text-gray-600">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="mail" className="mb-1 text-gray-600">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1 text-gray-600">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="role" className="mb-1 text-gray-600">
                        Rol
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="restaurant_id" className="mb-1 text-gray-600">
                        Restaurante
                    </label>
                    <select
                        id="restaurant_id"
                        name="restaurant_id"
                        value={formData.restaurant_id || ''}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Sin asignar</option>
                        {restaurants.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        return { notFound: true }
    }


    const { data: restaurants, error: restaurantsError } = await supabaseAdmin
        .from('restaurants')
        .select('id, name')

    if (error || restaurantsError) {
        return { notFound: true }
    }

    return {
        props: { user, restaurants },
    }
}

export default EditUser
