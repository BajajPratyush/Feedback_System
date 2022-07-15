$(document).ready(function() {
    $.post('/professor', function(data, status) {
        $('#username').html(data[0]);
        $('#email').html(data[1]);
    });
    $("#logout").click(function(e) {
        window.location.href = "/";
    })
    $("#feedbacks").click(function(e) {
        window.location.href = "/feedbacks";
    })
})