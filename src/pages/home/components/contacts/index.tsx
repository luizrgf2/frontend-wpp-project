import { useRef, useState } from 'react'
import './style.css'
import { FileText } from '@phosphor-icons/react'
import { ContactsApi } from '../../../../api/contacts.api'

export function ContactsComponent() {

    const [contacts, setContacts] = useState<string[]>([])
    const [fileSelectedName, setFileSelectedName] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleSaveContacts() {
        if(contacts.length === 0) return alert("Deve existir algum contato!")

        const contactApi = new ContactsApi()
        await contactApi.uploadContacts({
            contacts: contacts.filter(contact=>contact.length > 0)
        })
    }

    async function handleChangeFile(files: FileList|null) {
        if(!files) return
        const file = files[0]
        setFileSelectedName(file.name)

        const contacts = (await file.text()).split("\n")

        setContacts(contacts)
    }

    return (
        <div
            className='contactComponent'
        >
            <button
                onClick={handleSaveContacts}
            >Salvar arquivo</button>
            
            <button
                id='buttonFile'
                onClick={()=>inputRef.current?.click()}
            >
                <FileText size={20} color="#ae24a2" weight="fill" />
            </button>

            <p>{fileSelectedName}</p>

            <input 
                required 
                accept="text/plain"
                ref={inputRef}
                type="file" 
                onChange={(event)=> handleChangeFile(event.target.files)}
            />
        </div>
    )
}