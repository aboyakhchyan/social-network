import axios from "axios";
import { IChangePwd, ILogin, InputUser, IResponse } from "./types";

const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const handleSignup = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post('/signup', user)

    return response.data
}

export const handleLogin = async (user: ILogin): Promise<IResponse> => {
    const response = await Axios.post('/login', user)

    return response.data
}

export const handleVerify = async (): Promise<IResponse> => {
    const response = await Axios.get('/verify')

    return response.data
}

export const handlelogout = async (): Promise<IResponse> => {
    const response = await Axios.post('/logout')

    return response.data
}

export const handleChangePwd = async (data: IChangePwd): Promise<IResponse> => {
    const response = await Axios.patch('/update/password', data)

    return response.data
}

export const handleChangeLog = async (data: ILogin): Promise<IResponse> => {
    const response = await Axios.patch('/update/login', data)

    return response.data
}