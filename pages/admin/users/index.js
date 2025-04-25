import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UsersList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users')
            const data = await res.json()
            setUsers(data)
        }
        fetchUsers()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <Link href="/admin/users/create" className="text-blue-600 underline mb-4 block">+ Crear nuevo usuario</Link>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Rol</th>
                        <th className="border p-2">Restaurante</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="border p-2">{u.full_name}</td>
                            <td className="border p-2">{u.mail}</td>
                            <td className="border p-2">{u.role}</td>
                            <td className="border p-2">{u.restaurant_id ?? 'No asignado'}</td>
                            <td className="border p-2">
                                <Link href={`/admin/users/${u.id}`} className="text-blue-500 underline">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}