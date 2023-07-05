import { useDatastore } from '../hooks/useDatastore';
//import {  useState,useEffect } from 'react'

export function DataBuffer(){
   /* const tempDatastore  = useDatastore()
    const [datastore, setDataStore] = useState([])
    const version  = datastore && datastore.length >0 && datastore[0]?.version?datastore[0].version:0
    useEffect(()=>{
        setDataStore(tempDatastore)

    },[version])

    return datastore
    */
    return useDatastore()
}