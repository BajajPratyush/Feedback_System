$(document).ready(function() {
    $.post('/student', function(data, status) {
        $('#username').html(data[0]);
        $('#email').html(data[1]);
    });
    $("#logout").click(function(e) {
        window.location.href = "/";
    })
    $("#feedback").click(function(e) {
        window.location.href = "/upload_feedback";
    })
})