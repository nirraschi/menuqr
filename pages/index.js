'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'


export default function Home() {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            const { data, error } = await supabase
                .from('restaurants')
                .select('*')

            if (error) console.error(error)
            else setRestaurants(data)
        }

        fetchRestaurants()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Restaurantes</h1>
            <ul>
                {restaurants.map(r => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        </div>
    )
}
