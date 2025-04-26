import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            const res = await fetch('/api/restaurants')
            const data = await res.json()
            setRestaurants(data)
        }
        fetchRestaurants()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Restaurantes</h1>
            <Link href="/app/admin/restaurants/create" className="text-blue-600 underline mb-4 block">+ Crear nuevo restaurante</Link>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Descripción</th>
                        <th className="border p-2">Dirección</th>
                        <th className="border p-2">Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((r) => (
                        <tr key={r.id}>
                            <td className="border p-2">{r.name}</td>
                            <td className="border p-2">{r.description}</td>
                            <td className="border p-2">{r.address}</td>
                            <td className="border p-2">
                                <Link href={`/app/admin/restaurants/${r.id}`} className="text-blue-500 underline">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}