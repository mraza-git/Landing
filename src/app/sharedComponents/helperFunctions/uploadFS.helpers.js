/**
 * Converts DataURL to Blob object
 *
 * https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
 *
 * @param  {String} dataURL
 * @return {Blob}
 */

 var dataURLToBlob = function (dataURL) {
  var BASE64_MARKER = ';base64,';

  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);

    return new Blob([raw], { type: contentType });
  }

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}



/**
 * Converts Blob object to ArrayBuffer
 *
 * @param  {Blob}       blob          Source file
 * @param  {Function}   callback      Success callback with converted object as a first argument
 * @param  {Function}   errorCallback Error callback with error as a first argument
 */
var blobToArrayBuffer = function (blob, callback, errorCallback) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(blob);

  reader.onload = function (e)  {
    callback(e.target.result);
  };

  reader.onerror = function (e)  {
    if (errorCallback) {
      errorCallback(e);
    }
  };
}


/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */

var upload = function (dataUrl, name, progress ,resolve, reject) {
  // convert to Blob
  var blob = dataURLToBlob(dataUrl);
  blob.name = name;
  // pick from an object only: name, type and size
  var photo = _.pick(blob, 'name', 'type', 'size');
  var worker = new UploadFS.Uploader({
    data: blob,
    file: photo,
    store: 'images',
    // Optimize speed transfer by increasing/decreasing chunk size automatically
    adaptive: true,
    // The size of each chunk sent to the server
    chunkSize: 8 * 1024, // 8k
    // The max chunk size (used only if adaptive = true)
    maxChunkSize: 128 * 1024, // 128k
    // This tells how many tries to do if an error occurs during upload
    maxTries: 5,
    // The error callback
    onError: reject,
    //Complete callback
    onComplete: resolve,
    //Progress callback
    onProgress:progress,
  });
  worker.start();
}

