import { PropsWithChildren, useEffect } from "react"
import { Asset, useQueryAssetList } from "../../hooks/useQueryAssetList"
import { usePreloadAssets } from "../../hooks"

function Preload (props: PropsWithChildren<{ onFinish?: Function, assets: Asset[] }>) {
    const { isFetched } = useQueryAssetList()

    const { isSuccess, refetch } = usePreloadAssets(props.assets)
    useEffect(() => {
        isFetched && refetch()
    }, [isFetched])
    useEffect(() => {
        isSuccess && props.onFinish?.()
    }, [isSuccess])

    return <>
        {
            (!isFetched || !isSuccess) && props.onFinish
            ? <div>Loading Asset List...</div>
            : <>{props.children}</>
        }
    </>
}

export default Preload
