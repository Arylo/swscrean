import * as React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Progress } from 'antd'
import { useQueryAssetList } from '../../hooks/useQueryAssetList'
import { preloadData } from '../../hooks/usePreloadAsset'
import { RouteKey } from '../../constant'
import { Router } from '../Provider'

export default function PreloadPage () {
  const go = Router.useGoPage()
  const { data: assets, isFetched, isSuccess } = useQueryAssetList()
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
  const progressProps = React.useMemo(() => {
    const defaultProps = {
      percent: 0,
      steps: 10,
      size: [20, 30] as [number, number],
      showInfo: true,
      format: () => '正在加载资源...',
    }
    if (!isSuccess) return Object.assign(defaultProps, { percent: 10 })
    const percent = parseInt((curCount / assets.length * 90 + 10).toString())
    return Object.assign(defaultProps, { percent })
  }, [isSuccess, curCount, assets])
  return <>
    <Progress {...progressProps} />
  </>
}
