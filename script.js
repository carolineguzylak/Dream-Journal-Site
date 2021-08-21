
var dreamTypesID = ["#happy", "#stressful", "#sad", "#boring", "#exciting", "#nightmare"]
var dreamTypes = ["happy", "stressful", "sad", "boring", "exciting", "nightmare"]

class Dream{
    constructor(desc, types){
        this.desc = desc;
        this.types = types;
    }

    to_str(){
        return this.desc + " " + this.types;
    }

}

$("#submitDream").click(function(){

    var types = " "
    for (var i=0; i<dreamTypesID.length; i++){
        var type = $(dreamTypesID[i]).is(":checked");
        if (type == true){
            types += dreamTypes[i] + " ";
        }
        // unchecks all boxes
        $(dreamTypesID[i]).prop('checked', false);
    }

    let d = new Dream($("#dreamDescription").val(), types)

    $("#dreamList").append("<li>" + d.to_str() + "</li>");

    // sets description to empty
    $("#dreamDescription").val("");

});