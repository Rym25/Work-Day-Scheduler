var calendarEl = $("#calendar")

var init = function() {
    // Create a variable for the current date
    var todayDate = moment().format("dddd, MMMM Do");
    console.log(todayDate);
    // Set the text for the currentDay div to todays date
    $("#currentDay").text(todayDate);

    var rowEl = $("<div>").addClass("row");
    var colTimeEl = $("<div>").addClass("col-2").text("9 AM");
    var colTaskEl = $("<div>").addClass("col-8").text("Tasks Go Here");
    var colSaveEl = $("<div>").addClass("col-2").text("Button Goes Here");
    rowEl.append(colTimeEl, colTaskEl, colSaveEl);
    calendarEl.append(rowEl);
}

init();