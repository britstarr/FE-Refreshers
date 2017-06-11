/*
  Remove a previously added person from the list
    The user can resubmit a new list that would override the previous one

  Display the household list in the HTML as it is modified

  Serialize the household as JSON upon form submission as a fake trip to the server
    On submission, put the serialized JSON in the provided "debug" DOM element and display that element.

  After submission the user should be able to make changes and submit the household again.
*/

window.onload = function() {
  var list = document.createElement('ul');
  list.className = 'addedMembers';
  document.body.appendChild(list);
};

var familyData = [];

document.getElementsByClassName('add')[0].addEventListener('click', function() {
  var ageValue = document.getElementsByName('age')[0].value;
  var relValue = document.getElementsByName('rel')[0].value;
  var smokerValue = document.getElementsByName('smoker')[0].checked;
  var smokerStatus = 'Non-Smoker';
  var member = document.createElement('li');
  var data = ageValue + ', ' + relValue + ', ' + smokerStatus;
  var mbID;

  if (!ageValue.length && !relValue.length) {
    alert('Please complete the form with valid data. If you\'re done adding your family members, please click submit instead.');
  }

  if (smokerValue === true) {
    smokerStatus = 'Smoker';
  }

  mbID = familyData.push(data) - 1;

  member.className = 'member';
  member.innerHTML = ageValue + ', ' + relValue + ' (' + smokerStatus + ') - <span class="remove">remove member</span>';

  document.body.appendChild(member);
  document.getElementsByClassName('remove')[mbID].value = data;
  document.getElementsByClassName('remove')[mbID].style.fontWeight = 'bold';
  document.getElementsByClassName('remove')[mbID].style.textDecoration = 'underline';
  mbID++;
});

document.addEventListener('submit', function(e) {
  e.preventDefault();
  // get the family data
});

document.body.addEventListener('click', function(e) {
  var value;
  if (e.target.className === 'remove') {
    value = e.target.value;
    removeMb(value);
  }
});

function removeMb(value) {
  // remove the dom node
  // remove from the familyData arr
  var allMbs = document.getElementsByTagName('li');
  allMbs.forEach(function(val, i) {
    // if ()
  });
};
