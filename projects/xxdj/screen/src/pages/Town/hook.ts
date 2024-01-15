import { Pager, Town } from "../Provider"
import { useImageAssets } from "../Provider/context/assets"
import { btnMap } from "./constant"

export const useImages = () => {
    const townIndex = Town.useTownIndex()
    const [btnIndex] = Town.useBtnIndexState()
    const { index, nextIndex } = Pager.useValue()
    const { urls, assets } = useImageAssets(`/town/${townIndex}/${btnMap[btnIndex]}/`)
    return {
        index,
        nextIndex,
        urls,
        assets,
        total: urls.length,
    }
}