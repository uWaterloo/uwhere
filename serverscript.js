//Getting locations

function getLocations() {
  var options = 'SELECT * FROM ' + args.Get("value");
  var queryResult = db.Execute(options);
  var rows = JSON.parse(queryResult);
  if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
     return '{"status":"noTable"}';
  }
  return queryResult;
}