import React from 'react'

interface WrapperProps {
    children: React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className='w-4/5 mx-auto flex justify-center py-4'>
            {children}
        </div>
    )
}
