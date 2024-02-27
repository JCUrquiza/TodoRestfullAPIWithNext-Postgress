export const dynamic = 'force-dynamic';
// export const revalidate = 0;

import { redirect } from 'next/navigation';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

export default async function RestTodosPage() {

    const user = await getUserSessionServer();
    if ( !user ) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({
        where: { userID: user.id },
        orderBy: { description: 'asc' } 
    });
    
    return (

        <div>
            <span className='text-3xl mb-10'>Rest TODOS</span>
            <div className='w-full px-3 mx-5 mb-5'>
                <NewTodo />
            </div>

            <TodosGrid todos={todos} />
        </div>

    )
}
