import axios from "axios";
import { ApiBase } from "./base.api";

interface sendMessageToAllContactsOutput {
    contacts: {
        contact: string,
        state: 'queue' | 'finalized'
    } []

}


interface sendMessageToAllContactsInterface {
    textMessage: string
}

interface sendMessageToContactInterface {
    textMessage: string
    contactNumber: string
}

export class MessageApi {
    
    private base: ApiBase
    constructor() {
        this.base = new ApiBase()
    }
    async sendMessageToAllContacts(input: sendMessageToAllContactsInterface): Promise<sendMessageToAllContactsOutput|undefined> {
        try{
            const res = await axios.post(this.base.createURL('messages/send/text/many'), input )
            alert("Sucesso para enviar menssagem para os contatos!")
            return res.data

        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }

    async sendMessageToContact(input: sendMessageToContactInterface) {
        try{
            await axios.post(this.base.createURL('messages/send/text'), input )
            alert("Sucesso para enviar menssagem para o contato!")
        }catch(e) {
            this.base.errorHandling(e as any)
        }
    }
}