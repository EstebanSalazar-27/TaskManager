import { TaskHandlers } from './TasksWrapper'
import { TdTable } from './TdTable/TdTable'

interface TaskProps {
    taskName: string,
    priority: string,
    status: string,
    startedAt: string,
    finishedAt: string,
    id: string,
    taskHandlers: TaskHandlers,
    referencia: any,
    dragProps: any,
    dragHandle: any
}
export const Task = ({ taskName, priority, status, startedAt, finishedAt, id, taskHandlers, referencia, dragProps, dragHandle }: TaskProps) => {

    return (
        <tr {...dragHandle} {...dragProps} ref={referencia} key={id} className='flex items-center bg-slate-200'>
            <TdTable data={taskName} />
            <TdTable data={priority} />
            <TdTable data={status} />
            <TdTable data={startedAt ? startedAt.toString().substring(0, 30) : ""} />
            <TdTable data={finishedAt ? finishedAt.toString() : ""} />
            <td className='bg-sky-500 hover:bg-sky-600 duration-500 p-1 font-semibold rounded-md text-slate-50 cursor-pointer absolute right-2' onClick={() => taskHandlers.finishTask(status, id)}>Finish Task</td>
            <td className='bg-orange-400 hover:bg-orange-500 duration-500 p-1 font-semibold rounded-md text-slate-50 cursor-pointer absolute right-28' onClick={() => taskHandlers.deleteTask(id)}>Delete Task</td>

        </tr>
    )
}
