// from data.js
var tableData = data;

// YOUR CODE HERE!
var tableBody = d3.select('tbody');
var button = d3.select('#filter-btn');

var columns = [
  'datetime',
  'city',
  'state',
  'country',
  'shape',
  'durationMinutes',
  'comments',
];

var createTable = (data) => {
  data.forEach((ufo) => {
    var row = tableBody.append('tr');
    columns.forEach((column) => row.append('td').text(ufo[column]));
  });
};

createTable(tableData);

button.on('click', () => {
  d3.event.preventDefault();

  var date = d3.select('#datetime');

  var dateInput = date.property('value').trim();

  var filteredData = tableData.filter((data) => data.datetime === dateInput);

  console.log(filteredData);

  tableBody.html('');

  if (filteredData.length > 0) {
    createTable(filteredData);
  } else {
    tableBody.html('Nothing Found!!');
  }
});
