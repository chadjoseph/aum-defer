import each from 'aum-each';

function Defer(successCallback, failureCallback) {
  var next = [], promiseValue;

  this.promise = {};

  this.promise.then = function (successCallback, failureCallback) {
    var deferred = new Defer(successCallback, failureCallback);

    next.push(deferred);

    return deferred.promise;
  };

  this.reject = function (value) {
    promiseValue = value;

    try {
      if (failureCallback) {
        promiseValue = failureCallback(promiseValue);
      }
    }
    catch (e) {
      promiseValue = e;

      throw e;
    }

    each(next, function (deferred) {
      deferred.reject(promiseValue);
    });
  };

  this.resolve = function (value) {
    promiseValue = value;

    try {
      if (successCallback) {
        promiseValue = successCallback(promiseValue);
      }
    }
    catch (e) {
      promiseValue = e;

      throw e;
    }

    each(next, function (deferred) {
      deferred.resolve(promiseValue);
    });
  };
}

export default Defer;

