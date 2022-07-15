$(document).ready(function() {
    console.log("hi");
    $.post('/admin', function(data, status) {
        $('#username').html(data[0]);
        $('#email').html(data[1]);
    });
    $("#logout").click(function(e) {
        window.location.href = "/";
    })
    $("#upload_student").click(function(e) {
        window.location.href = "/upload_student";
    })
    $("#upload_teacher").click(function(e) {
        window.location.href = "/upload_teacher";
    })
    $("#feedbacks").click(function(e) {
        window.location.href = "/feedbacks";
    })
    $('#dash_return').click(function(e) {
        window.location.href = "/admin";
    })
})