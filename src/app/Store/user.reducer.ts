import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.state";
import { state } from "@angular/animations";
import { loginStart, loginSuccess, logout } from "./user.action";


export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action)=>{
        return {
            ...state,
            isLogged : true,
            user : action.user
        }
    }),
    on(logout, (state)=>{
        return {
            ...state,
            isLogged : false,
            user : null
        }
    })
)