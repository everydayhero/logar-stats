var AWS = require("aws-sdk");
var cloudwatch = new AWS.CloudWatch({apiVersion: '2010-08-01'});

exports.Promise = global.Promise;

exports.putMetricData = function(params) {
  return new this.Promise(function(resolve, reject) {
    cloudwatch.putMetricData(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
