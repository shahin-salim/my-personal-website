let id = (id) => document.getElementById(id);
let cls = (cls) => document.getElementsByClassName(cls);

var shahin = 0;

const form = id("submit-form"),
     name = id("name"),
     email = id("email"),
     subject = id("subject"),
     message = id("message"),
     errDiv = cls("err");

function showError(index, id, message, e) {
     if (id.value.trim() == "") {
          errDiv[index].innerHTML = ` <div class="alert alert-secondary alert-dismissible fade show">
          <strong>${message}!</strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
           </div>`;
          e.preventDefault();
          return false;
     } else {
          errDiv[index].innerHTML = "";
          shahin += 1;
          return true;
     }
}

function emailcheck(e) {
     if (email.value.trim().endsWith("@gmail.com") == false) {
          e.preventDefault();

          errDiv[1].innerHTML = ` <div class="alert alert-secondary alert-dismissible fade show">
           <strong>Enter a valid email!</strong> 
           <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
           </div>`;
     } else {
          errDiv[1].innerHTML = "";
          shahin += 1;
     }
}

$("#submit-form").submit((e) => {
     shahin = 0;
     // code

     showError(0, name, "fill this field", e);
     if (showError(1, email, "fill this feild", e) == true) {
          emailcheck(e);
     }
     showError(2, subject, "fill this feild", e);
     showError(3, message, "fill this feild", e);
     // ends
     console.log(shahin)
     e.preventDefault()

     if (shahin == 5) {
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

