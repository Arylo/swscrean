import { useEffect, useRef, useState } from "react"
import css from './town.module.css'
import { Town as TownContext, Router, Pager } from "../Provider"
import { RouteKey } from "../../constant"
import { useRatioSize, useWindowSize } from "../../hooks"
import Carouse from "./components/Carouse"
import PreloadImage from "../../components/PreloadImage"
import { useImageAsset, useImageAssets } from "../Provider/context/assets"
import ActionBtnImage from "./components/ActionBtnImage"
import { useImages } from "./hook"

function ButtonGroup () {
    const go = Router.useGoPage()
    const townIndex = TownContext.useTownIndex()
    const [_, jump] = TownContext.useBtnIndexState()
    const { assets: titleBtnAssets } = useImageAssets(`/town/${townIndex}.png`)
    const { assets: videoBtnAssets } = useImageAssets('/btn/inactive/5.png')
    const { assets: backAssets } = useImageAssets('/btn/back.png')

    return (<div className={css['btn-group']}>
        <div className="title">
            <PreloadImage asset={titleBtnAssets[0]} />
        </div>
        <div className="btns space-between">
            <div className={css.btn} onClick={() => jump(0)}>
                <ActionBtnImage index={0} />
            </div>
            <div className={css.btn} onClick={() => jump(1)}>
                <ActionBtnImage index={1} />
            </div>
        </div>
        <div className="btns space-between">
            <div className={css.btn} onClick={() => jump(2)}>
                <ActionBtnImage index={2} />
            </div>
            <div className={css.btn} onClick={() => jump(3)}>
                <ActionBtnImage index={3} />
            </div>
        </div>
        <div className="btns center">
            <div className={css.btn}><PreloadImage asset={videoBtnAssets[0]} /></div>
        </div>
        <div className="btns right">
            <div className={css.btn} onClick={() => go(RouteKey.HOME)}>
                <PreloadImage asset={backAssets[0]} />
            </div>
        </div>
    </div>)
}

function ImageGroup () {
    const [btnIndex] = TownContext.useBtnIndexState()
    const { asset: titleAsset } = useImageAsset(`/btn/title/${btnIndex + 1}.png`)
    const { asset: leftAsset } = useImageAsset(`/btn/left.png`)
    const { asset: rightAsset } = useImageAsset(`/btn/right.png`)
    const { asset: dotAsset } = useImageAsset(`/btn/img_dot.png`)
    const { asset: dotActiveAsset } = useImageAsset(`/btn/img_dot_active.png`)
    const { assets, index } = useImages()
    const windowSize = useWindowSize()
    const compRef = useRef(null)
    const [compWidth, setCompWidth] = useState(1)
    const { height: compHeight } = useRatioSize({ width: compWidth })
    useEffect(() => {
        const width: number = (compRef.current as any).offsetWidth
        setCompWidth(width)
    }, [windowSize, compRef])
    const pager = Pager.useValue()
    
    return (
        <div className={css['image-group']}>
            <div className="center title" style={{ height: compHeight / 11 }}>
                <PreloadImage asset={titleAsset} />
            </div>
            <div className="carouse" ref={compRef}>
                <Carouse />
            </div>
            <div className="space-between">
                <div className={css.btn} onClick={() => pager.prev()}><PreloadImage asset={leftAsset} /></div>
                <div className={css.dots}>
                    {
                        assets.map((_, i) => {
                            return <PreloadImage className="dot" asset={i === index ? dotActiveAsset : dotAsset} />
                        })
                    }
                </div>
                <div className={css.btn} onClick={() => pager.next()}><PreloadImage asset={rightAsset} /></div>
            </div>
        </div>
    )
}

function Town () {
    const { assets: bgAssets } = useImageAssets(`/town/bg.jpg`)
    return (
        <>
            <PreloadImage className={css.bg} asset={bgAssets[0]} />
            <ButtonGroup />
            <ImageGroup />
        </>
    )
}

export default Town