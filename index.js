require("dotenv-safe").load({ sample: "./.env.requirements" });
require("es6-promise").polyfill();

var fetch = require("node-fetch");
var cloudwatch = require("./cloudwatch");
var metrics = require("./metrics");

var endpoint = process.env.ENDPOINT;
var namespace = process.env.NAMESPACE;
var stats = (process.env.STATS || "").split(/[\s,]+/).filter(isMetricAvailable);

if (stats.length === 0) {
  stats = Object.keys(metrics);
}

exports.handler = function(input, context) {
  fetch(endpoint + "/_cluster/stats")
    .then(toJSON)
    .then(convertToMetricData)
    .then(sendToCloudwatch)
    .then(context.succeed, context.fail);
};

function toJSON(res) {
  return res.json();
}

function convertToMetricData(data) {
  var metricData = [];

  stats.forEach(function(key) {
    var metric = metrics[key];
    metricData.push.apply(metricData, metric.toMetricData(data));
  });

  return metricData;
}

function sendToCloudwatch(metricData) {
  return cloudwatch.putMetricData({
    MetricData: metricData,
    Namespace: namespace
  });
}

function isMetricAvailable(key) {
  return metrics[key];
}
