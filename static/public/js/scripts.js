$(document).ready(function() {
  $(".dialogflow-left-first-section").click(function() {
    $(".dialogflow-main-section").toggleClass("open-more");
  });
  $(".fa-minus").click(function() {
    $(".dialogflow-main-section").toggleClass("open-more");
  });
  var socket = io("/customer");

  // When the form is submitted, send a customer message to the server
  $("#chat").submit(function() {
    var messageText = $("#messege").val();
    messageText = messageText.trim();
    if (messageText !== "") {
      getMessage("customer", messageText);
      socket.emit("customer message", messageText);
    }
    $("#messege").val("");
    return false;
  });

  $("#send").click(function() {
    $("#chat").submit();
  });

  // When we receive a customer message, display it
  socket.on("customer message", function(msg) {
    getMessage("operator", msg);
  });

  // When we receive a system error, display it
  socket.on("system error", function(error) {
    var errorText = error.type + " - " + error.message;
    getMessage("operator", errorText);
  });
});
var messages = document.getElementsByClassName("chat-section");

scrollToBottom = function() {
  messages.scrollTop = messages.scrollHeight;
};

var getMessage = function(type, msg) {
  var position = type === "operator" ? "left-chat" : "right-chat";
  $("#messages").append(
    $("<li>").html(
      $('<div class="' + position + '">').html(
        '<img src="/public/images/' + type + '.png">' + "<p>" + msg + "</p>"
      )
    )
  );
  $(".chat-section").animate({ scrollTop: 20000000 }, "slow");
};
