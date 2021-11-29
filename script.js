let id = (id) => document.getElementById(id);
let cls = (cls) => document.getElementsByClassName(cls);
var onlyChar = /^[A-Za-z]+$/;
var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var numberReg = /^\d+$/;

var shahin = 0;

const form = id("submit-form"),
     name = id("name"),
     email = id("email"),
     subject = id("subject"),
     message = id("message"),
     errDiv = cls("err"),
     number = id("number");

function showError(index, id, message) {
     if (id.value.trim() == "") {
          errDiv[index].innerHTML = ` <div class="alert alert-secondary alert-dismissible fade show">
          <strong>${message}!</strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="onclickHide()></button>
           </div>`;
          return false;
     } else {
          errDiv[index].innerHTML = "";
          shahin += 1;
          return true;
     }
}

function Name() {
     console.log("from before name");
     if (name.value.trim() == "") {
          errorMessege(0, "space not allowed");
          name.value = "";
     } else if (onlyChar.test(name.value) == false) {
          console.log("name if");
          let nameVal = name.value;
          nameVal = nameVal.substring(0, nameVal.length - 1);
          console.log(nameVal);
          name.value = nameVal;
          errorMessege(0, "only characters allowded");
     } else {
          errDiv[0].innerHTML = "";
     }
}

function errorMessege(index, message) {
     errDiv[index].innerHTML = ` <div class="alert alert-secondary alert-dismissible fade show">
               <strong>${message}!</strong> 
               <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>`;
}

function beforeEmail() {
     showError(0, name, "fill this field");
}

function Email() {
     if (email.value.trim() == "") {
          errorMessege(1, "space not alowded");
          email.value = "";
     } else if (emailReg.test(email.value) == false) {
          errorMessege(1, "enter valid email");
     } else {
          errDiv[1].innerHTML = "";
          shahin += 1;
     }
}
function beforeNumber() {
     showError(0, name, "fill this field");
     if (showError(1, email, "fill this field") == true) {
          Email();
     }
}

function Number() {
     if (number.value.trim() == "") {
          errorMessege(2, "space not allowded");
          number.value = "";
     } else if (numberReg.test(number.value) == false) {
          let val = number.value;
          val = val.substring(0, val.length - 1);
          number.value = val;
          errorMessege(2, "only numbers are allowded");
     } else if (number.value.trim().length > 10) {
          errorMessege(2, "max length is 10 digit");
     } else if (number.value.trim().length < 10) {
          errorMessege(2, "min legth is 10");
     } else {
          errDiv[2].innerHTML = "";
     }
}

function Subject() {
     if (subject.value.trim() == "") {
          errorMessege(3, "space not allowded");
          subject.value = "";
     } else {
          errDiv[3].innerHTML = "";
     }
}

function beforeSubject() {
     beforeNumber();
     if (showError(2, number, "fill this field") == true) {
          Number();
     }
}

function Messege() {
     if (message.value.trim() == "") {
          errorMessege(4, "space not allowded");
          message.value = "";
     } else {
          errDiv[4].innerHTML = "";
     }
}

function beforeMessege(){
     beforeSubject()
     if(showError(3, subject, "fill this field") == true){
          Subject()
     }
}

$("#submit-form").submit((e) => {
     e.preventDefault();

     shahin = 0;
     // code

     showError(0, name, "fill this field");
     if (showError(1, email, "fill this field")) {
          Email();
     }
     showError(2, number, "fill this field");
     showError(3, subject, "fill this feild");
     showError(4, message, "fill this feild");
     // ends
     console.log(shahin);

     if (shahin == 6) {
          $.ajax({
               url: "https://script.google.com/macros/s/AKfycbyGo6i0jcc6p4EypI19YG5DdpaE61tNXZTauvAR/exec",
               data: $("#submit-form").serialize(),
               method: "post",
               success: function (response) {
                    alert("Form submitted successfully");
                    window.location.reload();
                    //window.location.href="https://google.com"
               },
               error: function (err) {
                    alert("Something Error");
               },
          });
     }
});



