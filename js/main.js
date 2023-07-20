// Menu toggle
hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function() {
    document.querySelector(".nav-bar").classList.toggle("active");
    console.log("open");
})

navbar_items = document.querySelectorAll(".nav-bar ul li a");
navbar_items.forEach(element => {
  element.addEventListener("click", function() {
    document.querySelector(".nav-bar").classList.remove("active");
  })
})

//--------------------------------------------------------

// Menu lvl 2 toggle
// var a = document.getElementById("parent");
// a.addEventListener("hover", function() {
//   a.style.height = "fit-content";
// })
//_____________________________________________________

//Menu smooth scrolling
function scroll() {
    var element = document.querySelector("#about-us");

    element.scrollIntoView();
}
//------------------------------------------------------- 

// On scroll animations
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('animate__animated');
        entry.target.classList.add('animate__zoomIn');
      }
    });
  });
  
const animated_obj = document.querySelectorAll(".card");

animated_obj.forEach((obj) => {
    observer.observe(obj);
})
//-----------------------------------------------------------

const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true")
})

setTimeout( () => {
  if(!localStorage.getItem("cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
  
}, 2000);



// FORM HANDLER


//update this with your js_form selector
var form_id_js = "javascript-form";

var data_js = {
    "access_token": "2ra4f7qii76d4xj9ximwc63l"
};

function js_onSuccess() {
    // remove this to avoid redirect
    //window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    sendButton.value='Ďakujeme za kontaktovanie';
}

function js_onError(error) {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("js_send");

function js_send() {
    sendButton.value='Odosielam…';
    sendButton.disabled=true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };


    var name = document.querySelector("#" + form_id_js + " [name='name']").value;
    var email = document.querySelector("#" + form_id_js + " [name='email']").value;
    var phone_num = document.querySelector("#" + form_id_js + " [name='phone_num']").value;
    var message = document.querySelector("#" + form_id_js + " [name='text']").value;
    var gdpr = document.querySelector("#" + form_id_js + " [name='gdpr']").value;
    
    data_js['name'] = name;
    data_js['subject'] = "Správa prostredníctvom kontaktného formuláru METALcolor";
    data_js['phone_num'] = phone_num;
    data_js['text'] = "Odosielateľ: " + email + "\r\n\r\nSpráva: " + message;
    data_js['gdpr'] = gdpr;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

js_form.onsubmit = js_send;


// INPUT FOCUS
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  
  this.nextElementSibling.classList.add("focus");
  placeholder = this.getAttribute("placeholder");
  this.placeholder = "";
  
}

function blurFunc() {
  if(this.value == "") {
    this.nextElementSibling.classList.remove("focus");
    this.setAttribute('placeholder', placeholder);
  }
  
  
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
  
})

// SHOW FORM
function form_show() {
  var form = document.getElementById("form1");
  var other_elements = document.querySelectorAll("body > *:not(#form1)");
  form.classList.add("form_activated");

  other_elements.forEach((element) => {
    element.classList.add("blur");
  })

  
  
}

// HIDE FORM
function form_hide() {
  var form = document.getElementById("form1");
  var other_elements = document.querySelectorAll("body > *:not(#form1)");
  form.classList.remove("form_activated");

  other_elements.forEach((element) => {
    element.classList.remove("blur");
    
  })

 
}

var btn_exit = document.getElementById("exit-btn");
btn_exit.addEventListener("click", form_hide);

// document.addEventListener('click', function(e) {
//   var form = document.getElementById('form1');
//   if (!form.contains(e.target) && !form.classList.contains("form_activated")) {
//       form.style.display = 'none';
//   }
// });

// var header = document.getElementById("header-bar");
// var container_header = document.getElementsByClassName("container-bar");

// header.addEventListener("scroll", function(e) {
 
//   console.log(e.currentTarget.scrollTop);
//   console.log(e.currentTarget.scrollHeight);
//   header.classList.add("header-bar-scroll")
// })

function toggleHeader() {
const menu_header = document.getElementById("header-bar");
const menu_pre_header = document.getElementById("pre-header");
if (window.pageYOffset > 100) {

  menu_header.classList.remove("animate__backInRight")
  menu_header.classList.add("header-bar-scroll")
  menu_pre_header.classList.add("animate__animated");
  menu_pre_header.classList.add("animate__backOutUp");
}
else {
  menu_pre_header.classList.remove("animate__backOutUp");
  menu_pre_header.classList.add("animate__backInDown");
  menu_header.classList.remove("header-bar-scroll")
}
  
 
}
document.addEventListener("scroll", function() {
  toggleHeader();
})
