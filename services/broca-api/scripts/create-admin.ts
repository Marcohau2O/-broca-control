import 'dotenv/config'
import bcrypt from 'bcryptjs'

import prisma from '../src/lib/prisma.js'

const adminSchema = {
    nombre: process.env.ADMIN_NAME,
    correo: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
}

async function main() {
    const { nombre, correo, password } = adminSchema

    if (!nombre || !correo || !password) {
        throw new Error('ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD son obligatorios',)
    }

    if (password.length < 12) {
        throw new Error('ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD son obligatorios')
    }

    const correoNormalizado = correo.trim().toLowerCase()
    
    const rolAdministrador = await prisma.rol.findUnique({
        where: {
            nombre: 'Administrador',
        }
    })

    if (!rolAdministrador) {
        throw new Error('No existe el rol Administrador. Ejecuta primero el seed.')
    }

    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            correo: correoNormalizado
        },
    })

    if (usuarioExistente) {
        console.log(`El usuario ${correoNormalizado} ya existe. No se realizaron cambios,`)
        return
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const usuario = await prisma.usuario.create({
        data: {
            nombre: nombre.trim(),
            correo: correoNormalizado,
            passwordHash,
            activo: true,
            rolId: rolAdministrador.id
        },
        select: {
            id: true,
            nombre: true,
            correo: true,
            activo: true,
            createdAt: true,
            rol: {
                select: {
                    nombre: true
                },
            },
        },
    })

    console.log('Administrador creado correctamente:')
    console.log(usuario)

}

main()
    .catch((error) => {
        console.error('Error al creando el administrador:')
        console.error(error)
        process.exitCode = 1
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    
