import { supabase } from '@/utils/supabaseAdmin'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { email, password, phone, role, restaurant_id, full_name } = req.body

    if (!email || !password || !role ||!full_name) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    try {
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            full_name,
            phone,
            email_confirm: true,
        })
        if (authError) throw authError
        const userId = authUser.user.id

        // 2. Insertar el usuario en la tabla 'users'

        const { error: insertError } = await supabase
            .from('users')
            .insert({
                id: userId,
                full_name,
                email,
                role,
                restaurant_id: restaurant_id || null,
            })
            
            if (insertError) throw insertError

        res.status(201).json({ message: 'Usuario creado' })
    } catch (error) {
        console.log('Error al crear usuario: ', error)
        res.status(500).json({ message:  'Error al crear usuario', error: error.message })
    }
}