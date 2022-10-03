import { TasksWrapper } from "../components/TasksWrapper"
import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
describe("the form should be rendering ", () => {
    beforeEach(() => {
        render(<TasksWrapper />)
    })
    afterEach(cleanup)
    it("task wrapper must to render the creation task form only when the add new task button  has been pressed", async () => {
        const btnElement = screen.getByRole('button', { name: 'Add new task +' })
        const addNewTask = fireEvent.click(btnElement)
        const formElement = await screen.findByText(/Task Creations/i)
        expect(addNewTask).toBe(true)
        expect(formElement).toBeInTheDocument()
    })
    it("task wrapper must no render the creation task form if the button hasn't been pressed", () => {
        const formElement = screen.findByText(/Task Creations/i)
        expect(formElement).not.toBe(true)

    })
})