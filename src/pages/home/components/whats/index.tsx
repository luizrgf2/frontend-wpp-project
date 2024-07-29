import { useEffect, useState } from 'react'
import './style.css'
import { SocketClient } from '../../../../websocket/chat.socket'
import QRCode from 'react-qr-code'
import { SessionApi } from '../../../../api/session.api'
import { MessageApi } from '../../../../api/messages.api'
import { JsonComponent } from '../../../../components/jsonViewer'


export function MessageComponent() {
    const [messageToSend, setMessageToSend] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [json, setJson] = useState({})

    async function handleSendMessageToAllContacts() {
        const messagesAPi = new MessageApi()
        const res = await messagesAPi.sendMessageToAllContacts({
            textMessage: messageToSend
        })

        if(!res) return
        setShowModal(true)
        setJson(res)
    }


    return (
        <div
            className='messageComeponent'
        >

                <JsonComponent
                    json={json}
                    setShow={setShowModal}
                    show={showModal}
                ></JsonComponent>            
                <input
                    placeholder='Mensagem'
                    onChange={(event)=>setMessageToSend(event.target.value)}
                ></input>
                <button
                    onClick={handleSendMessageToAllContacts}
                >Enviar Mensagem</button>
        </div>
    )
}

export function WhatsComponent() {

    const [qrCode, setQrCode] = useState<string|undefined>(undefined)
    const [sessionState, setSessionState] = useState('')
    const [sendMessageActive, setSendMessageActive] = useState(false)
    const [startSessionActive, setStartSessionActive] = useState(true)


    function handleQrCode(qrCode: string) {
        setQrCode(qrCode)
    }

    function handleChangeSessionState(state: string) {
        setSessionState(state)

    }

    async function handleCreateSession() {
        const sessionApi = new SessionApi()
        await sessionApi.createSessionOrStop({
            actionSession: 'start'
        })
    }

    function handleConnectWebSoket() {
        new SocketClient({
            onQrCode: handleQrCode,
            onChangeSessionState: handleChangeSessionState
        })
    }   


    useEffect(()=>{
        handleConnectWebSoket()
    },[])

    useEffect(()=>{
        if(sessionState === "logged") {
            setSendMessageActive(true)
            setStartSessionActive(false)
        }
    }, [sessionState])


    return(
        <div
            className="whatsComponent"
        >
            <h1>Whats </h1>
            <p>Estado sessão: {sessionState}</p>

            {
                startSessionActive && (
                    <button
                        onClick={handleCreateSession}
                    >Iniciar Sessão</button>
                )
            }

            {
                sendMessageActive && (
                    <MessageComponent></MessageComponent>
                )
            }

            {
                qrCode !== undefined && (

                    <>
                        
                        <h1>QrCode</h1>
                        <QRCode

                            value={qrCode}
                        ></QRCode>
                    </>
                )
            }
        </div>
    )

}