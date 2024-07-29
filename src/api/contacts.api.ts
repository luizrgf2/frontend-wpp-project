import axios from "axios";
import { ApiBase } from "./base.api";


interface uploadContactsInput {
    contacts: string[]
}


export class ContactsApi {
    
    private base: ApiBase
    constructor() {
        this.base = new ApiBase()
    }
    async uploadContacts(input: uploadContactsInput) {
        try{
            await axios.post(this.base.createURL('contacts'), input )
            alert("Sucesso para salvar os contatos!")
        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }
}