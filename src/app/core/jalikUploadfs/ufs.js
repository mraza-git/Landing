let stores = {};

UploadFS = {

    /**
     * Contains all stores
     */
    store: {},

    /**
     * Collection of tokens
     */
    tokens: new Mongo.Collection('ufsTokens'),

    /**
     * Returns the store by its name
     * @param name
     * @return {UploadFS.Store}
     */
    getStore: function (name)  {
        return stores[name];
    },

    /**
     * Returns all stores
     * @return {object}
     */
    getStores: function ()  {
        return stores;
    },

    /**
     * Returns the temporary file path
     * @param fileId
     * @return {string}
     */
    getTempFilePath: function (fileId)  {
        return UploadFS.config.tmpDir+'/'+fileId;
    },

    /**
     * Imports a file from a URL
     * @param url
     * @param file
     * @param store
     * @param callback
     */
    importFromURL: function (url, file, store, callback)  {
        if (typeof store === 'string') {
            Meteor.call('ufsImportURL', url, file, store, callback);
        }
        else if (typeof store === 'object') {
            store.importFromURL(url, file, callback);
        }
    }
};
