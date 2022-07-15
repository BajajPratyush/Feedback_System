$(document).ready(function() {
    $("#logout").click(function(e) {
        window.location.href = "/";
    })
    $.post('/details', function(data, status) {
        $('#username').html(data[0]);
        $('#email').html(data[1]);
    });
    $("#submit").click(function(e) {
        e.preventDefault();
        $.post('/upload_teacher', {
                username: $('#teacher_form').find('input[name="username"]').val(),
                name: $('#teacher_form').find('input[name="name"]').val(),
                email: $('#teacher_form').find('input[name="email"]').val(),
                password: $('#teacher_form').find('input[name="password"]').val()
            },
            (data, status) => {
                if (data) {
                    alert("User added to database");
                    window.location.href = "/admin";
                } else {
                    alert("User was not added to database");
                    window.location.href = "/upload_teacher";
                }
            });
    });
    $('#dash_return').click(function(e) {
        window.location.href = "/admin";
    })
});