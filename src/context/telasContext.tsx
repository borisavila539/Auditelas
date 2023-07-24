import React, { createContext, useReducer } from "react";
import { TelasReducer } from "./telasReducer";

//Incializar variables a utilizar
export interface TelasState{
    apVendRoll: string,
    rollId: string,
    usuarioId:number,
    username: string,
    nameAlias: string
}

//Colocar valor por default
export const TelasInitialState : TelasState = {
    apVendRoll: '1',
    rollId: '1',
    usuarioId : 0,
    username: '',
    nameAlias: '1'
}

export interface TelasContextProps{
    telasState: TelasState,
    changeUserid: (userid: number) => void;
    changeUsername: (username: string) => void;
    changeRolloId: (rollId: string) => void;
    changeApVendRoll: (apVendRoll: string) => void;
    changeNameAlias:(nameAlias: string) => void;
}

export const TelasContext = createContext({} as TelasContextProps)

export const TelasProvider = ({ children }: any) => {
    const [telasState, dispatch] = useReducer(TelasReducer, TelasInitialState)

    const changeUserid = (userid: number) => {
        dispatch({ type: 'changeUserId', payload: userid })
    }
    const changeUsername = (username: string) => {
        dispatch({ type: 'changeUsername', payload: username })
    }
    const changeRolloId = (rollId: string) => {
        dispatch({ type: 'changeRolloId', payload: rollId })
    }
    const changeApVendRoll = (apVendRoll: string) => {
        dispatch({ type: 'changeApVendRoll', payload: apVendRoll })
    }
    const changeNameAlias = (nameAlias: string) => {
        dispatch({ type: 'changeNameAlias', payload: nameAlias })
    }
    return (
        <TelasContext.Provider value={{
            telasState,
            changeUserid,
            changeUsername,
            changeRolloId,
            changeApVendRoll,
            changeNameAlias
        }}>
            {children}
        </TelasContext.Provider>


    )
}
