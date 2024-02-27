import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    try {

        await prisma.todo.deleteMany(); // Purgar la BBDD
        await prisma.user.deleteMany(); // Purgar la BBDD

        // Creamos un usuario
        const user = await prisma.user.create({
            data: {
                email: 'test1@google.com',
                password: bcrypt.hashSync('123456'),
                roles: ['admin', 'client', 'super-user'],
                todos: {
                    create: [
                        { description: 'Piedra del alma', complete: true },
                        { description: 'Piedra del poder' },
                        { description: 'Piedra del tiempo' },
                        { description: 'Piedra del espacio' },
                        { description: 'Piedra del realidad' },
                    ]
                }
            }
        })

        // await prisma.todo.createMany({
        //     data: [
        //         { description: 'Piedra del alma', complete: true },
        //         { description: 'Piedra del poder' },
        //         { description: 'Piedra del tiempo' },
        //         { description: 'Piedra del espacio' },
        //         { description: 'Piedra del realidad' },
        //     ]
        // })

        // const todo = await prisma.todo.create({
        //     data: { description: 'Piedra del Alma' }
        // });

        return NextResponse.json({
            message: 'Seed Executed'
        });
        
    } catch (error) {

        console.log(error);

        return NextResponse.json({
            error: 'Error during seed execution'
        }, { status: 505 });
        
    }

}
