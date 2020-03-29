class CV_idb {
    constructor(dbName="cv_defaultDB",dbStoreName="cv_defaultStore",objCollection=null){
        this.dbName=dbName;
        this.dbStoreName=dbStoreName;
        this.newCollection=objCollection;

           /* Browsers competability */
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;        
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        if (!window.indexedDB) { throw new Error("Your browser doesn't support a stable version of IndexedDB."); }

        /********************** */

        // indexedDB Request and Events

        this.dbReq = window.indexedDB.open(this.dbName)


    }
}