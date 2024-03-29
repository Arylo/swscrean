import { createContext, useContext, useMemo } from "react";
import { useEffectOnce } from "react-use"
import { Asset, useQueryAssetList } from "../../../hooks/useQueryAssetList";

interface AssetsContextContent {
    assets: Asset[],
    urls: string[],
    isFetched: boolean,
}

const context = createContext<AssetsContextContent>({ assets: [], urls: [], isFetched: false })

export const useProvider = () => {
    const Comp = context.Provider
    const { data, isFetched, isFetching, refetch } = useQueryAssetList()
    const assets = useMemo(() => {
        return data
            .filter((d) => {
                return /\.(jpe?g|bmp|gif|png)$/.test(d.path)
            })
    }, [data])
    const urls = useMemo(() => {
        return assets.map((d) => d.path)
    }, [assets])
    useEffectOnce(() => {
      !isFetching && refetch()
    })
    return [Comp, { assets, urls, isFetched }] as [typeof Comp, AssetsContextContent]
}

export const useFilterAssets = (filterFn = (asset: Asset) => !!asset) => {
    const { assets: imageAssets, isFetched } = useContext(context)
    const filterAssets = useMemo(() => {
        return imageAssets.filter(filterFn)
    }, [imageAssets, filterFn])
    const filterUrls = useMemo(() => {
        return filterAssets.map((asset) => asset.path)
    }, [filterAssets])
    return {
        assets: filterAssets,
        urls: filterUrls,
        isFetched,
    }
}

export const useImageAssets = (likePath: string | RegExp = '') => {
    const fn = useMemo(() => {
        return (asset: Asset) => {
            return typeof likePath === 'string'
                ? asset.path.includes(likePath)
                : likePath.test(asset.path)
        }
    }, [likePath])
    return useFilterAssets(fn)
}

export const useImageAsset = (likePath = '') => {
    const { assets, urls, ...args } = useImageAssets(likePath)
    const asset = useMemo(() => assets[0], [assets])
    const url = useMemo(() => urls[0], [urls])
    return {
        asset,
        url,
        ...args,
    }
}
