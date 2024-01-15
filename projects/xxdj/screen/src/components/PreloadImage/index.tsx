import { ImgHTMLAttributes, PropsWithRef, useEffect, useMemo, useState } from "react";
import localForage from 'localforage';
import { Asset } from "../../hooks/useQueryAssetList";
import { CacheContent, usePreloadAssets } from "../../hooks";

const useCachedImage = (asset?: Asset) => {
    const [imageData, setImageData] = useState<Blob | null>(null);

    const { isSuccess } = usePreloadAssets(asset ? [asset] : [])

    useEffect(() => {
        if (!isSuccess || !asset) return
        localForage.getItem<CacheContent>(asset.path).then((blobObj) => {
            blobObj && setImageData(blobObj.data)
        })
    }, [isSuccess])

    return imageData;
}

export default function PreloadImage(props: PropsWithRef<ImgHTMLAttributes<HTMLImageElement> & { asset?: Asset, compatible?: boolean }>) {
    const { src, asset, compatible = true, ...otherProps } = props
    const imageData = useCachedImage(asset)
    const curSrc = useMemo(() => {
        if (imageData) return URL.createObjectURL(imageData)
        if (compatible) {
            return asset ? asset.path : src
        }
        return undefined
    }, [imageData])
    return (
        <img className="preload-image" src={curSrc} {...otherProps} />
    )
}