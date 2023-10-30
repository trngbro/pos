$(document).ready(function() {
  $("#change_password_btn").click(function() {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var userId = $("#userToChangePwd").attr("name");
    if(password1.length < 6) return $("#loginFailAlertForLogin").text("Passwords must be at least 6 character.").show();
    if (password1 === password2) {
      $.ajax({
        type: 'PUT', 
        url: ' /identify', 
        data: { userId: userId, password: password1 },
        success: function (data) {
          location.replace("https://www.w3schools.com")
        },
        error: function () {
          $('#changeFailAlertForLogin').text('pw not match').show();
        }
      });
    } else {
      $("#loginFailAlertForLogin").text("Passwords do not match.").show();
    }
  });
});