// pages/_app.js
import AppLayout from '@/components/AppLayout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const isAppRoute = router.pathname.startsWith('/app')

    // Si estamos en una ruta dentro de /app, usamos el layout
    if (isAppRoute) {
        return (
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        )
    }

    // En rutas públicas o de login, sin layout
    return <Component {...pageProps} />
}
