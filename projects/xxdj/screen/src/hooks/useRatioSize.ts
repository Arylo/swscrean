import { useMemo } from "react"
import { useWindowSize } from "./useWindowSize"

type UseRatioSizeOption = { width?: number, height?: number }

export function useRatioSize(size: UseRatioSizeOption, ratio = [16, 9]) {
    const windowSize = useWindowSize()
    const computedWidth = useMemo(() => {
        return typeof size.height === 'undefined' ? size.width as number : (size.height / ratio[1] * ratio[0])
    }, [size, windowSize])
    const computedHeight = useMemo(() => {
        return typeof size.width === 'undefined' ? size.height as number : (size.width / ratio[0] * ratio[1])
    }, [size, windowSize])
    return {
        width: computedWidth,
        height: computedHeight,
    }
}