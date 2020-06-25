
 function maps(){
    let userData = {
        userid: document.getElementById('userid').value,
        userpassword:document.getElementById('userpassword').value
    };
    $.ajax({
        type: "GET",
        url: "/map",
        dataType: "json",
        success: function (msg) {
            if (msg.location.length) {
                url="http://maps.google.com?q="+msg.location[0].lattitude+","+msg.location[0].longitude;
                document.location.href=url;
            } else {
                alert("Invalid User !");
            }
        },
        data: userData
    });
//    return false;
 }
