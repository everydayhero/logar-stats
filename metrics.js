var Metric = require("./metric");
var StatusMetric = require("./status_metric");

module.exports = {
  status: new StatusMetric("Status", "status", "Count"),
  indices: new Metric("Indices", "indices.count", "Count"),
  nodes: new Metric("Nodes", "nodes.count.total", "Count"),
  total_storage: new Metric("TotalStorage", "nodes.fs.total_in_bytes", "Bytes"),
  free_storage: new Metric("FreeStorage", "nodes.fs.free_in_bytes", "Bytes"),
  available_storage: new Metric("AvailableStorage", "nodes.fs.available_in_bytes", "Bytes")
};
