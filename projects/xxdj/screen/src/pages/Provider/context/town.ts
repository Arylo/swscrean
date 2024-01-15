import { createContext, useContext, useState } from "react";

type BtnIndexType = 0 | 1 | 2 | 3

interface TownContextContent {
    townIndex: number,
    btnIndex: BtnIndexType,
    clickBtn(btnIndex: number, townIndex?: number): any,
}

const context = createContext<TownContextContent>({
    townIndex: 0,
    btnIndex: 0,
    clickBtn(btnIndex: BtnIndexType, townIndex?: number) {
        console.log('btnIndex', btnIndex)
        console.log('townIndex', townIndex)
    },
})

export const useProvider = () => {
    const [townIndex, setTownIndex] = useState(0)
    const [btnIndex, setBtnIndex] = useState(0)
    const Comp = context.Provider
    const value = {
        townIndex: townIndex,
        btnIndex: btnIndex,
        clickBtn(btnIndex: BtnIndexType, townIndex?: number) {
            setBtnIndex(btnIndex)
            if (typeof townIndex === 'number') {
                setTownIndex(townIndex)
            }
        },
    }
    return [Comp, value] as [typeof Comp, TownContextContent]
}

export const useTownIndex = () => {
    const { townIndex } = useContext(context)
    return townIndex
}

export const useBtnIndexState = () => {
    const { btnIndex, clickBtn } = useContext(context)
    return [btnIndex, clickBtn] as [BtnIndexType, typeof clickBtn]
}
