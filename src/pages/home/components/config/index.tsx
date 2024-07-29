import { useEffect, useState } from 'react'
import { ConfigApi } from '../../../../api/config.api'
import { InputCustom } from '../../../../components/inputCustom'
import './style.css'

export function ConfigComponent() {

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    async function handleSaveConfig() {
        const configApi = new ConfigApi()
        await configApi.setConfig({
            endTime: +endTime,
            startTime: +startTime
        })
    }

    async function handleLoadConfig() {
        const configApi = new ConfigApi()
        const res = await configApi.getConfig()
        if(!res) return
        setStartTime(res.startTime.toString())
        setEndTime(res.endTime.toString())
    }

    useEffect(()=> {
        handleLoadConfig()
    }, [])

    return (
        <div
            className='configComponent'
        >

            <InputCustom
                value={startTime}
                onChange={(event)=>setStartTime(event.target.value)}
                type='number'
                placeholder='intervalo inicial'
            ></InputCustom>

            <p>Até</p>

            <InputCustom
                value={endTime}
                onChange={(event)=>setEndTime(event.target.value)}
                type='number'
                placeholder='intervalo final'
            ></InputCustom>

            <button
                onClick={handleSaveConfig}
            >Salvar</button>
        </div>
    )
}