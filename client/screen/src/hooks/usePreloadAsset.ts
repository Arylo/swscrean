import localForage from "localforage";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "./useQueryAssetList";

export interface CacheContent {
    data: Blob,
    md5sum: string,
}

export const usePreloadAssets = (assets: Asset[], { keys = [] }: { keys?: string[] } = {}) => {
    const loadData = async (asset: Asset) => {
        const response = await fetch(asset.path);
        const blob = await response.blob();
        localForage.setItem(asset.path, {
            data: blob,
            md5sum: asset.md5sum,
        });
    };
    return useQuery({
        queryKey: ['preload-asset', ...keys],
        queryFn: async () => {
            if (!assets.length) throw new Error('The asset list length is 0')
            for (const asset of assets) {
                const blobObj = await localForage.getItem<CacheContent | null>(asset.path)
                if (blobObj && blobObj.md5sum === asset.md5sum) {
                    continue
                }
                loadData(asset);
            }
            return true
        },
        enabled: false,
    })
}