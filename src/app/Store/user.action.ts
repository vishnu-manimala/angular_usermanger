import { createAction, props } from "@ngrx/store";
import { User } from "src/Models/user..model";

export const LOGIN_START = '[LOGIN] login start';
export const LOGIN_SUCCESS = '[LOGIN] login success';
export const LOGOUT = '[LOGIN] logout';

export const loginStart = createAction(LOGIN_START, props<{email:string, password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user : User}>());
export const logout = createAction(LOGOUT);