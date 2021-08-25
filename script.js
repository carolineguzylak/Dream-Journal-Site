
const dreamTypesID = ["#happy", "#stressful", "#sad", "#boring", "#exciting", "#nightmare"];
const dreamTypes = ["happy", "stressful", "sad", "boring", "exciting", "nightmare"];

// dreams the user has provided so far
var addedDreams = [];
var dreamIndex = -1;



class Dream{
    constructor(desc, types){
        this.desc = desc;
        this.types = types;
    }

    to_str(){
        return this.desc + " " + this.types;
    }

}

function displayDream(d){
    // this is called a template literal
    // $("#dreamList").append(`<li> ${d.to_str()} </li>`);

    // this removes previous dream from the display
    $("#dreamDescBox").find("p").remove()
    $("#typeBox").find("p").remove()

    $("#dreamDescBox").append(`<p>${d.desc}</p>`);
    $("#typeBox").append(`<p>${d.types}</p>`);
}

$("#submitDream").click(function(){
    var types = []
    for (var i=0; i<dreamTypesID.length; i++){
        var type = $(dreamTypesID[i]).is(":checked");
        if (type == true){
            types.push(dreamTypes[i]);
        }
        // unchecks all boxes
        $(dreamTypesID[i]).prop('checked', false);
    }

    let d = new Dream($("#dreamDescription").val(), types);
    addedDreams.push(d)
    dreamIndex += 1;
    console.log(dreamIndex)

    // sets description to empty
    $("#dreamDescription").val("");

    displayDream(d);
});

$("#nextDream").click(function(){
    if (dreamIndex < addedDreams.length - 1){
        dreamIndex += 1;
        displayDream(addedDreams[dreamIndex])
    }
    console.log(dreamIndex)
    console.log(addedDreams)
});

$("#prevDream").click(function(){
    if (dreamIndex > 0){
        dreamIndex -= 1;
        displayDream(addedDreams[dreamIndex])
    }
    console.log(dreamIndex)
    console.log(addedDreams)
});