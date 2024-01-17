import { useEffect } from "react"
import { routeMap } from "./pages/route"
import './App.css'
import MainApp from "./pages/MainApp"
import { Router } from "./pages/Provider"

function App() {
  const { key: routeKey, args: routeArgs } = Router.useValue()
  let Comp = routeMap[routeKey]
  useEffect(() => {
    Comp = routeMap[routeKey]
  }, [routeKey])
  return (<>
    <MainApp>
      <Comp {...routeArgs} />
    </MainApp>
  </>)
}

export default App
