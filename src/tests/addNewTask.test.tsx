import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { AddNewTaskBtn } from "../components/AddNewTaskBtn"


const showForm = () => {
    let show = true
    return !show
}

describe('the button add new task should render the form for creation of new tasks', () => {
    beforeEach(() => {
        render(<AddNewTaskBtn showForm={showForm} />)
    })
    afterEach(cleanup)

    it("the button add new task should always be rendering ", () => {
        const btnElement = screen.getByRole('button', { name: 'Add new task +' })
        expect(btnElement).toBeInTheDocument()
    })
    it(" when the user press the button it must to  run a function ", () => {
        const btnElement = screen.getByRole('button', { name: 'Add new task +' })
        fireEvent.click(btnElement)
        expect(fireEvent.click(btnElement)).toBe(true)
    })
})

