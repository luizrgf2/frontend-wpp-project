import { ConfigComponent } from './components/config'
import './style.css'
import { ContactsComponent } from './components/contacts'
import { WhatsComponent } from './components/whats'

export function HomePage() {

    return (
        <div className='defaultContainer'>
            <header></header>
            <h2>Configuração de intervalo</h2>
            <ConfigComponent></ConfigComponent>
            <h2>Upload de contatos</h2>
            <ContactsComponent></ContactsComponent>
            <WhatsComponent></WhatsComponent>
        </div>
    )
}