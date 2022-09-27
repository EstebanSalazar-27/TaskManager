import React, { useReducer, useState, useEffect } from 'react'
import { TasksCollection, TaskType } from '../models/tasks'
import { ListOfTasks } from './ListOfTasks'
import { TaskForm } from './TaskForm'
const initialState: TasksCollection = []
export enum ActionKinds {
    ADD_NEW_TASK = "ADD_NEW_TASK",
    FINISHED_TASK = "FINISHED_TASK",
    ORDER_ITEMS = "ORDER_ITEMS",
    RECOVER_TASKS = "RECOVER_TASKS",
    DELETE_TASK = "DELETE_TASK",
}
export interface Actions {
    type: ActionKinds,
    payload: any
}
export type TaskHandlers = {
    finishTask: (status: TaskType["status"], id: string) => void,
    deleteTask: (id: string) => void,
    reorder: (list: TasksCollection, startIndex: number, endIndex: number) => any
}
export const TasksReducer = (state = initialState, { type, payload }: Actions) => {
    switch (type) {

        case ActionKinds.ADD_NEW_TASK:
            return [...state, payload]
        case ActionKinds.RECOVER_TASKS:
            return payload
        case ActionKinds.FINISHED_TASK:
            return [...state]
        case ActionKinds.ORDER_ITEMS:
            return [...payload]
        case ActionKinds.DELETE_TASK:
            return [...state.filter((task: TaskType) => task.id !== payload)]
        default:
            return state
    }
}
const tasksInLocal: TasksCollection | string = window.localStorage.getItem('tasks') || "[]"
export const TasksWrapper = () => {
    const [tasks, dispatch] = useReducer(TasksReducer, JSON.parse(tasksInLocal))
    const [showTaskCreation, setShowTaskCreation] = useState<boolean>(false)
    // Handles
    function finishTask(status: TaskType["status"], id: string) {
        const finishedTask = tasks.findIndex((task: TaskType) => task.id === id)
        if (status === 'pending') {
            const newModifiedTask = {
                status: tasks[finishedTask].status = "finished",
                finishedAt: tasks[finishedTask].finishedAt = new Date(),
            }
            dispatch({
                type: ActionKinds.FINISHED_TASK, payload: newModifiedTask
            })
        }
    }
    function deleteTask(id: string) {
        const taskToDelete: TaskType = tasks.find((task: TaskType) => task.id === id)
        dispatch({ type: ActionKinds.DELETE_TASK, payload: taskToDelete.id })
    }
    function reorder(list: any, startIndex: any, endIndex: any) {
        const result = [...list]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }
    const taskHandlers: TaskHandlers = {
        deleteTask: deleteTask,
        finishTask: finishTask,
        reorder: reorder,
    }
    // Effects
    useEffect(() => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <div className='w-full relative' >
            <ListOfTasks showTaskCreation={showTaskCreation} taskHandlers={taskHandlers} setShowTaskCreation={setShowTaskCreation} dispatchAction={dispatch} tasks={tasks} />
            <TaskForm showTaskCreation={showTaskCreation} dispatchAction={dispatch} />
        </div>
    )
}
