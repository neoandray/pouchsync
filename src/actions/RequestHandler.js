import { useDatastore } from '../hooks/useDatastore';
import { PunchBridge }  from '../data/PunchBridge'
import { DataSynchronizer }  from '../data/DataSynchronizer'
const Configuration   = require('../config/Configuration')

const config          = new Configuration()

class RequestHandler{

  static datastore            = null;
  static dispatch             = null;
  static isOnline             = null;
  static fetchUrl             = config.mongoBridgeURL;
  static punchBrigde          = null;

  constructor(){

  }

  init(datastore,dispatch,isOnline){
     
    RequestHandler.datastore   = datastore;
    RequestHandler.dispatch    = dispatch;
    RequestHandler.isOnline    = isOnline;
    RequestHandler.punchBrigde =  new PunchBridge({host: config.pouchDBServer, port:config.pouchDBPort, database: config.pouchDBDatabase})
   
 }

 startDataSync(collectionVersionMap){
       console.log(`Starting sync: ${RequestHandler.datastoreSyncStarted} for ${JSON.stringify(collectionVersionMap)}`)
       useDatastore(collectionVersionMap,  function(datastore){
       console.log("Received Sync Response")
       if( RequestHandler.isOnline ){
       if(datastore && datastore.length > 0){
          for(let collection of datastore){
             let name          = collection['name']
             let version       = collection['version']
    
             let oldCollection =  RequestHandler.datastore.filter(x=>x.name ==name)
             if(oldCollection.length > 0){
             
                oldCollection = oldCollection[0]
                if(version!==oldCollection.version){
                  
                  RequestHandler.datastore = datastore;
                  RequestHandler.dispatch({
                     type: 'sync'
                    ,data:  datastore
                 });
                  break;
                }
            }
        }
        }
      }else{
        console.log("Cannot Sync while offline")
      }
         }) 
 
}


static async  getPouchConnection(){ 

   if(config.syncRemoteCouchdb){ 
       await RequestHandler.punchBrigde.createDB({
           "fetch_url":`http://${config.pouchDBServer}:${config.pouchDBPort}/${config.pouchDBDatabase}`
           ,"auth_username": config.pouchDBUsername
           ,"auth_password": config.pouchDBPassword
           ,"name": config.pouchDBDatabase
       })
   }else {
       await  RequestHandler.punchBrigde.createDB({
           "name": config.pouchDBDatabase
       })
   }
 
 }

 static  async getData(collection, selector={}){

   RequestHandler.getPouchConnection();
   let collectionSelect = selector// new Selector() ;
   let recordData       = await  RequestHandler.punchBrigde.find({selector: collectionSelect});
   recordData           = Object.getOwnPropertyNames(recordData).map((x)=>x.toLowerCase()).indexOf('docs')>-1? recordData['docs']: recordData;
   let latestVersion    = RequestHandler.datastore.filter((collection)=>collection.name === collection )[0]
   latestVersion        = latestVersion?latestVersion.version:0;
   console.log(`recordData: ${JSON.stringify(recordData)}`)
   return {"name":collection, "data":recordData,"version":latestVersion}

}

syncCollection(collectionName){
      const  dataSynchronizer    = new DataSynchronizer();
      const promises  				     = [];
      if(RequestHandler.isOnline){ 
        config.syncInfo.filter((collection)=> collection.collectionName===collectionName).map((collection)=>
        {
          dataSynchronizer.sync(collection.collectionName, collection.matchingFields,collection.watchedFields).then((updateCount)=>{

          if(updateCount >0 ){

            collection.version+=1;
            promises.push(RequestHandler.getData(collection))  

          }
          })
          
        })
        
        Promise.all(promises).then(results => {
              RequestHandler.dispatch({
              type: 'updateCollection'
              ,collectionData:  results
          });
      })
		
}


}
runRemoteGet(queryParams){

  let fetchUrl  = Object.keys(queryParams).indexOf('query') > -1?RequestHandler.fetchUrl+queryParams.collection+'/'+queryParams.query:RequestHandler.fetchUrl+queryParams.collection;
  if( RequestHandler.isOnline ){
  return  fetch(fetchUrl,  {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }}).catch((error)=>{
            console.log(`Data Fetch Error: ${error}`)
   }).then(response => {
           // console.log(response)
            return response?response.json():null})
           .then( (results )=>{
     
                if (results) { 
                   // console.log(results)
                     return results
                }
         }).then((count)=>{
            console.log(`Update count: ${count}`)
            return count
         }).catch((error)=>{
               console.log(error)
      })
    } else{
       alert("Cannot connect to server")
    }
}

runPost(queryParams){

  let fetchUrl  = Object.keys(queryParams).indexOf('query') > -1?RequestHandler.fetchUrl+queryParams.collection+'/'+queryParams.query:RequestHandler.fetchUrl+queryParams.collection;
  let data      = Object.keys(queryParams).indexOf('data') > -1?JSON.stringify(data): null
  if( null && RequestHandler.isOnline ){
  return  fetch(fetchUrl,  {
                      mode: 'cors'
                      , method: "POST"
                      ,headers: {
                      "Content-Type": "application/json"
                      ,"Access-Control-Allow-Origin":"*"
                      }
                      ,body: data
  }).catch((error)=>{
            console.log(`Data Fetch Error: ${error}`)
   }).then(response => {
           // console.log(response)
            return response?response.json():null})
           .then( (results )=>{
     
                if (results) { 
                   // console.log(results)
                     return results
                }
         }).then((count)=>{
            console.log(`Update count: ${count}`)
            return count
         }).catch((error)=>{
               console.log(error)
      })
    } else{
       alert("Cannot connect to server or invalid data format")
    }

}

 handleAddTask(text) {
  this.dispatch({
      type: 'added',
      id: 1,
      text: text,
    });
  }

   handleChangeTask(task) {
    this. dispatch({
      type: 'changed',
      task: task,
    });
  }

   handleDeleteTask(taskId) {
    this. dispatch({
      type: 'deleted',
      id: taskId,
    });
  }


}
export default  RequestHandler
