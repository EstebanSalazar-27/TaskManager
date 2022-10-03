import React, { Dispatch, useReducer, useState } from 'react'
import { TasksCollection, TaskType } from '../models/tasks'
import { Task } from './Task'
import { ActionKinds, Actions, TaskHandlers } from './TasksWrapper'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AddNewTaskBtn } from './AddNewTaskBtn';
import { TableOfTasks } from './TableOfTasks';
interface ListOfTasksProps {
    tasks: TasksCollection,
    setShowTaskCreation: (state: boolean) => void,
    showTaskCreation: boolean,
    dispatchAction: Dispatch<Actions>,
    taskHandlers: TaskHandlers
}

export const ListOfTasks = ({ tasks, setShowTaskCreation, showTaskCreation, taskHandlers, dispatchAction }: ListOfTasksProps) => {

    function showForm() {
        setShowTaskCreation(!showTaskCreation)
    }

    return (

        <>

            <DragDropContext onDragEnd={(result) => {
                const { source, destination } = result
                if (!destination) {
                    return;
                }
                if (source.index === destination.index && source.droppableId === destination.droppableId) {
                    return;
                }
                dispatchAction({ type: ActionKinds.ORDER_ITEMS, payload: taskHandlers.reorder(tasks, source.index, destination.index) })
            }}>
                <div className='
        overflow-y-auto 
        max-h-60
        min-w-[200px]  min-h-[300px]   
        relative
        w-full 
        shadow-md  bg-slate-100
        rounded-sm
        '>
                    <TableOfTasks taskHandlers={taskHandlers} tasks={tasks} />
                </div>
                <AddNewTaskBtn showForm={showForm} />
            </DragDropContext>

        </>

    )
}
