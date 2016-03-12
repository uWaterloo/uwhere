//Getting locations

function getLocations(locationType) {
  var queryResult = db.Execute('SELECT * FROM @value');
  var rows = JSON.parse(queryResult);
  if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
     return '{"status":"noTable"}';
  }
  return queryResult;
}