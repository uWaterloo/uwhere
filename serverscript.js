//Getting locations

function getLocations(locationType) {
  var options = 'SELECT * FROM ' + locationType;
  var queryResult = db.Execute(options);
  var rows = JSON.parse(queryResult);
  if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
     return '{"status":"noTable"}';
  }
  return queryResult;
}