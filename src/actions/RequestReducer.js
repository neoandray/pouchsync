function addRecord(datastore, collectionName, record){
    
    let updatedDatastore = []
    let collectionData   = datastore.filter((collection)=> collection.name ===collectionName)[0]
     if(collectionData){
        collectionData['data']     =  [...collectionData['data'],record];
        collectionData['version'] +=1
        updatedDatastore = datastore.map((collection)=>{  
            if(collection.name ===collectionName){
                return collectionData

            }else{
 
                 return collection;
                
            }
        }
            )

     }

     return updatedDatastore;

}
function editEntry(datastore, collectionName, record){

    let updatedDatastore = []
    let collectionData   = datastore.filter((collection)=> collection.name ===collectionName)[0]
     if(collectionData){
        collectionData['data']     =  collectionData['data'].map((data)=>{
                                            if(data._id === record._id){
                                                return record;
                                            }else{
                                            return data;
                                            }
                                    });
        collectionData['version']  +=1
        updatedDatastore = datastore.map((collection)=>{  
            if(collection.name ===collectionName){
                return collectionData

            }else{
 
                 return collection;
                
            }
        }
            )

     }

     return updatedDatastore;

}
function removeEntry(datastore, collectionName, recordId){
    let updatedDatastore = []
    let collectionData   = datastore.filter((collection)=> collection.name ===collectionName)[0]
     if(collectionData){
        collectionData['data']     =  collectionData['data'].filter((data)=>{
                                            if(data._id !== recordId){
                                                return data;
                                            }
                                    });
        collectionData['version']  +=1
        updatedDatastore = datastore.map((collection)=>{  
            if(collection.name ===collectionName){
                return collectionData
            }else{
                 return collection; 
            }
        }
            )
     }
     return updatedDatastore;

}

function updateCollectionData(datastore, collectionName, collectionData, collectionVersion){
  let updatedDatastore 		       = []
   if(collectionData){
      collectionData['data']     =  collectionData;
      collectionData['version'] +=  collectionVersion;
      updatedDatastore 		   = datastore.map((collection)=>{  
          if(collection.name ===collectionName){
              return collectionData
          }else{
               return collection; 
          }
      }
          )
   }
   return updatedDatastore;
}

export default function RequestReducer(datastore, eventData) {
    switch (eventData.type) {
     case 'sync':{ 
        return eventData.data
     }
     case 'updateCollection':{
        return updateCollectionData(datastore, eventData.collection,eventData.data,eventData.version )
     }
      case 'added': {
        return [
          ...datastore,
          {
            id: datastore.id,
            text: datastore.text,
            done: false,
          },
        ];
      }
      case 'changed': {
        return datastore.map((t) => {
          if (t.id === datastore.task.id) {
            return datastore.task;
          } else {
            return t;
          }
        });
      }
      case 'deleted': {
        return datastore.filter((t) => t.id !== datastore.id);
      }
      default: {
        throw Error('Unknown datastore: ' + datastore.type);
      }
      
    }
  }
  