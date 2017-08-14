/*global $, console*/

$(document).ready(function () {
    
    "use strict";
    
    var nm, em, sb, ms, dt, err, collect, i;

    dt = {};
    err = [];

    $(".container").load("./partials/home.html");
    
    
    function handleSuccess(response) {
        $(".feedback").html(response);
        
        //clear your form:
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
    }
    

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus = " + textStatus + "\n" + "errorThrown = " + errorThrown);
    }
   
    
    function validateForm(ev) {
        ev.preventDefault();
        
        //collect the user input in variables:
        nm = $("#name").val();   
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#message").val();

 
        //VALIDATE NAME FIELD: 
        if (nm === "") {
            err.push("Name?");
        } else {
            dt.name = nm;
        }
          
        //EVALUATE EMAIL FIELD:
        if (em === "") {
            err.push("Email?");
        } else {
            dt.email = em;
        }
    
        //EVALUATE SUBJECT FIELD: 
        if (sb === "") {
            err.push("Subject?");
        } else {
            dt.subject = sb;
        }
    
        //EVALUATE MESSAGE FIELD: 
        if (ms === "") { 
            err.push("Message?");
        } else {
            dt.message = ms;
        }
    
    
        //if errors array is empty:
        if (err.length === 0) {
            $.ajax({
                type: "POST",
                url: "./server-side-script/web-service.php",
                data: dt,
                dataType: "html"
            }).done(handleSuccess).fail(handleError);
        } else {
            collect="Please fix the following errors:";
            
            $.each(err, function (i, v) {
                collect += (v);
            });
        }
 
        //pass collect to HTML element:
        $(".feedback").html(collect);
        
        err = [];
            
        collect = "";             
    }
             

    //prevent default behaviour of link element:
    $("nav ul li a").on("click", function (ev) {
       
        ev.preventDefault();
          
       //Use if-statement to check if $(this).text()is equal to "Home":  
        if ($(this).text() === "Home") {    
            $(".container").load("./partials/home.html");
        } else {
            $(".container").load("./partials/contact.html", function () {
                $("form").on("submit", validateForm);
            });
        }
    });                       
});