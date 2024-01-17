import { PropsWithChildren } from "react";
import * as Router from "./context/route";
import * as Town from "./context/town";
import * as Assets from "./context/assets";
import * as Pager from "./context/pager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProviderList, { ProviderItem } from "./components/ProviderList";

export {
  Router,
  Town,
  Assets,
  Pager,
}

const queryClient = new QueryClient()

function CommonProvider (props: PropsWithChildren) {
  const providers: ProviderItem[] = [
    [QueryClientProvider, { client: queryClient }],
  ]
  return (<>
    <ProviderList providers={providers}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ProviderList>
  </>)
}

function LogicProvider (props: PropsWithChildren) {
  const [AssetsProviderComp, AssetsProviderValue] = Assets.useProvider()
  const [RouterProviderComp, RouterProviderValue] = Router.useProvider()
  const [TownProviderComp, TownProviderValue] = Town.useProvider()
  const [PagerProviderComp, PagerProviderValue] = Pager.useProvider()
  const providers: ProviderItem[] = [
    [AssetsProviderComp, { value: AssetsProviderValue }],
    [RouterProviderComp, { value: RouterProviderValue }],
    [TownProviderComp, { value: TownProviderValue }],
    [PagerProviderComp, { value: PagerProviderValue }],
  ]
  return (<>
    <ProviderList providers={providers}>
      {props.children}
    </ProviderList>
  </>)
}

export default function Provider (props: PropsWithChildren) {
  return (<>
    <CommonProvider>
    <LogicProvider>
      {props.children}
    </LogicProvider>
    </CommonProvider>
  </>)
}
