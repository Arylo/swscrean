import { useMemo } from "react"
import { Asset } from "../../hooks/useQueryAssetList"
import { useImageAssets } from "../Provider/context/assets"
import { btnMap } from "../Town/constant"
import Preload from "../../components/Preload"

function PrefetchAssets () {
    const { assets: btnAssets } = useImageAssets('/btn')
    const { assets: titleAssets } = useImageAssets(/\/town\/\w+\.\w+$/)
    const { assets: contentAssets } = useImageAssets(/\/town\/\d+\//)
    const firstContentAssets = useMemo(() => {
        const prefixSet = new Set<string>()
        contentAssets.forEach((asset) => {
            const matches = asset.path.match(/\/town\/\d+\//)
            if (!matches) return
            prefixSet.add(matches[0])
        })
        const prefixList = [...prefixSet]
        return prefixList.reduce<Asset[]>((list, prefix) => {
            const filteredAssets = contentAssets.filter((asset) => asset.path.includes(`${prefix}${btnMap[0]}/`))
            const firstAsset = filteredAssets.find((asset) => /\/0*1\.\w+$/.test(asset.path))
            list.push(firstAsset ?? filteredAssets[0])
            return list
        }, [])
    }, [contentAssets])
    const needPreloadAssets = useMemo(() => {
        return [
            ...btnAssets,
            ...titleAssets,
            ...firstContentAssets,
        ]
    }, [btnAssets, titleAssets, firstContentAssets])

    return <>
        <Preload assets={needPreloadAssets} />
    </>
}

export default PrefetchAssets
