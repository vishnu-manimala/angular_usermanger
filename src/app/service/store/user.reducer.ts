import { state } from "@angular/animations"
import { createReducer, on } from "@ngrx/store"

import { initialstate } from "./user.state";
import { adduser, deleteuser } from "./user.actions";


const _userDataManager = createReducer(
    initialstate,
    on(adduser, (state) => {
        console.log("va");
       return 1;
    }),
    
    on(deleteuser, (state) => {
        console.log("reducer",state);

        return 0
    }),
)
export function userDataManager(state:number, action: any) {
    return _userDataManager(state, action)
}