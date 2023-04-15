'use client'
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
    onClick: (value: string) => void,
    label: string,
    icon: IconType,
    selected?: boolean
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    label,
    icon: Icon,
    selected

}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`flex
      items-center
      justify-start
      border-2 
      p-4
      rounded-xl
      hover:border-black
      transition-all
      duration-200
      cursor-pointer
      ${selected ? 'border-black': 'border-neutral-200' }
       gap-3`}>
        <div className='flex  items-center justify-center w-12 h-12 rounded-full text-white bg-rose-500'>
            <Icon size={24} />
            </div>
            <p className='text-black font-light text-sm'>{label}</p>


    </div>
  )
}

export default CategoryInput