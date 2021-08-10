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
  var city = d3.select('#city');
  var state = d3.select('#state');
  var country = d3.select('#country');
  var shape = d3.select('#shape');

  var dateInput = date.property('value').trim();
  var cityInput = city.property('value').toLowerCase().trim();
  var stateInput = state.property('value').toLowerCase().trim();
  var countryInput = country.property('value').toLowerCase().trim();
  var shapeInput = shape.property('value').toLowerCase().trim();

  const filter = {
    datetime: dateInput,
    city: cityInput,
    state: stateInput,
    country: countryInput,
    shape: shapeInput,
  };

  function search(data) {
    // check all the value in the filter and return if it matches, empty value will be ignored
    return Object.keys(this).every((key) => {
      if (this[key] !== '') {
        return data[key] === this[key];
      }
      return true;
    });
  }

  var filteredData = tableData.filter(search, filter);

  console.log(filteredData);

  tableBody.html('');

  if (filteredData.length > 0) {
    createTable(filteredData);
  } else {
    tableBody.html('Nothing Found!!');
  }
});
