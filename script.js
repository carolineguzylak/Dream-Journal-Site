
var dreamTypesID = ["#happy", "#stressful", "#sad", "#boring", "#exciting", "#nightmare"]
var dreamTypes = ["happy", "stressful", "sad", "boring", "exciting", "nightmare"]

$("#submitDream").click(function(){
    var desc = $("#dreamDescription").val();
    var types = " "

    for (var i=0; i<dreamTypesID.length; i++){
        var type = $(dreamTypesID[i]).is(":checked");
        if (type == true){
            types += dreamTypes[i] + " ";
        }
    }

    $("#dreamList").append("<li>" + desc + types + "</li>");
});