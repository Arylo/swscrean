import React from 'react'

type ProviderElementItem<
  T extends (props: React.PropsWithChildren<any>) => JSX.Element = (props: React.PropsWithChildren<any>) => JSX.Element,
  P extends object = {},
> = [
  T,
  P,
]
type ProviderProviderItem<
  ContextContent = any,
> = [
  React.Provider<ContextContent>,
  React.ProviderProps<ContextContent>,
]

export type ProviderItem = ProviderElementItem | ProviderProviderItem

interface ProviderListProps {
  providers: ProviderItem[]
}

export default function ProviderList (props: React.PropsWithChildren<ProviderListProps>)  {
  const { providers, children } = props
  if (providers.length === 0 || !providers[0]) return <>{children}</>
  const [Comp, value = {}] = providers[0] as [(props: React.PropsWithChildren<any>) => JSX.Element, object]
  return <Comp {...value}>
    <ProviderList providers={providers.slice(1)}>
      {children}
    </ProviderList>
  </Comp>
}
