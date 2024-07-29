import { ConfigEnv } from "../config/config"
import axios, { AxiosError } from 'axios'

export class ApiBase {
    private url: string

    constructor() {
        this.url = ConfigEnv.backendUrl
    }

    createURL(route: string) {
        if(route.startsWith("/")) {
            return `${this.url}${route}`
        }
        return `${this.url}/${route}`
    }

    errorHandling(error: AxiosError) {
        if(!error.response) return alert('Api esta fora do ar!')
        if(!error.response.data) return alert('Erro desconhecido!')
        if(!(error.response.data as any).message) return alert('Erro desconhecido!')
        alert((error.response.data as any).message)
    }   

}