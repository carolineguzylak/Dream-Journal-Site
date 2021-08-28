
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




class Dream{
    constructor(title, desc, types){
        this.title = title;
        this.desc = desc;
        this.types = types;
    }
}

function displayDream(d){
    // this is called a template literal
    // $("#dreamList").append(`<li> ${d.to_str()} </li>`);

    // this removes previous dream from the display
    $("#dreamTitleBox").find("p").remove();
    $("#dreamDescBox").find("p").remove();
    $("#typeBox").find("p").remove();

    $("#dreamTitleBox").append(`<p>${d.title}</p>`);
    $("#dreamDescBox").append(`<p>${d.desc}</p>`);
    $("#typeBox").append(`<p>${d.types}</p>`);
}

function displayDreamAnalytics(){
    $("#percentages").find("div").remove();
    for (var i=0; i<dreamTypes.length; i++){
        p = 0
        if (totalTypes != 0){
            p = (typeCounter[dreamTypesID[i]] / totalTypes) * 100;
            p = Math.round(p*10)/10;
        }
        console.log(p)

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
            typeCounter[dreamTypesID[i]] += 1
            totalTypes += 1
        }
        // unchecks all boxes
        $(dreamTypesID[i]).prop('checked', false);
    }
    let d = new Dream($("#dreamTitle").val(), $("#dreamDescription").val(), types);
    addedDreams.push(d)
    dreamIndex += 1;
    // sets description to empty
    $("#dreamDescription").val("");
    displayDream(d);
    displayDreamAnalytics();
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

