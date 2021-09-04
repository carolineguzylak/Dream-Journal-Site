
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

const palette1 = {"c1":"rgb(28, 28, 121)", "c2":"rgb(76, 96, 206)", "c3":"rgb(88, 88, 146)", "c4":"rgb(15, 15, 65)"};
const palette2 = {"c1":"rgb(209, 75, 131)", "c2":"rgb(178, 66, 230)", "c3":"rgb(233, 181, 217)", "c4":"rgb(241, 45, 183)"};
const palette3 = {"c1":"rgb(123, 204, 157)", "c2":"rgb(136, 149, 224)", "c3":"rgb(217, 173, 226)", "c4":"rgb(69, 116, 94)"};
const palette4 = {"c1":"rgb(70, 20, 134)", "c2":"rgb(15, 55, 100)", "c3":"rgb(106, 88, 172)", "c4":"rgb(18, 82, 37)"};
const palette5 = {"c1":"rgb(253, 248, 197)", "c2":"rgb(255, 247, 129)", "c3":"rgb(247, 146, 64)", "c4":"rgb(241, 68, 45)"};




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



// color palette selector buttons

$("#paletteButtons").find("input").click(function(){

    for (i=1; i<=5; i++){
        if($(`#p${i}radio`).is(':checked')){
            p = eval(`palette${i}`);
            $("#dreamDisplay").css("background-color", p["c1"]);
            $("#submitDream").css("background-color", p["c1"]);
        }
    }
});

