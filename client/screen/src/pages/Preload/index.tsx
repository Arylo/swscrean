import { PropsWithChildren, useEffect, useMemo } from "react"
import { Asset, useQueryAssetList } from "../../hooks/useQueryAssetList"
import { useImageAssets } from "../Provider/context/assets"
import { btnMap } from "../Town/constant"
import { usePreloadAssets } from "../../hooks"

function Preload (props: PropsWithChildren<{ onFinish?: Function }>) {
    const { isFetched } = useQueryAssetList()

    const { assets: homeAssets } = useImageAssets('/home/')
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
            ...homeAssets,
            ...btnAssets,
            ...titleAssets,
            ...firstContentAssets,
        ]
    }, [homeAssets, btnAssets, titleAssets, firstContentAssets])
    const { isSuccess, refetch } = usePreloadAssets(needPreloadAssets)
    useEffect(() => {
        isFetched && refetch()
    }, [isFetched])
    useEffect(() => {
        isSuccess && props.onFinish?.()
    }, [isSuccess])

    return <>
        {
            !isFetched || !isSuccess
            ? <div>Loading Asset List...</div>
            : <></>
        }
    </>
}

export default Preload
