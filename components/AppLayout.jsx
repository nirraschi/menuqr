
import Sidebar from './Sidebar'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AppLayout({ children }) {
    const { user, hasHydrated } = useUserStore()
    const router = useRouter()
    const [checkingAuth, setCheckingAuth] = useState(true)

    useEffect(() => {
        if (user === null) {
            router.push('/login')
        } else {
            setCheckingAuth(false)
        }
    }, [user, router])

    if (checkingAuth || !hasHydrated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Cargando...</p> 
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
        </div>
    )

}
