var util = require("util");
var Metric = require("./metric");

var statuses = ["green", "yellow", "red"];

function StatusMetric() {
  Metric.apply(this, arguments);
}

util.inherits(StatusMetric, Metric);

StatusMetric.prototype.toMetricData = function(data) {
  var name = this.name;
  var type = this.type;
  var timestamp = new Date();
  var value = this.getValue(data);

  return statuses.map(function(status) {
    var metricValue = status === value ? 1 : 0;
    var metricName = name + (status[0].toUpperCase() + status.substr(1));

    return {
      MetricName: metricName,
      Dimensions: [],
      StatisticValues: {
        Maximum: 0.0,
        Minimum: 0.0,
        SampleCount: 0.0,
        Sum: 0.0
      },
      Timestamp: timestamp,
      Unit: type,
      Value: metricValue
    };
  });
};

module.exports = StatusMetric;
