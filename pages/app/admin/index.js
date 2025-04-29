import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        // Simulamos que el usuario ya está autenticado
        router.replace('/app/admin/restaurants')
    }, [])

    return null
}
