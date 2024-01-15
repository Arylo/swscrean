import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Asset {
    path: string,
    md5sum: string,
}

export const useQueryAssetList = (() => {
    const queryAssets = async () => {
        const { data } = await axios.get('/static?index=1')
        return data as Asset[]
    }
    const queryKey = queryAssets.name
    return () => {
        return useQuery({
            queryKey: [queryKey],
            queryFn: queryAssets,
            staleTime: Infinity,
            initialData: [],
            refetchOnMount: true,
            enabled: true,
        })
    }
})()

