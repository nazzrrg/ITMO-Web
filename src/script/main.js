let loadtime = new Date().getTime()
console.log("start")
jQuery.ajaxSetup({async:false});
$(window).on("load", function () {
    loadtime = (new Date().getTime() - loadtime) / 1000
    console.log("stop")
})

$(document).ready(function () {
    $.get("./src/data/header.json", function (data) {
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
    })

    $.get("./src/data/footer.json", function (data) {
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
                    .text("Page loaded in " + loadtime + "s")
                )
                .append($("<section>", {id: "footer-copyright"})
                    .append("© ")
                    .append($("<b>").text(data["copyright"]["author"]))
                    .append(", ")
                    .append(data["copyright"]["year"])
                )
            )
    })

    $.get("./src/data/aside.json", function (data) {
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
    })
    document.getElementsByTagName("html")[0].style.visibility = "visible"
})