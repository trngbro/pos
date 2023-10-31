$(document).ready(function() {
  $("#change_password_btn").click(function() {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var userId = $("#userToChangePwd").attr("name");
    console.log(password1)
    console.log(password2)
    console.log(typeof password1)
    console.log(userId)
    if(password1.length < 6) return $("#loginFailAlertForLogin").text("Passwords must be at least 6 character.").show();
    if (password1 === password2) {
      $.ajax({
        type: 'PUT', 
        url: ' /login/identify', 
        data: { userId: userId, password: password1 },
        success: function (data) {
          location.replace("../../../login")
        },
        error: function () {
          $('#changeFailAlertForLogin').text('password do not change now, try again!').show();
        }
      });
    } else {
      $("#loginFailAlertForLogin").text("Passwords do not match.").show();
    }
  });
});