'use client'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
    title?: string,
    subtitle?: string,
    showReset?: boolean,
}

import Container from './Container'
import Heading from './Heading';
import Button from './Button';
const EmptyState: React.FC<EmptyStateProps> = ({
    title ='No Matches',
    subtitle = 'Try changing some filters.',
    showReset

}) => {

    const router = useRouter();

  return (
    <div
    className='h-[60vh] flex flex-col gap-2 justify-center items-center'
    >
    
      <Heading
      center
      title={title}
      subtitle={subtitle}
      />      
      <div className='w-48 mt-4'>
        {showReset && (
            <Button
            label="Reset Filters"
            onClick={() => router.push('/')}

            />
        )}
      </div>
    
  </div>
  )
}

export default EmptyState