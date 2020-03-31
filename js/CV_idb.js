class CV_idb {
    constructor(dbName="cv_defaultDB",
                dbStoreName="cv_defaultStore",
                objCollection=null,
                primaryKey="cv_id",
                indexCol=null){
        this.dbName=dbName;
        this.dbStoreName=dbStoreName;
        this.dbObjList=objCollection;     
        this.dbStoreKey= { keyPath: primaryKey , autoIncrement:true } ;        
        this.indexList = indexCol;
        this.dbVer=1;        
            
    }

    evaluate(){
        /* Browsers competability */
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;        
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        if (!window.indexedDB) { throw new Error("Your browser doesn't support a stable version of IndexedDB."); }

        /********************** */

        /* indexedDB Request and Events */

        let req = indexedDB.open(this.dbName,this.dbVer);
        req.onerror = function(e) {     throw new Error("Database Request Error: "+e.target.errorCode); }
        req.onsuccess = function(e) {   console.log("onsuccess fired: " + this.dbName + " activate..."); }
        req.onblocked = function(e) {   throw new Error("Database Request Blocked: "+e.target.errorCode); }

        req.onupgradeneeded = function(e) { //assume first time created assume objslist is not null add checks later
            let db = e.target.result;
            if (e.oldVersion < 1) {
                let dbStore = db.createObjectStore(this.dbStoreName,this.dbStoreKey);
                let objStore = dbStore.createObjectStore(this.dbStoreName);
                for (let i in this.dbObjList) { objStore.add(this.dbObjList[i]); }
                /* let titleIndex = store.createIndex("by_title", "title", {unique: true}); indexes maybe later
                since i think i can getAll => objectList and implement sorting for myself
                i ve just havnt got a decision what is better 
                maybe creating later extensions with another store
                */
            }           
        }
        
        req.onsuccess = function(e) {
            let db = e.target.result;
            let tx = db.transaction(this.dbStoreName,"readwrite");
            let dbStore = tx.createObjectStore(this.dbStoreName,this.dbStoreKey);
            let objStore = dbStore.createObjectStore(this.dbStoreName);
            for (let i in this.dbObjList) { objStore.put(this.dbObjList[i]); }
            tx.oncomplete = function () { db.close(); }
        }
    }



}

/*
       some ideas
       /**
        * here i should implement indexes to apply line
        * index = indexList.pop() and store.index(indexlist.pop()[0])
        * or something similar after break...
        * throw error if the element isnot exist as obj key
        * its err of request.reult obj and not request...
        * mean request.result.err diff request.err
        * dont forget to throw err
        */
       /*this.store.put( this.objCollection.pop ) //fix later

       // x=store.get(pkeyval); x=store.index(indexname).get(idxval)
       // x.onsuccess = () => console.log(x.result.objkey)

       

   }
  
*/