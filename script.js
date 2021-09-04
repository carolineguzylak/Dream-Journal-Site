const dreamTypesID = ["#happy", "#stressful", "#sad", "#boring", "#exciting", "#nightmare"];
const dreamTypes = ["happy", "stressful", "sad", "boring", "exciting", "nightmare"];

// dreams the user has provided so far
var addedDreams = [];
var dreamIndex = -1;
// total number of type boxes checked by user
var totalTypes = 0;
// dictionary of number of each type of dream user has had
var typeCounter = {};
dreamTypesID.forEach(x =>{
    typeCounter[x] = 0;
})

// maybe put all palettes in a separate file then transfer them over?
const palette1 = {"c1":"#d7b9d5", "c2":"#ada7c9", "c3":"#f4cae0", "c4":"#64a6bd"};
const palette2 = {"c1":"#ffd7ba", "c2":"#d8e2dc", "c3":"#fae1dd", "c4":"#fec5bb"};
const palette3 = {"c1":"#bde0fe", "c2":"#ffafcc", "c3":"#ffc8dd", "c4":"#cdb4db"};
const palette4 = {"c1":"#d8f3dc", "c2":"#b7e4c7", "c3":"#52b788", "c4":"#2d6a4f"};
const palette5 = {"c1":"#e7ecef", "c2":"#a3cef1", "c3":"#6096ba", "c4":"#274c77"};

class Dream{
    constructor(title, desc, types, locked, password){
        this.title = title;
        this.desc = desc;
        this.types = types;
        this.locked = locked;
        // password is equal to none if dream is not locked
        this.password = password;
    }
}

// prehide dream password entry
$("#lockedDream").hide();
function displayDream(d){
    // this is called a template literal
    // $("#dreamList").append(`<li> ${d.to_str()} </li>`);

    // this removes previous dream from the display
    $("#dreamTitleBox").find("p").remove();
    $("#dreamDescBox").find("p").remove();
    $("#typeBox").find("p").remove();

    if(d.locked == true){
        $("#lockedDream").show();
        $("#dreamTitleBox").append(`<p>This dream is locked! Enter
            your password to unlock.</p>`);
    } else{
        $("#lockedDream").hide();
        $("#dreamTitleBox").append(`<p>${d.title}</p>`);
        $("#dreamDescBox").append(`<p>${d.desc}</p>`);
        $("#typeBox").append(`<p>${d.types}</p>`);
    }
}

function displayDreamAnalytics(){
    $("#percentages").find("div").remove();
    for (var i=0; i<dreamTypes.length; i++){
        p = 0
        if (totalTypes != 0){
            p = (typeCounter[dreamTypesID[i]] / totalTypes) * 100;
            p = Math.round(p*10)/10;
        }
        $("#percentages").append(`<div id=${dreamTypes[i]}>${dreamTypes[i]}
        : ${p}%</div>`);   
    }
}

$("#submitDream").click(function(){
    var types = []
    for (var i=0; i<dreamTypesID.length; i++){
        var type = $(dreamTypesID[i]).is(":checked");
        if (type == true){
            types.push(dreamTypes[i]);
            typeCounter[dreamTypesID[i]] += 1;
            totalTypes += 1;
        }
        // unchecks all boxes
        $(dreamTypesID[i]).prop('checked', false);
    }

    locked = false;
    password="none"
    if ($("#lock").is(":checked")){
        locked = true;
        password = $("#passBox").val();
        $("#passBox").hide();
    }

    let d = new Dream($("#dreamTitle").val(), $("#dreamDescription").val(), types, locked, password);
    addedDreams.push(d)
    dreamIndex += 1;
    // sets title to empty
    $("#dreamTitle").val("");
    // sets description to empty
    $("#dreamDescription").val("");
    // uncheck lock
    $("#lock").prop('checked', false);
    displayDream(d);
    displayDreamAnalytics();
});

// prehide the passBox
$("#passBox").hide();
$("#lock").click(function(){
    if($("#passBox").is(":hidden")){
        $("#passBox").show();
    }
    else{
        $("#passBox").hide();
    }
});

$("#nextDream").click(function(){
    if (dreamIndex < addedDreams.length - 1){
        dreamIndex += 1;
        displayDream(addedDreams[dreamIndex])
    }
});

$("#prevDream").click(function(){
    if (dreamIndex > 0){
        dreamIndex -= 1;
        displayDream(addedDreams[dreamIndex])
    }
});

$("#calculate").click(function(){
    displayDreamAnalytics();
});

$("#submitPass").click(function(){
    pass = $("#unlockDream").val();
    d = addedDreams[dreamIndex];
    if (d.password == pass){
        console.log("Here!")
        d.locked = false;
        displayDream(d);
    }
});

// color palette selector buttons
$("#paletteButtons").find("input").click(function(){

    for (i=1; i<=5; i++){
        if($(`#p${i}radio`).is(':checked')){
            p = eval(`palette${i}`);
            $("#dreamDisplay").css("background-color", p["c1"]);
            $("#submitDream").css("background-color", p["c1"]);

            $("#configBox").css("background-color", p["c2"]);
            $(".navbar").css("background-color", p["c2"]);
            $("#dreamTitleBox").css("background-color", p["c2"]);
            $("#dreamDescBox").css("background-color", p["c2"]);
            $("#typeBox").css("background-color", p["c2"]);


            $("body").css("background-color", p["c3"]);
            $("#analytics").css("background-color", p["c3"]);

            $("#mainContainer").css("background-color", p["c4"]);
            $("#subContainer").css("background-color", p["c4"]);
        }
    }
});

