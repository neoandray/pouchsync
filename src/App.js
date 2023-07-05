
import './App.css';
import  React, { useMemo, useReducer,useRef }from  'react'
import { useSnapshot } from './hooks/useSnapshot';
import Preloader from './components/Preloader'
import NavBar from './components/nav/Navbar'
import RequestHandler from './actions/RequestHandler'
import RequestReducer from './actions/RequestReducer'
import { useOnlineStatus } from './hooks/useOnlineStatus'

const Configuration                 =  require('./config/Configuration');
const defaultProperties             =  require('./data/DefaultProperties');

const config                        =  new Configuration()
const  dataVersionMap               = {}
config.syncInfo.forEach((collection)=>{ dataVersionMap[collection.collectionName] =0})
const requestHandler                 = new RequestHandler();

//const config          =  new Configuration()

function App() {

  const pouchDatabase             = config.pouchDBDatabase
  const initialDataStore          = useSnapshot(pouchDatabase);
  const isOnline                  = useOnlineStatus()
  const [datastore, dispatch]     = useReducer(RequestReducer, initialDataStore);
  requestHandler.init(datastore,dispatch,isOnline)
  console.log(`dataVersionMap: ${JSON.stringify(dataVersionMap)}`)
  requestHandler.startDataSync(dataVersionMap)

  //startDataSync(dataVersionMap)
  


/*
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
        tableBody = rows.map((row, key)=> <tr key={key}>{ Object.defaultValues(row).map((field, id)=><td key={id}>{JSON.stringify(field)}</td>) }</tr>)
    }
    */
  return ( 
   
 
    <div className="wrapper">
      <Preloader />
      <NavBar props={defaultProperties.Navbar} />

  </div>
  
  );
}

export default App;
