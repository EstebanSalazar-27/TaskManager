import React from 'react'
type AddNewTaskBtn = {
    showForm: () => void
}
export const AddNewTaskBtn = ({ showForm }: AddNewTaskBtn) => {
    return (
        <button onClick={showForm} className='w-full  left-0  px-2 py-1 bottom-0 bg-sky-500 hover:bg-sky-600 duration-300 text-slate-50 text-sm font-semibold   z-50 '>Add new task <span className='font-bold'>+</span></button>
    )
}
