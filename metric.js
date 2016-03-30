function Metric(name, path, type) {
  this.name = name;
  this.path = path;
  this.type = type;
}

Metric.prototype.getValue = function(data) {
  return getValue(this.path.split("."), data);
}

Metric.prototype.toMetricData = function(data) {
  var name = this.name;
  var type = this.type;
  var values = [this.getValue(data)];

  return values.filter(isNumeric).map(function(value) {
    return {
      MetricName: name,
      Dimensions: [],
      Timestamp: new Date(),
      Unit: type,
      Value: value
    };
  });
};

function isNumeric(value) {
  return typeof(value) === "number" && !isNaN(value) && isFinite(value);
}

function getValue(path, object) {
  var name = path[0];
  var isObject = typeof(object) === "object";
  var value;

  if (name && isObject) {
    value = object[name];
    if (path.length > 1) {
      value = getValue(path.slice(1), value)
    }
  }

  return value;
}

module.exports = Metric;
