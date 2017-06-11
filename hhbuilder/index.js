/*
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

var familyData = {};
var mbID = 0;

document.getElementsByClassName('add')[0].addEventListener('click', function() {
  var ageValue = document.getElementsByName('age')[0].value;
  var relValue = document.getElementsByName('rel')[0].value;
  var smokerValue = document.getElementsByName('smoker')[0].checked;
  var smokerStatus = 'Non-Smoker';
  var member = document.createElement('li');
  var data = ageValue + ', ' + relValue + ', ' + smokerStatus;

  if (!ageValue.length && !relValue.length) {
    alert('Please complete the form with valid data. If you\'re done adding your family members, please click submit instead.');
  }

  if (smokerValue === true) {
    smokerStatus = 'Smoker';
  }

  familyData[mbID] = data;

  member.className = 'member';
  member.id = mbID;
  member.innerHTML = ageValue + ', ' + relValue + ' (' + smokerStatus + ') - <span class="remove" id="' + mbID + '"style="font-weight: bold; text-decoration: underline;">remove member</span>';

  document.body.appendChild(member);
  mbID++;
});

document.body.addEventListener('click', function(e) {
  e.preventDefault();
  var clickedID;
  if (e.target.className === 'remove') {
    clickedID = e.target.id;
    removeMb(clickedID);
  }

  if (e.target.textContent === 'submit') {
    updateJSON();
  }
});

function removeMb(clickedID) {
  var allMbs = Array.from(document.getElementsByClassName('member'));

  for (var i = 0; i < allMbs.length; i++) {
    var currentID = allMbs[i].id;

    if (currentID === clickedID) {
      allMbs[i].remove();
      delete familyData[currentID];
      return;
    }
  }
};

function updateJSON() {
  var stringified = JSON.stringify(familyData, undefined, 2);
  var debug = document.getElementsByClassName('debug')[0];

  if (debug.childNodes.length) {
    debug.removeChild(debug.firstChild);
    debug.append(stringified);
  } else {
    debug.append(stringified);
    debug.style.display = 'inline-block';
  }
};
