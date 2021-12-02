let start = new Date().getTime()
console.log("start")
jQuery.ajaxSetup({async:false});
$(window).on("load", function () {
    console.log("stop")
    $("#footer-loadtime").text("Page loaded in " + (new Date().getTime() - start) / 1000 + "s")
})

$(document).ready(function () {
    $.ajax({url: "./src/data/header.json", success: function(data) {
        console.log(data)
        let $nav = $("<nav>")
        for (const e of data["nav"]) {
            $nav.append($("<a>").attr("href", e["href"]).text(e["text"]))
            console.log(e)
        }

        $(document.body)
            .prepend($("<header>")
                .append($("<div>", {id: "header-text"})
                    .append($("<h1>", {text: data["text_big"]}))
                    .append($("<p>", {text: data["text_small"]})))
                .append($nav))

        let file = document.location.pathname.match(/[^\/]+$/)
        
        if (file == null) {
            console.log("index.html")
            $("a[href$='index.html']").addClass("nav-selected")
        } else {
            console.log(file)
            $("a[href$='" + file + "']").addClass("nav-selected")
        }
    }, async: false})

    $.ajax({url: "./src/data/footer.json", success: function (data) {
        console.log(data)
        $("#content-and-footer")
            .append($("<footer>")
                .append($("<section>", {id: "footer-contacts"})
                    .append("Contact me: ")
                    .append($("<a>")
                        .attr("href", data["contacts"]["href"])
                        .text(data["contacts"]["text"])
                    )
                )
                .append($("<section>", {id: "footer-loadtime"})
                    .text("Page loaded in " + (new Date().getTime() - start)/1000 + "s")
                )
                .append($("<section>", {id: "footer-copyright"})
                    .append("© ")
                    .append($("<b>").text(data["copyright"]["author"]))
                    .append(", ")
                    .append(data["copyright"]["year"])
                )
            )
    }, async: false})

    $.ajax({url: "./src/data/aside.json", success: function (data) {
        console.log(data)
        $("main")
            .append($("<aside>")
                .append($("<a>")
                    .attr("target", "_blank")
                    .attr("href", data["href"])
                    .append($("<img>")
                        .attr("src", data["src"])
                        .attr("alt", data["alt"])
                    )
                )
            )
    }, async: false})
    document.getElementsByTagName("html")[0].style.visibility = "visible"
})