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
            <span className='text-1xl'>{ session?.user?.name }</span>
            <span className='text-1xl'>{ session?.user?.email }</span>
        </div>
    )

}
