import { TelasState } from "./telasContext";

type TelasAction =
    | { type: 'changeUserId', payload: number }
    | { type: 'changeUsername', payload: string }
    | { type: 'changeRolloId', payload: string }
    | { type: 'changeApVendRoll', payload: string }
    | { type: 'changeNameAlias', payload: string }
    | { type: 'changeIdRollo', payload: string }
    | { type: 'changeSeleccionAuditoria', payload: string }

export const TelasReducer = (state: TelasState, action: TelasAction): TelasState => {

    switch (action.type) {
        case "changeUserId":
            return { ...state, usuarioId: action.payload }
        case "changeUsername":
            return { ...state, username: action.payload }
        case "changeRolloId":
            return { ...state, rollId: action.payload }
        case "changeApVendRoll":
            return { ...state, apVendRoll: action.payload }
        case "changeNameAlias":
            return { ...state, nameAlias: action.payload }
        case "changeIdRollo":
            return { ...state, IdRollo: action.payload }
        case "changeSeleccionAuditoria":
            return { ...state, SeleccionAuditoria: action.payload }
        default:
            break;
    }

    return state
}