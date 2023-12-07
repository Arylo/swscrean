import { CSSProperties, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { WindowSize, useWindowSize } from "../../hooks"
import css from './mainApp.module.css'
import { useRatioSize } from "../../hooks"

interface MainSize extends WindowSize {
    auto: boolean,
}

function MainApp(props: PropsWithChildren) {
    const { width, height } = useWindowSize()
    const [{ width: compWidth, height: compHeight, auto }, setMainSize] = useState<MainSize>({ width, height, auto: false })
    const { width: computedWidth, height: computedHeight } = useRatioSize({ width, height })
    
    const compStyle = useMemo(() => {
        const style: CSSProperties = auto ? {
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: compWidth,
            height: '100vh',
        } : {
            height: compHeight,
            width: '100vw',
        }
        return style
    }, [compWidth, compHeight, auto])

    useEffect(() => {
        if (computedHeight <= height) {
            setMainSize({ width, height: computedHeight, auto: false })
        } else if (computedWidth <= width) {
            setMainSize({ width: computedWidth, height, auto: true, })
        }
    }, [width, height])

    return <div className={css.main} style={compStyle}>
        {props.children}
    </div>
}

export default MainApp
