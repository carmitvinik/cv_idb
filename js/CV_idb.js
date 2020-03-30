class CV_idb {
    constructor(dbName="cv_defaultDB",
                dbStoreName="cv_defaultStore",
                objCollection=null,
                primaryKey="cv_id",
                indexCol=null){
        this.dbName=dbName;
        this.dbStoreName=dbStoreName;
        this.newCollection=objCollection;
        this.db=null;
        this.dbStore=null;
        this.dbTransaction=null;
        this.dbIndex=null;
        this.dbVer=1;
        this.primaryKey= { keyPath: primaryKey , autoIncrement:true } ;
        this.objectList=null;
        this.indexList = indexCol;

           /* Browsers competability */
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;        
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        if (!window.indexedDB) { throw new Error("Your browser doesn't support a stable version of IndexedDB."); }

        /********************** */

        // indexedDB Request and Events

        this.dbReq = window.indexedDB.open(this.dbName,this.dbVer);

        this.dbReq.onerror = function(e) {
            throw new Error("Database Request Error: "+e.target.errorCode);
        }
        this.dbReq.onsuccess = function(e) {
            console.log("Database Request success: " + this.dbName + " activate...");
            this.db=e.target.result;
            this.dbTransaction=this.db.transaction(this.dbStoreName,"readwrite");
            this.store = this.dbTransaction.objectStore(this.dbStoreName);
            /**
             * here i should implement indexes to apply line
             * index = indexList.pop() and store.index(indexlist.pop()[0])
             * or something similar after break...
             */

        }
        this.dbReq.onblocked = function(){
            throw new Error("Database Request Blocked");
        }
        this.dbReq.onupgradeneeded = function(e) {
            this.db = e.target.result;
            this.dbStore = this.db.createObjectStore(this.dbStoreName,this.primaryKey);


        }

    }
}