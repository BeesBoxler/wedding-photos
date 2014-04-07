//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

//$(function() {
  $("#return_user > a").click(function() {
    $(this).fadeOut(300);
    $("#new_user > a").fadeOut(300);
    $("#return_user form").delay(300).fadeIn(300);
    return false;
  });
  $("#new_user > a").click(function() {
    $(this).fadeOut(300);
    $("#return_user > a").fadeOut(300);
    $("#new_user form").delay(300).fadeIn(300);
    return false;
  });
  $("#login form > a.back_button").click(function() {
    $("#login form").fadeOut(300);
    $("#return_user a").delay(400).fadeIn(300);
    return false;
  });
/*  $("#submit_new").click(function(){ 
    var nameVal = $("#name_new").val();
    if(nameVal == ''){
      $("#name_new").animate({
        borderColor:"#ff0000"
      }, 150);
      return false;
    }
    else{
      $("#name_new").css( "border-color", "#ccc" );
    }

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $("#email_new").val();
    if(emailaddressVal == ''){
      $("#email_new").animate({
        borderColor:"#ff0000"
      }, 150);
      return false;
    }
    else if(!emailReg.test(emailaddressVal)){
      $("#email_new").animate({
        borderColor:"#ff0000"
      }, 150);
      return false;
    }
    else{
      $("#name_new").css( "border-color", "#ccc" );
    }
    return true;
  });
  $("#submit_return").click(function(){ 
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $("#email_return").val();
    if(emailaddressVal == ''){
      $("#email_return").animate({
        borderColor:"#ff0000"
      }, 150);
      return false;
    }
    else if(!emailReg.test(emailaddressVal)){
      $("#email_return").animate({
        borderColor:"#ff0000"
      }, 150);
      return false;
    }
    else{
      $("#name_new").css( "border-color", "#ccc" );
    }
    return true;
  });*/
//});