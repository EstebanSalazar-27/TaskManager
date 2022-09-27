import './App.css'
import * as React from "react"
import { ListOfTasks } from './components/ListOfTasks'
import { TasksWrapper } from './components/TasksWrapper'
import { Wrapper } from './layout/Wrapper'

function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  const darkIsOn = darkMode ? 'bg-stone-900' : "bg-slate-100"

  return (
    <div className={`App bg-slate-200 min-h-screen`}>

      <Wrapper >
        <TasksWrapper />
      </Wrapper>

    </div>
  )
}

export default App
