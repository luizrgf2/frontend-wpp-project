import axios from "axios";
import { ApiBase } from "./base.api";


interface ConfigApiSetConfigInput {
    startTime: number,
    endTime: number
}

export class ConfigApi {
    
    private base: ApiBase
    constructor() {
        this.base = new ApiBase()
    }

    async setConfig(input: ConfigApiSetConfigInput) {
        try{
            await axios.put(this.base.createURL('config'), input )
            alert("Sucesso para salvar a configuração de intervalo!")
        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }

    async getConfig(): Promise<ConfigApiSetConfigInput|undefined> {
        try{
            const res = await axios.get(this.base.createURL('config') )
            return res.data as ConfigApiSetConfigInput
        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }
}