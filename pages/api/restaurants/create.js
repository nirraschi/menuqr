import { supabase } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
    if (req.method === 'POST') {

    const { name, description, image_url, address } = req.body

    if (!name) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    const { data, error } = await supabase
        .from('restaurants')
        .insert([{
            name,
            description,
            image_url,
            address,
        }])
        .select()
        .single()

    if (error) {
        console.error('Error al crear restaurante:', error)
        return res.status(500).json({ error: 'Error al crear restaurante' })
    }

    return res.status(200).json(data)

    } else {
        res.setHeader('Allow', ['POST'])
    res.status(201).json({ message: 'Restaurante creado' })
    }

}