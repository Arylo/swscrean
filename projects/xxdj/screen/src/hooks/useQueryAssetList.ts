import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Asset {
  path: string,
  md5sum: string,
}

const queryAssets = async () => {
  const { data } = await axios.get(`${__STATIC_URL_PREFIX__}?index=1`)
  return data as Asset[]
}
const queryKey = queryAssets.name

export const useQueryAssetList = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryAssets,
    staleTime: Infinity,
    initialData: [],
    refetchOnMount: false,
    enabled: false,
  })
}
