import axios from "axios";
import { ApiBase } from "./base.api";


interface createSessionOrStopInput {
    actionSession: 'start' | 'stop'
}

export class SessionApi {
    
    private base: ApiBase
    constructor() {
        this.base = new ApiBase()
    }
    async createSessionOrStop(input: createSessionOrStopInput) {
        try{
            await axios.post(this.base.createURL('session'), input )
            alert("Sucesso para fazer o controle da sessão!")
        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }
}