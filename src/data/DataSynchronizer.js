import  { PunchBridge }  from './PunchBridge'
const Configuration   = require('../config/Configuration')
const config          = new Configuration()


export  class  DataSynchronizer{
      constructor(){
         this.client           = null;
         this.mongoBridgeURL   = config.mongoBridgeURL;
         this.punchBridge      = new PunchBridge({host: config.pouchDBServer, port:config.pouchDBPort, database: config.pouchDBDatabase})
         this.initPunchBridge();
         console.log("Initializing...")
      }

  async  initPunchBridge(){
        if(config.syncRemoteCouchdb){ 
        await this.punchBridge.createDB({
                "fetch_url":`http://${config.pouchDBServer}:${config.pouchDBPort}/${config.pouchDBDatabase}`
                ,"auth_username": config.pouchDBUsername
                ,"auth_password": config.pouchDBPassword
                ,"name": config.pouchDBDatabase
            })
        }else {
            await this.punchBridge.createDB({
                "name": config.pouchDBDatabase
            })
        }

    }

     sync(collection, matchingFields, watchedFields, query=null, selector={}) {
        console.log(`Synchronizing ${collection} data...`);
        
        try{ 
             if(query && Object.getOwnPropertyNames(query).length > 0 ){

                query= JSON.stringify(query);
             }
              let fetchUrl  = query?this.mongoBridgeURL+collection+'/'+query:this.mongoBridgeURL+collection;
              return  fetch(fetchUrl,  {
                    mode: 'cors',
                    headers: {
                      'Access-Control-Allow-Origin':'*'
                    }}).catch((error)=>{
                        console.log(`Data Sync Error: ${error}`)
               }).then(response => {
                       // console.log(response)
                        return response?response.json():null})
                       .then( (results )=>{
                 
                            if (results) { 
                               // console.log(results)
                                 return  this.punchBridge.syncDocs(results, {'selector': selector, 'limit':results.length, 'matchingFields':matchingFields, 'watchedFields': watchedFields})
                            }
                     }).then((count)=>{
                        console.log(`Update count: ${count}`)
                        return count
                     }).catch((error)=>{
                           console.log(error)
                  })


            }catch(e){
                console.log(e)
            }
        }


        closeMongoClient(){
            this.client.close();
        }

}


