let comments = []

$(document).ready(function () {
    document.getElementsByTagName("html")[0].style.visibility = "hidden"
    $.ajax({
        url: 'https://icanhazdadjoke.com',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "text/plain")
        }, success: function (data) {
            $("#joke-content").text(data)
            console.log(data)
        },
        async: false
    })
    document.getElementsByTagName("html")[0].style.visibility = "visible"

    fetch('https://jsonplaceholder.typicode.com/comments')
        .catch(response => {
            if (!response.ok){
                display_comments_error();
            } else {
                return response
            }
        })
        .then(response => response.json())
        .then(json => display_comments(json))
})

function display_comments(comments) {
    console.log("display comments")
    let $comment_div = $("#comments")
    $comment_div.empty()
    let count = 0
    let last_id = localStorage.getItem("last_id") === null ? -1 : localStorage.getItem("last_id");

    for (const comment of comments) {
        if (comment["id"] > parseInt(last_id)) {
            console.log(comment["id"])
            $comment_div.append(
                $("<div>", {class: "comment-item"})
                    .append($("<a>", {class: "comment-author", href: "mailto:" + comment["email"]})
                        .append(comment["name"]))
                    .append($("<div>", {class: "comment-contents"})
                        .append(comment["body"])))
            if (count++ > 18) {
                localStorage.setItem("last_id", comment["id"])
                break;
            }
        }
    }
    if ($(".comment-item").length < 18) {
        localStorage.removeItem("last_id")
    }
}

function display_comments_error() {
    let $comment_div = $("#comments")
    $comment_div.empty()
    $comment_div.append($("<div>", {id: "comment-failure"}).append("⚠ Что-то пошло не так"))
}