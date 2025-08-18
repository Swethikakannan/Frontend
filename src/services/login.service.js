
import axios from "axios";

export function loginAPICall(loginModel)
{
    return axios.post("https://localhost:7157/api/Auth/login",loginModel)
}
