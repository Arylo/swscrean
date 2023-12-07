import { useEffect, useState } from "react"
import { routeMap } from "./pages/route"
import './App.css'
import MainApp from "./pages/MainApp"
import Preload from "./pages/Preload"
import { Router } from "./pages/Provider"
import If from "./components/If"

function App() {
  const [isPreloadFinish, setPreloadFinish] = useState(false)
  const { key: routeKey, args: routeArgs } = Router.useValue()
  let Comp = routeMap[routeKey]
  useEffect(() => {
    Comp = routeMap[routeKey]
  }, [routeKey])
  return (<>
    <If condition={isPreloadFinish}>
      <MainApp>
        <Comp {...routeArgs} />
      </MainApp>
    </If>
    <If condition={!isPreloadFinish}>
      <Preload onFinish={() => setPreloadFinish(true)} />
    </If>
  </>)
}

export default App
