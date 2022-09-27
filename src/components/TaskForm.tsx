import React, { ChangeEvent, Dispatch, DispatchWithoutAction, useId, useState } from 'react'
import { TaskType } from '../models/tasks'
import { ActionKinds, Actions } from './TasksWrapper'

interface TaskFormProps {
    dispatchAction: Dispatch<Actions>,
    showTaskCreation: boolean,
}
const initialValueTask: TaskType = {
    id: "",
    priority: "low",
    status: "pending",
    taskName: "",
    startedAt: "",
    finishedAt: ""
}

export const TaskForm = ({ dispatchAction, showTaskCreation }: TaskFormProps) => {
    const [task, setTask] = useState<TaskType>(initialValueTask)
    
    const id = useId()
    const showFormStyles = showTaskCreation ? "opacity-100 blur-0" : "opacity-0 blur-sm"
    const handleChange = (e: any) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const newTask = {
            ...task,
            status: "pending",
            id: `${id}-${task.taskName}`,
            startedAt: new Date()
        }
        e.preventDefault()
        dispatchAction({ type: ActionKinds.ADD_NEW_TASK, payload: newTask })
        setTask(initialValueTask)
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full mt-10 min-h-[300px] p-2  left-0 duration-500 bg-slate-50 flex flex-col shadow-md gap-2 ${showFormStyles} `}>
            <h2 className='text-slate-700 font-bold text-lg'>Task Creations</h2>
            <label className='font-semibold text-slate-600' htmlFor="name">
                Task:
                <input required onChange={handleChange} id='name' type="name" value={task.taskName} className='w-full p-2 bg-slate-200' name="taskName" />
            </label>

            <label className='text-slate-600 font-semibold' htmlFor="">
                Priority:
                <select onChange={handleChange} name="priority" className='capitalize w-full bg-slate-200 py-2'>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </label>
            <input type="submit" className='w-full bg-green-500 py-2 text-slate-50 font-semibold  cursor-pointer hover:bg-green-400 duration-200 absolute bottom-0 left-0' value="Confirm" />
        </form>
    )
}
