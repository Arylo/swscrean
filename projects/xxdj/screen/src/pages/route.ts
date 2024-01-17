import PreloadPage from './PreloadPage/index'
import Home from './Home/index'
import Town from './Town/index'
import { RouteKey } from '../constant'

export const routeMap = {
  [RouteKey.PRELOAD]: PreloadPage,
  [RouteKey.HOME]: Home,
  [RouteKey.TOWN]: Town,
}
