import { supabase } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { mail, password, phone, role, restaurant_id, full_name } = req.body

    if (!mail || !password || !role || !full_name) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    try {
        // 1. Crear el usuario en Supabase Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: mail,
            password,
            phone,
            email_confirm: true,
            user_metadata: {
                full_name,
                role,
            },
        })

        if (authError) throw authError

        const userId = authUser.user.id

        // 2. Insertar en la tabla 'users'
        const { error: insertError } = await supabase
            .from('users')
            .insert({
                id: userId,
                full_name,
                mail,
                phone,
                role,
                restaurant_id: restaurant_id || null,
            })

        if (insertError) throw insertError

        res.status(201).json({ message: 'Usuario creado correctamente' })
    } catch (error) {
        console.error('Error al crear usuario: ', error)
        res.status(500).json({ message: 'Error al crear usuario', error: error.message })
    }
}
