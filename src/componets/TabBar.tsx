'use client';

import { useState } from 'react';

interface Props {
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {

    const [selected, setSelected] = useState(currentTab);

    const onTabSelected = ( tab: number ) => {
        setSelected(tab);
    }

    return (

        <div className={`
            grid w-full space-x-2 rounded-xl bg-gray-200 p-2
            ${ 'grid-cols-' + tabOptions.length }
        `}>

            {
                tabOptions.map( tab => (
                    <div key={tab}>
                        <input 
                            className="peer hidden"
                            id={ tab.toString() }
                            type="radio"
                            checked={ selected === tab }
                            onChange={ () => {} }
                        />
                        <label
                            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                            onClick={ () => onTabSelected(tab) }
                        >
                            { tab }
                        </label>
                    </div>
                ))
            }
  
        </div>
    )

}