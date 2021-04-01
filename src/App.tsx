import React, { memo } from "react"
import { Switch } from "react-router"
import "./App.scss"
import { Root } from "./features/Root/Root"


const App = memo(() => {
  return (
    <>
      <Switch>
        <div className="app-content">
          <Root />
        </div>
      </Switch>
    </>
  )
})

export default App
