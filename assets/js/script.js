var calendarEl = $("#calendar")
var calendarTasks = {};

var init = function() {
    // Create a variable for the current date
    var todayDate = moment().format("dddd, MMMM Do");
    // checks to see if this is the same date, if not remove yesterdays tasks
    var checkDate = localStorage.getItem("checkDate");
    if (todayDate !== checkDate){
        localStorage.removeItem("calendarTasks");
        localStorage.setItem("checkDate", todayDate);
    }
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
        // creates the task column and load in saved tasks
        if (savedTasks) {
            if (savedTasks[i]){
            var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
            var colTaskSpan = $("<span>").text(savedTasks[i]);
            } else {
                var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
                var colTaskSpan = $("<span>").text("Click Here To Enter Task");
            }
        } else {
        var colTaskEl = $("<div>").addClass("col-8 text-center task").attr("id", "task" + i);
        var colTaskSpan = $("<span>").text("Click Here To Enter Task");
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
    // calls the audit function on page load
    audit();
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
// initializes the page
init();

// audits page every 15 minutes
setInterval(audit,(1000*60*15));

// looks for clicks on the span elements in the task divs
$(".container").on("click",".task span", function() {
    // get the text that was there
    var thisTask = $(this).text().trim();
    // creates an editable textarea
    var textInput = $("<textarea>").addClass("form-control").val(thisTask);
    $(this).replaceWith(textInput);
    // sets the page to focus on this element
    textInput.trigger("focus");
});

// looks for when a textarea is clicked off of
$(".container").on("blur",".task textarea", function () {
    // gets the entered text from the text area
    var textInput = $(this).val().trim();
    // creates a new span element and puts the entered text into it
    var thisTask = $("<span>").text(textInput);
    // replaces the text area with the new span
    $(this).replaceWith(thisTask);
})

// looks for when a button element is clicked
$(".container").on("click","button", function() {
    // gets the id of the button
    var buttonId = $(this).attr("id");
    // gets the index number from the button id to use to get the corresponding task index number
    var hour = buttonId[buttonId.length - 1];
    // gets the text from the task section
    var task = $("#task" + hour).text().trim();
    // puts task into the calendarTasks array
    calendarTasks[hour] = task;
    // saves the calendarTasks array to local memory
    localStorage.setItem("calendarTasks",JSON.stringify(calendarTasks));
})