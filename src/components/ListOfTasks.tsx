import React, { Dispatch, useReducer, useState } from 'react'
import { TasksCollection, TaskType } from '../models/tasks'
import { Task } from './Task'
import { ActionKinds, Actions, TaskHandlers } from './TasksWrapper'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
                    <table className='flex flex-col '>
                        <thead className='w-full bg-sky-500'>
                            <tr>
                                <td className='px-1 text-lg font-semibold text-slate-100 w-32'>Task</td>
                                <td className='px-1 text-lg font-semibold text-slate-100 w-32'>Priority</td>
                                <td className='px-1 text-lg font-semibold text-slate-100 w-32'>Status</td>
                                <td className='px-1 text-lg font-semibold text-slate-100 w-32'>Started at</td>
                                <td className='px-1 text-lg font-semibold text-slate-100 w-32'>Finished at</td>
                            </tr>
                        </thead>
                        <Droppable droppableId='tasks'>
                            {(droppableProvided) =>
                                <tbody {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className='flex flex-col gap-1'>



                                    {
                                        tasks.length >= 1
                                            ?
                                            tasks.map((task: TaskType, idx: number) => {
                                                return (
                                                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                                                        {
                                                            (draggableProvided) => (
                                                                <Task
                                                                    dragProps={{ ...draggableProvided.draggableProps }}
                                                                    dragHandle={{ ...draggableProvided.dragHandleProps }}

                                                                    referencia={draggableProvided.innerRef}
                                                                    taskHandlers={taskHandlers}
                                                                    finishedAt={task.finishedAt
                                                                        ?
                                                                        task.finishedAt.toString().substring(0, 24)
                                                                        : ""}
                                                                    id={task.id} priority={task.priority}
                                                                    startedAt={task.startedAt ? task.startedAt?.toString().substring(0, 24) : ""}
                                                                    status={task.status} taskName={task.taskName} />
                                                            )
                                                        }
                                                    </Draggable>
                                                )
                                            }
                                            )
                                            :
                                            <h2 className=' mx-auto my-20 font-bold text-2xl text-orange-400'>You don't have added tasks :(</h2>
                                    }
                                    {droppableProvided.placeholder}
                                </tbody>}
                        </Droppable>
                    </table>
                </div>
                <button onClick={showForm} className='w-full  left-0  px-2 py-1 bottom-0 bg-sky-500 hover:bg-sky-600 duration-300 text-slate-50 text-sm font-semibold   z-50 '>Add new task <span className='font-bold'>+</span></button>
            </DragDropContext>

        </>

    )
}
