import { PropsWithoutRef } from "react";
import { useImageAssets } from "../../Provider/context/assets";
import { Town } from "../../Provider";
import PreloadImage from "../../../components/PreloadImage";

export default function ActionBtnImage (props: PropsWithoutRef<{ index: number }>) {
    const [btnIndex] = Town.useBtnIndexState()
    const { assets: inactiveAssets } = useImageAssets(`/btn/inactive/${props.index + 1}.png`)
    const { assets: activeAssets } = useImageAssets(`/btn/active/${props.index + 1}.png`)
    return <PreloadImage asset={btnIndex === props.index ? activeAssets[0] : inactiveAssets[0]} />
}