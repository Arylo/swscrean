import { ImgHTMLAttributes, PropsWithRef, useEffect, useState } from "react";
import localForage from 'localforage';
import { Asset } from "../../hooks/useQueryAssetList";
import { CacheContent } from "../../hooks";

const useCachedImage = (asset?: Asset) => {
  const [imageData, setImageData] = useState<Blob | null>(null);

  useEffect(() => {
    if (!asset) return
    localForage.getItem<CacheContent>(asset.path).then((blobObj) => {
      blobObj && setImageData(blobObj.data)
    })
  }, [asset])

  return imageData;
}

export default function PreloadImage(props: PropsWithRef<ImgHTMLAttributes<HTMLImageElement> & { asset?: Asset }>) {
  const { asset, ...otherProps } = props
  const imageData = useCachedImage(asset)
  return (
    <img className="preload-image" {...otherProps} src={imageData ? URL.createObjectURL(imageData) : undefined} />
  )
}
