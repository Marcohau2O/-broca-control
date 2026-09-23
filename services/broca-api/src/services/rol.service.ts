import prisma from '../lib/prisma.js'

export async function getRoles() {
    return prisma.rol.findMany({
        where: {
            activo: true,
        },
        orderBy: {
            nombre: 'asc',
        },
        select: {
            id: true,
            nombre: true,
            descripcion: true,
            activo: true,
        },
    })
}