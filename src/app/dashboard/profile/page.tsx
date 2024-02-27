'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {

    const { data: session } = useSession();

    useEffect(() => {
        console.log('Client side');
    }, []);

    return (
        <div className='flex flex-col'>
            <span className='text-1xl'>{ session?.user?.id ?? 'No Id' }</span>
            <span className='text-1xl'>{ session?.user?.name ?? 'No Name' }</span>
            <span className='text-1xl'>{ session?.user?.email ?? 'No Email' }</span>
            <span className='text-1xl'>{ session?.user?.image ?? 'No Image' }</span>
            <span className='text-1xl'>{ session?.user?.roles?.join(', ') ?? 'User' }</span>
        </div>
    )

}
