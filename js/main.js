// Menu toggle
const menuBtn = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-bar");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    menu.classList.remove('active');
  }
});

const menuItems = document.querySelectorAll('.nav-bar ul li a');

menuItems.forEach(item => {
  item.addEventListener('click', function() {
    menu.classList.remove('active');
  });
});


//--------------------------------------------------------


// COOKIE POP-UP
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

// Zavretie formuláru klikom na tlačidlo X
var btn_exit = document.getElementById("exit-btn");
btn_exit.addEventListener("click", form_hide);

// Po kliknuti na jedno z troch tlacidiel zobrazi formular a ak uzivatel klikne mimo formulara tak ho zavrie 
document.addEventListener('click', function(event) {
  var form = document.getElementById('form1');
  var other_elements = document.querySelectorAll("body > *:not(#form1)");
  var targetElement = event.target;
  var openFormButtons = document.getElementsByClassName('openFormButton');

  // Pokud uživatel klikne na některé z tlačítek, formulář zůstane otevřený
  var clickedButton = Array.from(openFormButtons).find(function(button) {
    return targetElement === button;
  });

  if (clickedButton) {
    // event.stopPropagation(); // Zamezí šíření události ven
    form.classList.add("form_activated");
    other_elements.forEach((element) => {
      element.classList.add("blur"); 
    });
    return;
  }

  // Pokud uživatel klikne mimo formulář, formulář se zavře (bude skryt)
  if (!form.contains(targetElement)) {
    form.classList.remove("form_activated");
    other_elements.forEach((element) => {
      element.classList.remove("blur");
    });
  }
});


// TOGGLE PRE-HEADER WHEN SCROLL DOWN
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


// GALERIA
const galleryContainer = document.querySelector('.gallery-container');
const images = galleryContainer.querySelectorAll('.gallery img');

function enlargeImage(event) {
  const clickedImage = event.target;

  // Ak obrazok nie je zvacseny, zvacsi ho
  if (!clickedImage.classList.contains('enlarged')) {
    images.forEach((image) => {
      if (image !== clickedImage) {
        image.style.transform = 'scale(0.8)';
        image.style.zIndex = 0;
        image.classList.remove('enlarged');
      }
    });

    clickedImage.style.transform = 'scale(1)';
    clickedImage.style.zIndex = 10;
    clickedImage.classList.add('enlarged');
  } else {
    // Ak obrazok uz je zvacseny, zmenime ho naspat na povodnu velkost
    clickedImage.style.transform = 'scale(0.8)';
    clickedImage.style.zIndex = 0;
    clickedImage.classList.remove('enlarged');
  }
  document.body.style.overflow = 'hidden';
}

images.forEach((image) => {
  image.addEventListener('click', enlargeImage);
});

document.addEventListener('click', (event) => {
  // Ak klikneme mimo zvacsenych obrazkov, zmenime ich vsetky naspat na povodnu velkost
  if (!event.target.classList.contains('enlarged')) {
    images.forEach((image) => {
      image.style.transform = 'scale(1)';
      image.style.zIndex = 0;
      image.classList.remove('enlarged');
    });
    document.body.style.overflow = 'visible';
  }
});




