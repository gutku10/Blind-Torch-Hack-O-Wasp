const button = document.getElementById('register');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
  
    let signin = {
        username: document.getElementById('name').value,
        userPassword: document.getElementById('userpassword').value,
        useremail:document.getElementById('email').value,
        usercontactinfo:document.getElementById('contactinfo').value
    };
    if (checkEmptyString(signin.username))
    {
        alert('User name is required');
        return;
    }

    if (checkEmptyString(signin.useremail))
    {
        alert('User email is required');
        return;
    }
    if (checkEmptyString(signin.usercontactinfo))
    {
        alert('User contact is required');
        return;
    }
  
    $.ajax({
        type: "POST",
        url: "/register",
        dataType: "json",
        success: function (jqXHR, data, status)  {
            if (status.status == 200) {
                alert("Specified User registered successfully");
                location.href='/';
            } else {
                alert("Invalid User !");
            }
        },
        data: signin
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}