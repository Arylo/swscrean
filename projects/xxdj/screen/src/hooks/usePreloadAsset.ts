import localForage from 'localforage'
import { useQuery } from '@tanstack/react-query'
import { Asset } from './useQueryAssetList'

export interface CacheContent {
  data: Blob,
  md5sum: string,
}

export const preloadData = async (asset: Asset) => {
  const blobObj = await localForage.getItem<CacheContent | null>(asset.path)
  if (blobObj && blobObj.md5sum === asset.md5sum) {
    return 127
  }
  const response = await fetch(asset.path)
  const blob = await response.blob()
  await localForage.setItem(asset.path, {
    data: blob,
    md5sum: asset.md5sum,
  })
  return 0
}

export function getQueryOption (asset: Asset) {
  return {
    queryKey: ['preload-asset', asset.path],
    queryFn: async () => preloadData(asset),
    staleTime: Infinity,
  }
}

export const usePreloadAsset = (asset: Asset) => {
  return useQuery(getQueryOption(asset))
}
