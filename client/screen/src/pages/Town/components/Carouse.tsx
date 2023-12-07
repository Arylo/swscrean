import { useEffect } from "react";
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useImages } from "../hook"
import PreloadImage from "../../../components/PreloadImage"
import { Pager, Town } from "../../Provider";
import { useScreenSize } from "../../../hooks";

export default function Carouse() {
    const { height } = useScreenSize()
    const [btnIndex] = Town.useBtnIndexState()
    const { assets } = useImages()
    const pager = Pager.useValue()
    useEffect(() => {
        pager.init()
    }, [btnIndex])

    const getRealIndex = (index: number) => {
        return index < 0 ? assets.length - 1 : index >= assets.length ? 0 : index
    }

    const options: Partial<CarouselProps> = {
        showArrows: false,
        showThumbs: false,
        showStatus: false,
        showIndicators: false,
        dynamicHeight: false,
        infiniteLoop: true,
        selectedItem: pager.nextIndex !== pager.index ? pager.nextIndex : pager.index,
        onChange: () => {
            const nextIndex = getRealIndex(pager.nextIndex)
            pager.setIndex(nextIndex)
        },
    }

    return (
        <Carousel {...options}>
            {assets.map((asset, i) => {
                return <PreloadImage asset={asset} key={i} style={{ height: height * 0.67 }} />
            })}
        </Carousel>
    )
}