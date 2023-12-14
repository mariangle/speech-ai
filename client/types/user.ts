import { TaskResponse, ProjectResponse } from "."

export type UserEntry = {
    email: string,
    password: string,
    name: string,
}

export type UserResponse = {
    id: string,
    image: string,
    email: string,
    password: string
    name: string,
    tasks: TaskResponse[],
    projects: ProjectResponse[]
}
