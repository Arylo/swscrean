import { PropsWithChildren } from "react";

export default function If (props: PropsWithChildren<{ condition: boolean }>) {
    if (!props.condition) return null
    return props.children
}