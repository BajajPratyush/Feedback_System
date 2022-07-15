$(document).ready(function() {
    $("#logout").click(function(e) {
        window.location.href = "/";
    })
    $.post('/details', function(data, status) {
        $('#username').html(data[0]);
        $('#email').html(data[1]);
    })

    $("#submit").click(function(e) {
        e.preventDefault();
        $.post('/upload_feedback', {
                section: $('#feedback_form').find('input[name="section"]').val(),
                feedback: $('#feedback_form').find('input[name="feedback"]').val(),
                semester: $('#feedback_form').find('input[name="semester"]').val(),
                subject: $('#feedback_form').find('input[name="subject"]').val()
            },
            (data, status) => {
                if (data) {
                    alert("Feedback Submitted");
                    window.location.href = "/student";
                } else {
                    alert("Feedback was not submitted");
                    window.location.href = "/upload_feedback";
                }
            });
    });
    $('#dash_return').click(function(e) {
        window.location.href = "/student";
    })
});