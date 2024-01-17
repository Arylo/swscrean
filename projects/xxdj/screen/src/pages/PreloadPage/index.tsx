import * as React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useQueryAssetList } from '../../hooks/useQueryAssetList'
import { preloadData } from '../../hooks/usePreloadAsset'
import { RouteKey } from '../../constant'
import { Router } from '../Provider'

export default function PreloadPage () {
  const go = Router.useGoPage()
  const { data: assets, isFetched } = useQueryAssetList()
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['preload', 'assets'],
    queryFn: async ({ pageParam }) => {
      await preloadData(assets[pageParam - 1])
      return pageParam === assets.length ? undefined : pageParam + 1
    },
    staleTime: Infinity,
    retry: 10,
    retryDelay: 2 * 1000, // 2s
    initialPageParam: 1,
    getNextPageParam: (pageParam) => pageParam,
  })
  const curCount = React.useMemo(() => {
    if (!data) return 0
    return data.pageParams[data.pageParams.length - 1] as number
  }, [data])
  React.useEffect(() => {
    if (isFetching) return
    if (data && data.pages.length === assets.length) return
    fetchNextPage()
  }, [isFetching, hasNextPage])
  React.useEffect(() => {
    isFetched && assets.length && fetchNextPage()
  }, [isFetched])
  React.useEffect(() => {
    if (curCount > 0 && curCount === assets.length) {
      setTimeout(() => {
        go(RouteKey.HOME)
      }, 250)
    }
  }, [curCount])
  return <>
    <p>successCount: { curCount }</p>
    <p>totalCount: { assets.length }</p>
  </>
}
