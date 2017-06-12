var familyData = [];
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
  var header = document.createElement('h2');
  var list = document.createElement('ul');

  header.textContent = "Click member to remove";
  header.style.display = 'none';

  list.className = 'addedMembers';
  list.style.display = 'inline-block';
  list.style.float = 'left';
  list.style.width = '50%';

  document.body.append(header);
  document.body.append(list);
}

function addMember() {
  var ageValue = document.getElementsByName('age')[0].value;
  var relValue = document.getElementsByName('rel')[0].value;
  var smokerValue = document.getElementsByName('smoker')[0].checked;
  var smokerStatus = 'Non-Smoker';
  var data,
    member,
    memberList;

  if (!ageValue.length && !relValue.length) {
    alert('Please complete the form with valid data. If you\'re done adding your family members, please click submit instead.');
    return;
  }

  if (familyData.length === 0) {
    document.getElementsByTagName('h2')[0].style.display = 'block';
  }

  if (smokerValue === true) {
    smokerStatus = 'Smoker';
  }

  data = ageValue + ', ' + relValue + ', ' + smokerStatus;
  familyData.push(data);

  member = document.createElement('li');
  member.className = 'member';
  member.id = mbID;
  member.innerHTML = data;

  document.getElementsByClassName('addedMembers')[0].appendChild(member);
  addListeners();
  mbID++;
}

function addListeners() {
  var len = document.getElementsByClassName('member').length - 1;

  document.getElementsByClassName('member')[len].addEventListener('click', function(e) {
    var clickedItem = this.textContent;
    this.remove();
    removeMb(clickedItem);
  });
};

function removeMb(clickedItem) {
  var item = familyData.indexOf(clickedItem);
  familyData.splice(item, 1);
};

function submitForm() {
  var jsonData = serializeData();
  JSON.stringify(familyData, undefined, 2);
  var debug = document.getElementsByClassName('debug')[0];

  if (jsonData.length <= 2) {
    debug.style.display = 'none';
  }

  if (familyData.length === 0) {
    document.getElementsByTagName('h2')[0].style.display = 'none';
  }

  if (debug.childNodes.length) {
    debug.removeChild(debug.firstChild);
    debug.append(jsonData);
  } else {
    debug.append(jsonData);
    debug.style.display = 'inline-block';
  }

};

function serializeData() {
  var data = {};

  familyData.forEach(function(entry, index) {
    entry = entry.split(',');
    data[index] = {
      age: entry[0].trim(),
      relationship: entry[1].trim(),
      smoker: entry[2].trim()
    }
  });

  return JSON.stringify(data, null, 2);
};
