let generator_data
let table_data=[]
let $table = $("<table>")
let $selected_cell = $(".selected-cell")
let $div_exists
let $div_not_exists

$(document).ready(function () {
    document.getElementsByTagName("html")[0].style.visibility = "hidden"
    $div_exists = $("#generator-form-exists")
    $div_not_exists = $("#generator-form-create")
    if (localStorage.getItem("generated-table") !== null) {
        table_data=[]
        table_data = JSON.parse(localStorage.getItem("generated-table"))

        $div_not_exists.addClass("hidden")
        $div_exists.removeClass("hidden")

        generator_data = {rows: table_data.length, cols: table_data[0].length}
        console.log(generator_data)
        for (i = 0; i < generator_data["rows"]; i++) {
            $row = $("<tr></tr>", {class: 'row-' + i})
            for (j = 0; j < generator_data["cols"]; j++) {
                $cell = $("<div></div>", {id: 'cell-' + i + '-' + j, class: "table-cell"}).append(table_data[i][j])
                $row.append($("<td></td>").append($cell))
            }
            $table.append($row)
        }

        $("#generator-result").append($table).removeClass("hidden")

        console.log(table_data)
        acknowledge_table()
    }

    $("#create-table-form").on("submit", function(e) {
        console.log("create new table")
        e.preventDefault();
        table_data=[]
        generator_data = {rows: $("#rows").val(), cols: $("#cols").val()}
        console.log(generator_data)
        $div_not_exists.addClass("hidden")
        $div_exists.removeClass("hidden")

        for (i = 0; i < generator_data["rows"]; i++) {
            table_data.push([])
            $row = $("<tr></tr>", {class: 'row-' + i})
            for (j = 0; j < generator_data["cols"]; j++) {
                table_data[i].push("")
                $cell = $("<div></div>", {id: 'cell-' + i + '-' + j, class: "table-cell"}).append(table_data[i][j])
                $row.append($("<td></td>").append($cell))
            }
            $table.append($row)
        }
        $("#generator-result").append($table).removeClass("hidden")
        console.log(table_data)
        localStorage.setItem("generated-table", JSON.stringify(table_data))
        acknowledge_table()
    });

    $div_exists.on("submit", function(e) {
        e.preventDefault();
        $selected_cell = NaN

        $delete = $("#check-delete-table")
        if ($delete.is(":checked")) {
            $delete.prop('checked', false)
            $div_not_exists.removeClass("hidden")
            $div_exists.addClass("hidden")

            $("#generator-result").empty().addClass("hidden")
            $table = $("<table>")
            localStorage.removeItem("generated-table")
        }

        let text = $("#insert-content").val()
        $sel = $(".selected-cell")
        if ($sel.length > 0) {
            i = $sel.attr("id").split('-')[1]
            j = $sel.attr("id").split('-')[2]
            console.log($sel.attr("id") + "   " + text + ' ' + i + ' ' + j)
            table_data[i][j] = text
            $sel.empty().append(text)
            $sel.removeClass("selected-cell")
            console.log(table_data)
            localStorage.setItem("generated-table", JSON.stringify(table_data))
        }
    });

    update_text()

    $(document).on("input", function() {update_text()})
    $(document).on("input", function() {update_text()})

    document.getElementsByTagName("html")[0].style.visibility = "visible"
})

function update_text() {
    $("#table-properties").text("Строк: " + $("#rows").val() + "  Столбцов: " +$("#cols").val())
}

function acknowledge_table() {
    $(".table-cell").click(function() {
        console.log(this.id)
        $(this).addClass("selected-cell")

        if ($selected_cell === this) {
            $selected_cell.removeClass("selected-cell")
        }

        if ($selected_cell.length > 0) {
            $selected_cell.removeClass("selected-cell")
        }

        $selected_cell = $(".selected-cell")
    });
}