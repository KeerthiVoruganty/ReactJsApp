import $ from "jquery";

$(document).ready(function() {

    function handleSelectChange(){
        alert();
    }
// $('#dvOther').attr("visibility","hidden");

    $(".btn-pref .btn").click(function () {
        var element = $(this).attr('href');
        // alert($(this).attr('href'));
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        $(".tab-pane").removeClass("active");
        $(element).addClass("active"); // instead of this do the below 
        $(element).attr("display","block");
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });
});