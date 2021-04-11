import React, { memo } from "react";
import { Switch, Route } from "react-router";
import "./App.scss";
import { Sidebar } from './components/Sidebar/Sidebar';
import { routers } from "./routers";

const App = memo(() => {
  return (
    <div className="app-content">
      <Sidebar>
        <Switch>
            {routers.map((router, i) => (
              <Route key={i} {...router} />
            ))}
        </Switch>
      </Sidebar>
    </div>
  )
});

export default App;
