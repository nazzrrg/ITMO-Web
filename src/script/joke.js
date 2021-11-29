$(document).ready(function () {
    document.getElementsByTagName("html")[0].style.visibility = "hidden"
    $.ajax({
        url: 'https://icanhazdadjoke.com',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "text/plain")
        }, success: function(data) {
            $("#joke-content").text(data)
            console.log(data)
        },
        async: false
    })
    document.getElementsByTagName("html")[0].style.visibility = "visible"
})