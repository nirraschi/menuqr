import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { House, Pencil, Settings, LogOut, ShieldUser, ChevronRight } from 'lucide-react'

import { useUserStore } from '@/store/userStore'

export default function Sidebar() {
    const router = useRouter()
    const { user } = useUserStore()
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [adminOpen, setAdminOpen] = useState(false)

    const role = user?.role

    useEffect(() => {
        if (role === 'admin') {
            const fetchRestaurants = async () => {
                const { data, error } = await supabase
                    .from('restaurants')
                    .select('id, name')
                if (!error) setRestaurants(data)
            }
            fetchRestaurants()
        }
    }, [role])

    const handleRestaurantChange = (e) => {
        const id = e.target.value
        const restaurant = restaurants.find((r) => r.id === id)
        setSelectedRestaurant(restaurant)
        // Acá podrías guardar en context o en localStorage
    }

    const menu = [
        { href: '/app/start', label: 'Inicio', icon: <House className="w-5 h-5 mr-4 text-red-400" /> },
        { href: '/app/menu', label: 'Editar menú', icon: <Pencil className="w-5 h-5 mr-4 text-red-400" /> },
        { href: '/app/settings', label: 'Configurar', icon: <Settings className="w-5 h-5 mr-4 text-red-400" /> },
    ]


    return (
        <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between min-h-screen">
            <div>
                <h2 className="text-xl font-bold mb-4">Mi Menú</h2>
                {role === 'admin' && <p>{user.email}</p>}
                <p>{role}</p>

                <nav className="space-y-2">
                    {menu.map((item) => (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-start p-2 rounded hover:bg-gray-700 ${router.pathname === item.href ? 'bg-gray-700' : ''
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                    {role === 'admin' && (
                        <div>
                            <button
                                onClick={() => setAdminOpen(!adminOpen)}
                                className="flex items-center justify-start p-2 rounded hover:bg-gray-700 w-full"
                            >
                                <ShieldUser className="w-5 h-5 mr-4 text-red-400" />
                                Administrar
                                <ChevronRight className={`w-5 h-5 ml-2 text-gray-400 ${adminOpen ? 'rotate-90' : ''}`} />
                            </button>
                            {adminOpen && (
                                <div className="ml-8 mt-1 space-y-1 text-sm">
                                    <Link href="/app/admin/restaurants" className='flex items-center justify-start p-2 rounded hover:bg-gray-700'>Restaurantes</Link>
                                    <Link href="/app/admin/users" className='flex items-center justify-start p-2 rounded hover:bg-gray-700'>Usuarios</Link>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>

            <div className="mt-8">
                {role === 'admin' ? (
                    <div>
                        <label className="block mb-1 text-sm">Restaurante:</label>
                        <select
                            value={selectedRestaurant?.id || ''}
                            onChange={handleRestaurantChange}
                            className="w-full text-black p-2 rounded"
                        >
                            <option value="">Seleccionar</option>
                            {restaurants.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <p className="text-sm">🍽️ {selectedRestaurant?.name}</p>
                )}

                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        useUserStore.getState().logout()
                        router.push('/login')
                    }}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 p-2 rounded text-sm flex items-center justify-start gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    <p>Cerrar sesión</p>
                </button>
            </div>
        </aside>
    )
}
