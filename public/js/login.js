$(document).ready(function() {
    $("#loginform").submit(function(e) {
        e.preventDefault();

        $.post("/login", {
                username: $('#loginform').find('input[name="username"]').val(),
                password: $('#loginform').find('input[name="password"]').val()
            },
            function(data, status) {
                if (data.startsWith("Incorrect")) {
                    $("#res").css({ "color": " rgb(245, 66, 66)" });
                    $("#res").html(data)

                } else {
                    window.location.href = "/" + data;
                }
            });
    });
});