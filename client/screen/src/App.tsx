import { useEffect } from "react"
import { routeMap } from "./pages/route"
import './App.css'
import MainApp from "./pages/MainApp"
import { Router } from "./pages/Provider"
import Preload from "./components/Preload"
import { useImageAssets } from "./pages/Provider/context/assets"

function App() {
  const { key: routeKey, args: routeArgs } = Router.useValue()
  const { assets: homeAssets } = useImageAssets('/home/')
  let Comp = routeMap[routeKey]
  useEffect(() => {
    Comp = routeMap[routeKey]
  }, [routeKey])
  return (<>
    <Preload assets={homeAssets}>
      <MainApp>
        <Comp {...routeArgs} />
      </MainApp>
    </Preload>
  </>)
}

export default App
