import "./tdTable.css"
interface TdTableProps {
    data: string
}
export const TdTable = ({ data }: TdTableProps) => {
    console.log(data)
    return (
        <td id={`data-${data}`} className={`text-sm  font-bold capitalize text-slate-600 px-1  w-32 min-h-[20px] data-${data}`}> {data === "finished" ? "✅" : data}</td>
    )
}