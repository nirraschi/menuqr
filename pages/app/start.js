//Inicio
import React from 'react'

const start = () => {
    return (
        <div>
            <h1>Bienvenido</h1>
            <h3>Nombre Restaurante</h3>
            <div className='flex flex-col w-full items-start mt-4'>
                <button>Ver menú Online</button>
                <button>Copiar Link</button>
                <button>Ver Código QR</button>
                <button>Editar Menú</button>
                <button>Soporte 24/7</button>

            </div>

        </div>
    )
}

export default start