var firebaseRef = new Firebase("https://rentech.firebaseio.com/");

var totalBudget = 0;

var showBudget;
var currentPrice = 0;
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
    televisions = televisions.sort(compare);
    speakers = speakers.sort(compare);
    consoles = consoles.sort(compare);
    computing = computing.sort(compare);
    for (var television of televisions) {
        var template = itemTemplate(television);
        $('#television').append(template);
    }

    for (var speaker of speakers) {
        var template = itemTemplate(speaker);
        $('#speakers').append(template);
    }

    for (var console of consoles) {
        var template = itemTemplate(console);
        $('#consoles').append(template);
    }

    for (var computer of computing) {
        var template = itemTemplate(computer);
        $('#computing').append(template);
    }
};

var compare = function (a,b){
    var comparison = a.PricePerWeek - b.PricePerWeek;
    
    if (comparison < 0){
        return -1;
    }
    if ( comparison > 0){
        return 1;
    }
    return 0;
}

var outputUpdateBudget = function(val){
    $('#budget').text(val);
    showBudget();
}

var outputUpdateHousehold = function(val){
    $('#householdValue').text(val);
    showBudget();
}

var itemTemplate = function (item) {
    var detailString = "";
    var price = item.PricePerMonth ? item.PricePerMonth : item.PricePerWeek * 4;
    for (var detail of item.Details) {
        detailString += ("<li>" + detail + "</li>");
    }

    return "<div class='item row'>" +
        "<img class='col-md-2' src=imgs/" + item.ImageURL + ">" +
        "<div class='col-md-1' id='companyLogo'>" + item.Company + "</div>" +
        "<div class='col-md-6' id='nameDescription'>" +
        "Name: " + item.Name + "<br/>" +
        "Description: " + item.LongDescription + "<br/>" +
        "Details: " + "<br/>" +
        "<ul>" + detailString + "</ul>" +
        "</div>" +
        "<div class='col-md-2' id='priceContract'>" +
        "Contract Length:" + item.ContractLengthMonths + "<br/>" +
        "Price: £" + price + " per month</br>" +
        "</div>" +
        "<div class='col-md-1' id='chosenProduct'>" +
        "<input type='checkbox' onclick='onCheck(" + price + ",this)'>" + 
"</div>";
}

var onCheck = function (price, checkbox) {
    if (checkbox.checked) {
        currentPrice += price;
    } else {
        currentPrice -= price;        
    }
    showBudget();
}

$(showBudget = function () {
    var noOfPeople = $("#numberInHousehold").val();
    var perPerson = $("#perPersonBudget").val();

    totalBudget = (noOfPeople * perPerson) - currentPrice;

    $("#budgetAvailable").text('£' + totalBudget.toFixed(2) + ' per month');
})