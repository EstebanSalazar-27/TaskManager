import { Draggable, Droppable } from "react-beautiful-dnd"
import { TasksCollection, TaskType } from "../models/tasks"
import { Task } from "./Task"
import { TaskHandlers } from "./TasksWrapper"

type TableOfTasksProps = {
    tasks: TasksCollection,
    taskHandlers: TaskHandlers
}
export const TableOfTasks = ({ tasks, taskHandlers }: TableOfTasksProps) => {
    return (
        <table role='table' className='flex flex-col '>
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
    )
}