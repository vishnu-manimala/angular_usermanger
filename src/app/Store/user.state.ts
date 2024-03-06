import { User } from "src/Models/user..model";

export interface AppState {
    isLogged : boolean;
    user : User;
}

export const initialState : AppState = {
    isLogged : false,
    user : {
        name : "",
        phone : 0,
        email : "",
    }
}