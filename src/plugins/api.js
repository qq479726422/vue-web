import { get,post } from "./http";

export const postLogin= (param) => post("/login",param);
export const getList= () => get("/list");
export const getDetail= (param) => get("/details",param);
