import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const take = searchParams.get('take') ?? '10';
    const skip = searchParams.get('skip') ?? '0';
    if ( isNaN(Number(take)) ) {
        return NextResponse.json({
            message: 'Take tiene que ser un número'
        }, { status: 400 })
    }
    if ( isNaN(Number(skip)) ) {
        return NextResponse.json({
            message: 'Skip tiene que ser un número'
        }, { status: 400 })
    }

    const todos = await prisma?.todo.findMany({
        take: Number(take),
        skip: Number(skip)
    });

    return NextResponse.json({
        todos
    });

}
