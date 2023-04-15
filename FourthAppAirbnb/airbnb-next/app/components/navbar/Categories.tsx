import React from 'react'
import Container from '../Container'
import {TbBeach} from 'react-icons/tb'
import {GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
    {
        label:'Beach',
        icon: TbBeach,
        description: "This property has a beach",
    },
    {
        label:"Windmills",
        icon: GiWindmill,
        description: "This property has windmills"
    },
    {
        label:"Modern",
        icon: MdOutlineVilla,
        description: "This property is modern"
    }
]

const Categories = () => {
    const params = useSearchParams();
    const selectedCategory = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname === '/'
    if (!isMainPage) return null
  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
             {categories.map((category, index) => (
                <CategoryBox key={index} {...category}/>
            ))}
        </div>


    </Container>
  )
}

export default Categories