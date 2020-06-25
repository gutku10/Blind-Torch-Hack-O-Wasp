const button = document.getElementById('paytm1');
const button1 = document.getElementById('paytm2');
const button2 = document.getElementById('paytm3');
const button3 = document.getElementById('paytm4');

button.addEventListener('click', function(e) {
    PostData("1");
//   console.log('button was clicked');
  
//     let donate = {
//         username: document.getElementById('name').value,
//         ngoname: document.getElementById('ngo').innerText
//     };
//     if (checkEmptyString(donate.username))
//     {
//         alert('User name is required');
//         return;
//     }

//     $.ajax({
//         type: "POST",
//         url: "/donateinfo",
//         dataType: "json",
//         success: function (jqXHR, data, status)  {
//             if (status.status == 200) {
//                 alert("Specified User registered successfully");
//                 location.href='https://paytm.com/';
//             } else {
//                 alert("Invalid User !");
//             }
//         },
//         data: donate
//     });
});

button1.addEventListener('click', function(e) {
    PostData("2");
});
button2.addEventListener('click', function(e) {
    PostData("3");
});
button3.addEventListener('click', function(e) {
    PostData("4");
});

function PostData(controlIndex)
{
    console.log('button was clicked');
  
    let donate = {
        username: document.getElementById(('name' + controlIndex)).value,
        ngoname: document.getElementById(('ngo' + controlIndex)).innerText
    };
    if (checkEmptyString(donate.username))
    {
        alert('User name is required');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/donateinfo",
        dataType: "json",
        success: function (jqXHR, data, status)  {
            if (status.status == 200) {
                alert("Specified User registered successfully");
                location.href='https://paytm.com/';
            } else {
                alert("Invalid User !");
            }
        },
        data: donate
    });
}

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}