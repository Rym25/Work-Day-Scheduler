var calendarEl = $("#calendar")
var calendarTasks = {};

var init = function() {
    // Create a variable for the current date
    var todayDate = moment().format("dddd, MMMM Do");
    // Set the text for the currentDay div to todays date
    $("#currentDay").text(todayDate);
    // loads locally stored tasks
    var savedTasks = JSON.parse(localStorage.getItem("calendarTasks"));
    // Creates Calendar Time Blocks
    for(var i = 0; i < 9; i++){
        // creates a row element
        var rowEl = $("<div>").addClass("row");
        // creates the time column
        if(i <= 2) {
            var x = 9 + i;
            var colTimeEl = $("<div>").addClass("col-2 text-right border-right border-dark timebrdr").text(x + "AM").attr("id","time" + i);
        } else if (i === 3) {
            var x = 12
            var colTimeEl = $("<div>").addClass("col-2 text-right border-right border-dark timebrdr").text(x + "PM").attr("id","time" + i);
        } else {
            var x = i - 3;
            var colTimeEl = $("<div>").addClass("col-2 text-right border-right border-dark timebrdr").text(x + "PM").attr("id","time" + i);
        }
        // creates the task div and load in saved tasks
        if (savedTasks) {
            if (savedTasks[i]){
            var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
            var colTaskSpan = $("<span>").text(savedTasks[i]);
            } else {
                var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
                var colTaskSpan = $("<span>").text("Enter Task Here");
            }
        } else {
        var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
        var colTaskSpan = $("<span>").text("Enter Task Here");
        }
        colTaskEl.append(colTaskSpan);
        // creates the button div
        // var colSaveEl = $("<div>").addClass("col-2 border border-dark rounded-right");
        var colSaveButton = $("<button>").addClass("col-2 border border-dark btn btn-primary btn-block").attr("id", "button" + i).append("<span class='oi oi-file'></span><p>Save<p>")
       
        // appends the created columns to the row
        rowEl.append(colTimeEl, colTaskEl, colSaveButton);
        // appends the created row to the calendarEl in the html
        calendarEl.append(rowEl);
    }
}

// Create a function to audit the current time and color the calendar hours accordingly
var audit = function() {
    for (var i = 0; i < 9; i++) {
        // remove any previous audit classes from tasks by thier ID
        $("#task" + i).removeClass("list-group-item-success list-group-item-danger list-group-item-secondary");
        // creates a comparison time for the hour we are comparing to
        var x = 9 + i;
        var setTime = moment().hour(x).minute(0);
        // compare setTime to the current time
        var toNow = setTime.toNow(true);
        // check if the time till now is an hour or more (really 45 minutes) then checks if it is before or after the current time.
        if(toNow.indexOf("hour") !== -1 && moment().isBefore(setTime)){
            $("#task" + i).addClass("list-group-item-success");
        } else if (toNow.indexOf("hour") !== -1 && moment().isAfter(setTime)) {
            $("#task" + i).addClass("list-group-item-secondary");
        } else {
            $("#task" + i).addClass("list-group-item-danger");
        }
    }
    console.log("audited");
}

init();

audit();

setInterval(audit,(10000));

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
    var buttonId = $(this).attr("id");
    var hour = buttonId[buttonId.length - 1];
    var task = $("#task" + hour).text().trim();
    
    calendarTasks[hour] = task;
    console.log(calendarTasks);
    localStorage.setItem("calendarTasks",JSON.stringify(calendarTasks));
})