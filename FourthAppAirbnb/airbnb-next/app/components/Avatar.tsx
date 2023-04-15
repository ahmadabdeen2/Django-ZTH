'use client'
import Image from "next/image"

interface AvatarProps {
  image?: string | null
}
const Avatar: React.FC<AvatarProps> = ({
  image 
}) => {
  return (
    <Image className="rounded-full" height={'30'} width={'30'} alt='avatar' src={ image || '/images/blank.jpeg'}/>
  )
}

export default Avatar