var inputName = document.getElementById("inputName");
var inputurl = document.getElementById("inputurl");
var closebtn = document.getElementById("Box");
var bg = document.getElementById("bg");

var arraylist = []; // array empty

if (localStorage.getItem("sites") != null) {
  arraylist = JSON.parse(localStorage.getItem("sites")); // save in array
  display();
}

// add in array
function Addurl() {
  if (validitionName() == true && validitionURL() == true) {
    var sites = {
      // object
      siteName: inputName.value,
      siteurl: inputurl.value,
    };
    arraylist.push(sites);
    localStorage.setItem("sites", JSON.stringify(arraylist)); //save in local
    console.log(arraylist);
    display();
    clearsite();
  } else {
    closebtn.classList.remove("d-none");
    bg.classList.remove("d-none");
  }
}
// display in table
function display() {
  cartona = "";
  for (var i = 0; i < arraylist.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${arraylist[i].siteName}</td>
  
    <td> <button class="btn btn-outline-warning btn-sm1" onclick="visit(${i});"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
    <td>
    <button
      class="btn btn-outline-danger btn-sm2"
      onclick="Deleteproduct(${i});"
    >
    <i class="fa-solid fa-trash-can"></i>
      Delete
    </button>
  </td>
    </tr>`;
  }

  document.getElementById("tablebody").innerHTML = cartona;
}
function Deleteproduct(number) {
  arraylist.splice(number, 1);
  localStorage.setItem("sites", JSON.stringify(arraylist));
  display();
}
function visit(index) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(inputurl.value)) {
    // console.log(arraylist[index].siteurl);
    window.open(`${arraylist[index].siteurl}`);
  } else {
    window.open(`https://${arraylist[index].siteurl}`);
    // console.log(arraylist[index].siteurl);
  }
}

// validation on name
function validitionName() {
  var text = inputName.value;
  var regex = /^[a-z]{3,8}$/;
  if (regex.test(text) == true) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");

    return false;
  }
}

//
// validation on URL
function validitionURL() {
  var textURL = inputurl.value;
  var regexURL =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

  if (regexURL.test(textURL) == true) {
    inputurl.classList.add("is-valid");
    inputurl.classList.remove("is-invalid");
    return true;
  } else {
    inputurl.classList.add("is-invalid");
    inputurl.classList.remove("is-valid");

    return false;
  }
}
function Box() {
  closebtn.classList.add("d-none");
  bg.classList.add("d-none");
}
function clearsite() {
  inputName.value = "";
  inputurl.value = "";
  inputurl.classList.remove("is-valid");
  inputName.classList.remove("is-valid");
}
