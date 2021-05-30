var calendarEl = $("#calendar")

var init = function() {
    // Create a variable for the current date
    var todayDate = moment().format("dddd, MMMM Do");
    console.log(todayDate);
    // Set the text for the currentDay div to todays date
    $("#currentDay").text(todayDate);
    // Creates Calendar Time Blocks
    for(var i = 0; i < 9; i++){
        // creates a row element
        var rowEl = $("<div>").addClass("row");
        // creates the time column
        if(i <= 2) {
            var x = 9 + i;
            var colTimeEl = $("<div>").addClass("col-2 text-center border-right border-dark timebrdr").text(x + "AM");
        } else if (i === 3) {
            var x = 12
            var colTimeEl = $("<div>").addClass("col-2 text-center border-right border-dark timebrdr").text(x + "PM");
        } else {
            var x = i - 3;
            var colTimeEl = $("<div>").addClass("col-2 text-center border-right border-dark timebrdr").text(x + "PM");
        }
        // creates the task div
        var colTaskEl = $("<div>").addClass("col-8 task").attr("id", x + "task");
        var colTaskSpan = $("<span>").text("Tasks Go Here");
        colTaskEl.append(colTaskSpan);
        // creates the button div
        // var colSaveEl = $("<div>").addClass("col-2 border border-dark rounded-right");
        var colSaveButton = $("<button>").addClass("col-2 border border-dark btn btn-primary btn-block").append("<span class='oi oi-file'></span><p>Save<p>")
       
        // appends the created columns to the row
        rowEl.append(colTimeEl, colTaskEl, colSaveButton);
        // appends the created row to the calendarEl in the html
        calendarEl.append(rowEl);
    }
}

init();

$(".container").on("click",".task span", function() {
    // get the text that was there
    var thisTask = $(this).text().trim();
    // creates an editable textarea
    var textInput = $("<textarea>").addClass("form-control").val(thisTask);
    $(this).replaceWith(textInput);
    // sets the page to focus on this element
    textInput.trigger("focus");
});

$(".container").on("blur",".task textarea", function () {
    var textInput = $(this).val().trim();
    console.log(textInput);
    var thisTask = $("<span>").text(textInput);
    console.log(thisTask);
    $(this).replaceWith(thisTask);
})

$(".container").on("click","button", function() {
    console.log("Saved");
})