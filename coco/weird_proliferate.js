var PROLIFERATE_SUBMIT_URL = "https://proliferate.alps.science/experiment/{exp_id}/complete";
var PROLIFERATE_PING_URL = "https://proliferate.alps.science/experiment/{exp_id}/ping";


function get_url_param(name, defaultValue) { 
    var regexS = "[\?&]"+name+"=([^&#]*)"; 
    var regex = new RegExp(regexS); 
    var tmpURL = window.location.href; 
    var results = regex.exec(tmpURL); 
    if( results == null ) { 
        return defaultValue; 
    } else { 
        return results[1];    
    } 
}

function htmlify(obj) {
  if (obj instanceof Array) {
    return "[" + obj.map(function(o) { return htmlify(o) } ).join(",") + "]";
  } else if (typeof obj == "object") {
    var strs = [];
    for(var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var str = "<li>" + htmlify(key) + ": " + htmlify(obj[key]) + "</li>";
        strs.push(str);
      }
    }
    return "{<ul>" + strs.join("") + "</ul>}";
  } else if (typeof obj == "string")  {
    return '"' + obj + '"';
  } else if (typeof obj == "undefined" ) {
    return "[undefined]"
  } else {
    return obj.toString();
  }
};



var proliferate = {
  
  "submit": function(expdata, success_fct, failure_fct) {
    
    var experiment_id = get_url_param("experiment_id", "NONE");
    var participant_id = get_url_param("participant_id", "NONE");
    var submit_url = PROLIFERATE_SUBMIT_URL.replace("{exp_id}", experiment_id);
    
    // debug mode?
    if (experiment_id == "NONE" || participant_id == "NONE") {
      var data_html = htmlify(expdata);
      var div = $("<div></div>");
      div.css({
        "font-family": '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", sans-serif',
        "font-size": '14px',
        "float": 'right',
        "padding": '1em',
        "background": '#dfdfdf'
      });
      div.html("<p><b>Debug mode</b></p>Here is the data that would have been submitted: <ul>" + data_html + "</ul>");
      $("body").append(div);
      return;
    }
    
    if ($("#thanks").length > 0 && $("#uploading-text").length == 0) {
      $("#thanks").html('<p class="big" id="uploading-text">Uploading data... Please don\'t close this window!</p>' +
                        '<p class="big" id="thanks-text">Thanks for your time!</p>');
    }
    
    $("#uploading-text").show();
    $("#thanks-text").hide();
    
    $.post(submit_url, {"data": JSON.stringify(expdata), 
                        "participant_id": participant_id} 
      ).done(function(data) {
             if (success_fct != null) {
               success_fct(data);
               return;
             }
             
             var completionURL = data["completion_URL"]; 
             var completionHTML = 'Thanks for your time!<br><br>' +
               'If you are not automatically redirected, please click on the following completion URL:' + 
               '<br> <a href="' + completionURL + '">' + completionURL + '</a>';
             
             $("#uploading-text").hide();
             $("#thanks-text").html(completionHTML);
             $("#thanks-text").show();
            //  window.setTimeout(function() {
            //    window.location.href = completionURL;
            //  }, 2000);
           }
      ).fail(function(data) {
        if (failure_fct != null) {
          failure_fct(data);
          return;
        }
      
        if ($("#thanks").length > 0) {
          $("#thanks").html("<p><strong>Oooops, an error occurred!</strong></p>" +
                            "<p>Please message the researcher to get compensated. " +
                            "We apologize for any inconvenience caused.</p>");
        } else {
          alert("Oooops, an error occurred! \n\n" +
                "Please message the researcher to get compensated. " +
                "We apologize for any inconvenience caused.");
        }
      });
  }
}


// for backwards compatibility with mmturkey.js
var turk = {
  "previewMode": false,
  "submit": proliferate.submit
};


// implement ping
$(document).ready(function() {
  if (get_url_param("experiment_id", "NONE") != "NONE" && get_url_param("participant_id", "NONE") != "NONE") {
    window.setInterval(function() {
         var formdata = {"active": true, 
                         "participant_id": get_url_param("participant_id", "NONE")};
         var ping_url = PROLIFERATE_PING_URL.replace("{exp_id}", get_url_param("experiment_id", "NONE"));
         $.post(ping_url, formdata);
      }, 60000);
    }
});
