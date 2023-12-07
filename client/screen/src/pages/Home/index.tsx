
import css from './home.module.css'
import { useState } from 'react'
import { Router, Town } from '../Provider'
import { RouteKey } from '../../constant'
import PreloadImage from '../../components/PreloadImage'
import { useImageAsset } from '../Provider/context/assets'

export default function Home () {
    const [index, setIndex] = useState(0)
    const go = Router.useGoPage()
    const [_, clickBtn] = Town.useBtnIndexState()
    const { asset } = useImageAsset(`/home/${index === 0 ? 'bg' : index}.jpg`)
    const zones = [
        [
            ['72%', '43%', '10%', '22%'],
            ['69%', '57%', '4%', '22%'],
        ],
        [
            ['59%', '54%', '11%', '27%'],
        ],
        [
            ['51%', '73%', '9%', '10%'],
        ],
        [
            ['48%', '53%', '11%', '21%'],
        ],
        [
            ['44%', '33%', '13%', '24%'],
            ['45%', '22%', '8%', '12%'],
        ],
        [
            ['53%', '12%', '18%', '16%'],
            ['53%', '28%', '10%', '7%'],
        ],
        [
            ['71%', '13%', '13%', '24%'],
        ],
        [
            ['57%', '35%', '17%', '19%'],
            ['63%', '28%', '8%', '9%'],
        ],
    ]
    const changeBg = (index: number) => setIndex(index)
    const click = (index: number) => {
        changeBg(index)
        setTimeout(() => {
            go(RouteKey.TOWN)
            clickBtn(0, index)
        }, 100)
    }
    return (<>
        <div className={css.zones}>
            <PreloadImage className={css.bg} asset={asset} />
            {zones.map((zone, index) => zone.map(([x, y, width, height]) => <div
                key={`${index}-${x}-${y}`}
                className={css.zone}
                style={{ top: y, left: x, width, height }}
                onClick={() => click(index + 1)}
                onMouseOver={() => changeBg(index + 1)}
                onMouseLeave={() => changeBg(0)}
                onTouchEnd={() => click(index + 1)}
            />))}
        </div>
    </>)
}