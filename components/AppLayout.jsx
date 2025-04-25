//  layout con sidebar + selector de restaurante

// components/AppLayout.jsx
import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
        </div>
    )
}
