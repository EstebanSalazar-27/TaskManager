
export interface TaskType {
    id: string,
    taskName: string,
    status: "finished" | "pending" | string,
    priority: "low" | "medium" | "high" | "",
    startedAt?: Date | "",
    finishedAt?: Date | "",
}

export type TasksCollection = TaskType[]