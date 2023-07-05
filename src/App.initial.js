
import './App.css';
import  React from  'react'
import { DataBuffer } from './data/DataBuffer';
//import { useContext, useMemo, useRef } from 'react';
const Configuration  =  require('./config/Configuration')
//const config          =  new Configuration()

function App() {

//const snapshot       =  useSnapshot(config.pouchDBDatabase)
//const isOnline       =   true;// useOnlineStatus();
//const dataVersionMap =  usePouchDB(isOnline);
// console.log(`snapshot: ${JSON.stringify(snapshot)}`)
const dataStore        = DataBuffer(); //useDatastore(dataVersionMap, snapshot);
//console.log(`dataStore: ${JSON.stringify(dataStore)}`)

   console.log("Loading application")
   let tableHeader=<tr><th>dummy</th></tr>;
   let tableBody=<tr><td>dummy</td></tr>;
 
   if (dataStore && dataStore[0] && dataStore[0]['data'] && Object.keys(dataStore[0]['data']).length > 0 ){ 
        let rows        = dataStore[0]['data'].slice(0,9);
        tableHeader = (
            <tr>
              {Object.keys(rows[0]).map((header,key)=><th key={key}>{header}</th>)} 
            </tr>
        )
        tableBody = rows.map((row, key)=> <tr key={key}>{ Object.values(row).map((field, id)=><td key={id}>{JSON.stringify(field)}</td>) }</tr>)
    }

  return (
 <div  className="app">
 <table>
  <thead>{tableHeader}</thead>
  <tbody> {tableBody}</tbody>
 </table>
</div>
  );
}

export default App;
