import Home from "./Home/index";
import Town from "./Town";
import { RouteKey } from "../constant";

export const routeMap = {
    [RouteKey.HOME]: Home,
    [RouteKey.TOWN]: Town,
}