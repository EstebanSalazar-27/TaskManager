import { TaskForm } from "../components/TaskForm"

import { fireEvent, render, screen, cleanup, waitFor, getByTestId } from "@testing-library/react"
import { describe, expect, it } from "vitest"
const TaskFormProps = {
    dispatchAction: () => { return true },
    showTaskCreation: true
}
describe("the form should be rendering and be able to create new tasks  ", () => {
    beforeEach(() => {
        render(<TaskForm {...TaskFormProps} />)
    })
    afterEach(cleanup)
    it('form should render', () => {
        const formElement = screen.getByRole('form')
        expect(formElement).toBeInTheDocument()
    })
    // Labels
    it(" label of taskname input  must exist", () => {
        const labelTaskNameElem = screen.getByLabelText('Task')
        expect(labelTaskNameElem).toBeInTheDocument()
    })
    it(" label of priority input  must exist", () => {
        const labelTaskNameElem = screen.getByLabelText('Priority')
        expect(labelTaskNameElem).toBeInTheDocument()
    })
    // Inputs 
    it("taskname input should render", () => {
        const inputElem = screen.getByLabelText('Task', { selector: 'input' })
        expect(inputElem).toBeInTheDocument()
    })
    it("priority selector input   should render", () => {
        const selectorElem = screen.getByRole('selector')
        expect(selectorElem).toBeInTheDocument()
    })
    it("priority selector input should display the correct number of options  ", () => {
        const selectorElem = screen.getByRole('selector')
        expect(selectorElem.children.length).toBe(3)

    })
    it("the options (low, medium and high) should exists in the selector input", () => {
        expect(screen.getByRole('option', { name: 'low' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'medium' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'high' })).toBeInTheDocument();
    })
    it("the input should update its value if the user  is typing", () => {
        const input = screen.getByLabelText('Task', { selector: "input" })
        fireEvent.change(input, { target: { value: "cooking" } })
        expect(input.closest('input')?.value).toBe('cooking');

    })


})