import { PropsWithChildren } from "react";
import * as Router from "./context/route";
import * as Town from "./context/town";
import * as Assets from "./context/assets";
import * as Pager from "./context/pager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
    Router,
    Town,
    Assets,
    Pager,
}

const queryClient = new QueryClient()

function ParentProvider (props: PropsWithChildren) {
    return (<>
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    </>)
}

function ChildrenProvider (props: PropsWithChildren) {
    const [RouterProviderComp, RouterProviderValue] = Router.useProvider()
    const [TownProviderComp, TownProviderValue] = Town.useProvider()
    const [AssetsProviderComp, AssetsProviderValue] = Assets.useProvider()
    const [PagerProviderComp, PagerProviderValue] = Pager.useProvider()
    return (<>
        <RouterProviderComp value={RouterProviderValue}>
        <TownProviderComp value={TownProviderValue}>
        <AssetsProviderComp value={AssetsProviderValue}>
        <PagerProviderComp value={PagerProviderValue}>
            {props.children}
        </PagerProviderComp>
        </AssetsProviderComp>
        </TownProviderComp>
        </RouterProviderComp>
    </>)
}

export default function Provider (props: PropsWithChildren) {
    return (<>
        <ParentProvider>
        <ChildrenProvider>
            {props.children}
        </ChildrenProvider>
        </ParentProvider>
    </>)
}