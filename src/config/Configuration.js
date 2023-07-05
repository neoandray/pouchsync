class Configuration{

  constructor(){

    this.mongoBridgeURL     = "http://127.0.0.1:3113/data/"     ;

    this.pouchDBPort         = 5984;
    this.pouchDBUsername     = "neo";
    this.pouchDBPassword     = "Pasword123";
    this.pouchDBDatabase     = "mongosync";
    this.pouchDBServer       = "127.0.0.1";
    this.syncInterval        =  5000
    this.syncInfo            = [
                                  {"collectionName": "listingsAndReviews"
                                  , "matchingFields":["_id"]
                                  , "watchedFields": ["last_review"]
                                  , "selector":{"userID":"@userID"}
                                  }
                               ]
    this.syncRemoteCouchdb   = false;


}

}

module.exports =  Configuration

