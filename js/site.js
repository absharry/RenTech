var firebaseRef = new Firebase("https://rentech.firebaseio.com/");

var totalBudget = 0;

var showBudget;
var televisions = [];
var speakers = [];
var consoles = [];
var computing = [];

firebaseRef.once("value", function (data) {
    var items = data.val();
    for (var item of items) {
        switch (item.Type) {
        case "televisions":
        case "freeview-and-pvr-digital":
            televisions.push(item);
            break;
        case "soundbar":
            speakers.push(item);
            break;
        case "game-consoles":
        case "games-console-accessories":
            consoles.push(item);
            break;
        case "laptops":
        case "tablet-pcs":
            computing.push(item);
            break;
        }
    }

    buildItemList();
});

var buildItemList = function () {
    for (var television of televisions){
        var template = itemTemplate(television);
        $('#television').append(template);
    }
    
    for (var speaker of speakers){
        var template = itemTemplate(speaker);
        $('#speakers').append(template);
    }
    
    for (var console of consoles){
        var template = itemTemplate(console);
        $('#consoles').append(template);
    }
    
    for (var computer of computing){
        var template = itemTemplate(computer);
        $('#computing').append(template);
    }
};

var itemTemplate = function (item) {
    var detailString = [];
    var price = item.PricePerMonth ? item.PricePerMonth : item.PricePerWeek * 4;
    for (var detail of item.Details) {
        detailString.push("<li>" + detail + "</li>");
    }

    return "<div class='item'>" +
        "Name: " + item.Name + "<br/>" +
        "Company: " + item.Company + "<br/>" +
        "Contract Length:" + item.ContractLengthMonths + "<br/>" +
        "Details: " + "<br/>" +
        "<ul>" + detailString + "</ul>" +
        "Image: <img src=imgs/" + item.ImageURL + "> <br/>" +
        "Description: " + item.LongDescription + "<br/>"+
        "Price: " + price + "</br>";
}

$(showBudget = function () {
    var noOfPeople = $("#numberInHousehold").val();
    var perPerson = $("#perPersonBudget").val();

    totalBudget = noOfPeople * perPerson;

    $("#budgetAvailable").text('£' + totalBudget + ' per month');
})