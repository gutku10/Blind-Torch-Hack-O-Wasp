const button = document.getElementById('messagesend');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let feedback= {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    if (checkEmptyString(feedback.name))
    {
        alert('User name is required');
        return;
    }
    if (checkEmptyString(feedback.email))
    {
        alert('User Email is required');
        return;
    }
    if (checkEmptyString(feedback.message))
    {
        alert('User Password is required');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/send",
        dataType: "json",
        success: function (jqXHR, data, status) {
            if (status.status == 200) {
                location.href='/';
            } else {
                alert("Invalid User !");
            }
        },
        data: feedback
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}


