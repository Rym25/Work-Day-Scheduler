var init = function() {
    // Create a variable for the current date
    var todayDate = moment().format("dddd, MMMM Do");
    console.log(todayDate);
    // Set the text for the currentDay div to todays date
    $("#currentDay").text(todayDate);

}

init();