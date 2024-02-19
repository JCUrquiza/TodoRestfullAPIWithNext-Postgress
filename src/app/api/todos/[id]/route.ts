import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = params;

    const todo = await prisma?.todo.findFirst({ where: { id: id } });

    if ( !todo ) {
        return NextResponse.json({
            message: 'Todo no existe'
        }, { status: 404 });
    }

    return NextResponse.json(todo);

}



const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT(request: Request, { params }: Segments) {

    const { id } = params;

    const todo = await prisma?.todo.findFirst({ where: { id: id } });

    if ( !todo ) {
        return NextResponse.json({
            message: 'Todo no existe'
        }, { status: 404 });
    }

    try {

        const { complete, description, ...rest } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma?.todo.update({
            where: { id },
            data: { complete, description } 
        })

        return NextResponse.json(updatedTodo);
        
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {status: 400});
    }

}
