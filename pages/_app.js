// pages/_app.js
import AppLayout from '@/components/AppLayout'
import '@/styles/globals.css'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {

    const { user } = useUserStore()
    const router = useRouter()
    const [isReady, setIsReady] = useState(false)


    useEffect(() => {
        const rehydrate = async () => {
            await new Promise((resolve) => setTimeout(resolve, 0)) // esperamos al siguiente tick del event loop
            setIsReady(true)
        }
        rehydrate()
    }, [])


    useEffect(() => {
        if(!isReady) return;

        const isProtectedRoute = router.pathname.startsWith('/app')

        if(isProtectedRoute && !user) {
            router.push('/login')
        }
    }, [router, user, isReady])

    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Cargando...</p>
            </div>
        )
    }
    const isAppRoute = router.pathname.startsWith('/app')

    if (isAppRoute) {
        return (
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        )
    }

    return <Component {...pageProps} />
}