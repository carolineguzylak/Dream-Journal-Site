
$("#submitDream").click(function(){
    var desc = $("#dreamDescription").val();
    $("#dreamList").append("<li>" + desc + "</li>");
});