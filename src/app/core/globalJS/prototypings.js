

Array.prototype.insert = function (item,index) {
  this.splice(index, 0, item);
  return this;
};


// To insert array and multiple items in Array as array object.
Array.prototype.insertArrayAsArray = function(index) {
    this.splice.apply(this, [index, 0].concat(
        Array.prototype.slice.call(arguments, 1)));
    return this;
};
//["a", "b", "c", "d"].insert1(2, "V", ["W", "X", "Y"], "Z") call like this will return:
//["a","b","V",["W","X","Y"],"Z","c","d"]


// To insert multiple items in Array
Array.prototype.insertArray = function(index) {
    index = Math.min(index, this.length);
    arguments.length > 1
        && this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
        && this.insertArray.apply(this, arguments);
    return this;
};
// ["a", "b", "c", "d"].insert2(2, 'Z', ["W", "X", "Y"]) call like this will return:
// ["a","b","V","W","X","Y","Z","c","d"]
