import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { supabase as supabaseClient } from '@/lib/supabaseClient'
import { supabase as supabaseAdmin } from '@/lib/supabaseAdmin'


const EditRestaurant = ({ restaurant }) => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: restaurant.name || '',
        description: restaurant.description || '',
        address: restaurant.address || '',
        image_url: restaurant.image_url || '',
    })

    useEffect(() => {
        setFormData({
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        image_url: restaurant.image_url
        })
    }, [restaurant])

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
            .from('restaurants')
            .update({
                name: formData.name,
                description: formData.description,
                address: formData.address,
                image_url: formData.image_url,
            })
            .eq('id', restaurant.id)

        if (error) {
            console.error(error)
            return
        }

        router.push('/app/admin/restaurants') // Redirigir a la lista de usuarios
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 text-gray-600">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 text-gray-600">
                        Descripcion
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1 text-gray-600">
                        Dirección
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="role" className="mb-1 text-gray-600">
                        Link de la imagen
                    </label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

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

    const { data: restaurant, error } = await supabaseAdmin
        .from('restaurants')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        return { notFound: true }
    }


    return {
        props: { restaurant },
    }
}

export default EditRestaurant
