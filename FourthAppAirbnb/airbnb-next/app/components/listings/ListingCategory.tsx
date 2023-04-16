

import React from 'react'
import { IconType } from 'react-icons'



interface ListingCategoryProps {
    icon: IconType,
    label: string,
    categoryDescription?: string  
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon: Icon,
    label,
    categoryDescription,
    

}) => {
    
  return (
    <div
    className='flex flex-col gap-6 '
    >
        <div className='flex flex-row items-center gap-4'>

            <Icon size={30}  className='text-rose-500'/>
            <div className='flex flex-col'>
                <p className='text-black font-regular text-lg'>{label}</p>
                <p className='text-neutral-500 font-light text-sm'>{categoryDescription}</p>
            </div>
            </div>

           
     
 

    </div>
    
  )
}

export default ListingCategory