import { supabase } from "@/lib/supabaseAdmin"; 

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })


    const {data, error} = await supabase.from('users') .select(`
        id,
        full_name,
        mail,
        phone,
        role,
        restaurant:restaurant_id (
        id,
        name
        )
        `)

    if (error) return res.status(500).json({ error: error.message })
    
        res.status(200).json(data)


    }
