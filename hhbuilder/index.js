var familyData = {};
var mbID = 0;

window.onload = createMemberList();

document.getElementsByClassName('add')[0].addEventListener('click', function(e) {
  e.preventDefault();
  addMember();
});

document.getElementsByTagName('button')[1].addEventListener('click', function(e) {
  e.preventDefault();
  submitForm();
});

function createMemberList() {
  var list = document.createElement('ul');
  list.className = 'addedMembers';
  list.style.display = 'inline-block';
  list.style.float = 'left';
  list.style.width = '50%';

  document.body.append(list);
}

function addMember() {
  var ageValue = document.getElementsByName('age')[0].value;
  var relValue = document.getElementsByName('rel')[0].value;
  var smokerValue = document.getElementsByName('smoker')[0].checked;
  var smokerStatus = 'Non-Smoker';
  var member = document.createElement('li');
  var data = ageValue + ', ' + relValue + ', ' + smokerStatus;
  var memberList;

  if (!ageValue.length && !relValue.length) {
    alert('Please complete the form with valid data. If you\'re done adding your family members, please click submit instead.');
  }

  if (smokerValue === true) {
    smokerStatus = 'Smoker';
  }

  familyData[mbID] = {
    age: ageValue,
    relationship: relValue,
    smoker: smokerValue
  };

  member.className = 'member';
  member.id = mbID;
  member.innerHTML = ageValue + ', ' + relValue + ' (' + smokerStatus + ') - <span class="remove" id="' + mbID + '"style="font-weight: bold; text-decoration: underline;">remove member</span>';

  document.getElementsByTagName('ul')[0].appendChild(member);
  attachListeners();
  mbID++;
}

function attachListeners() {
  memberList = Array.from(document.getElementsByClassName('remove'));
  memberList.forEach(function(item) {
    item.addEventListener('click', function(e) {
      var clickedID = e.target.id;
      removeMb(clickedID);
    });
  });
}

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

function submitForm() {
  var stringified = JSON.stringify(familyData, undefined, 2);
  var debug = document.getElementsByClassName('debug')[0];

  if (stringified.length <= 2) {
    debug.style.display = 'none';
  }

  if (debug.childNodes.length) {
    debug.removeChild(debug.firstChild);
    debug.append(stringified);
  } else {
    debug.append(stringified);
    debug.style.display = 'inline-block';
  }

};
