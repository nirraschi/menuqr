import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        // Simulamos que el usuario ya está autenticado
        router.replace('/app/admin/restaurants')
    }, [])

    return null
}
