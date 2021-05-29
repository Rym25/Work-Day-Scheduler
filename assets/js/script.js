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
            var colTimeEl = $("<div>").addClass("col-2").text(x + "AM");
        } else if (i === 3) {
            var x = 12
            var colTimeEl = $("<div>").addClass("col-2").text(x + "PM");
        } else {
            var x = i - 3;
            var colTimeEl = $("<div>").addClass("col-2").text(x + "PM");
        }
        // creates the task div
        var colTaskEl = $("<div>").addClass("col-8").text("Tasks Go Here").attr("id", x + "task");
        // creates the button div
        var colSaveEl = $("<div>").addClass("col-2").text("Button Goes Here");
        // appends the created columns to the row
        rowEl.append(colTimeEl, colTaskEl, colSaveEl);
        // appends the created row to the calendarEl in the html
        calendarEl.append(rowEl);
    }
}

init();