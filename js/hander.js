//function getElementById
let getID = (id, error, style, color) =>{
    let err = $(id).text(error).css(style, color);
    return err;
}

// function check username
var checkUsername = (user) =>{
    if(user == null || user == ''){
        getID('#messageUser',"User name can't be blank",'color','red');
        return false;
    }
    if(user.length < 6){
        getID('#messageUser',"Username length must be atleast 6 characters long.",'color','red');
        return false; 
    }else{
         getID('#messageUser','','','');
    }
}

//function check Email
var checkEmail = (email) =>{
    let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email == null || email == ''){
        getID('#messageEmail',"Email can't be blank",'color','red');
        return false; 
    }
    if(validateEmail.test(email)){
        getID('#messageEmail','','','');
    }else{
        getID('#messageEmail',"Your email should follow the format name@domain.com",'color','red');
        return false; 
    }
}

//function check password
var checkPassword = (pass) =>{
    if(pass == null || pass == ''){
        getID('#messagePass',"Password can't be blank",'color','red');
        return false;
    }
    if(pass.length < 6){
        getID('#messagePass',"Username length must be atleast 6 characters long.",'color','red');
        return false; 
    }else{
        getID('#messagePass','','','');
    }
//    else{
//        if(/[a-z]/.test(pass) && /[A-Z]/.test(pass) && /\W/.test(pass) && /[1-9]/.test(pass)){
//        getID('#messagePass','','',''); 
//        }else{
//            getID('#messagePass',"Your password should contains Uppaercase, one of !@#$%^&*()_+ and number",'color','red');  
//            return false;     
//        }
//    }
}

//function check confirm password:
var checkCfPassword = (confirmPass, pass) => {
    if(confirmPass == null || confirmPass  == ''){
        getID('#messageConfirmPass',"Confirm password can't be blank",'color','red');
        return false;
    }
    if(confirmPass != pass){
        getID('#messageConfirmPass',"Confirm password do not match",'color','red');
        return false;
    }else{
        getID('#messageConfirmPass','','',''); 
    }
}

//check radio
$('#male').click(function(){
    $('#female').attr("checked", false);
})

$('#female').click(function(){
    $('#male').attr("checked", false);
})

//function Generate password
var generatePass = (number) =>{
    
    let strList = 'zxcvbnmasdfghjklqwertyuiop!@#$%^&*1234567890';
    let strNumber = '0123456789';
    let strChar = '!@#$%^&*';
    let strAlpha = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    let stralpha = 'zxcvbnmasdfghjklpoiuytrewq'
    let tmt = '';
    let leng = number - 4;
    let i;
    
    
    for(i = 0; i<leng; i++){
        tmt += strList.charAt(Math.floor(Math.random()* strList.length))
    }
    
    tmt += strNumber.charAt(Math.floor(Math.random()* strNumber.length))
    tmt += strChar.charAt(Math.floor(Math.random()* strChar.length))
    tmt += strAlpha.charAt(Math.floor(Math.random()* strAlpha.length))
    tmt += stralpha.charAt(Math.floor(Math.random()* stralpha.length))
   
    alert(tmt);
    
    return tmt;
}

//
if ($("#password").keydown(function(event){
     $("#confirmPassword").removeAttr("disabled");
     //$("#rePassword").css("background", "black");
}));

//function shake
var shake = (id) => {
    $(id).effect("shake", {times:4}, 1000 );
}

//submitdata
var submitData = (e) => {
    //remove browser control'loai bo kiem soat trinh duyet'
    e.preventDefault();

    setTimeout(function (){
        $('#button').unbind('click').click();
    }, 2000); 
    
    $('#button').submit();
    
}

//function Main.....
$(document).ready(function(){
    
    $('#button').click(function(){
        
        var user = $('#username').val().trim();
        var email = $('#email').val().trim();
        var pass = $('#password').val().trim();
        var confirmPass = $('#confirmPassword').val().trim();
        
        setTimeout(function(){
            $('#button').prop('disabled',false);
            $('#loadingtext').hide();

        }, 2000);
        
        $(this).prop('disabled',true);
        $('#loadingtext').show();
        
        if(checkUsername(user) == false){
            shake('#username')         
            return false;
        }
        
         if(checkEmail(email) == false){
            shake('#email') 
            return false;
        }
        
         if(checkPassword(pass) == false){
            shake('#password') 
            return false;
        }
        
        
        checkCfPassword(confirmPass,pass);
        
        setTimeout(function(){
            location.reload();
        },2000)
     

         });

    });
    
    $('#number').click(function(){
        
    })


    $(document).ready(function(){
            
            //attach keypress to input
            $('#number').keydown(function(event) {
                // Allow special chars + arrows 
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 
                    || event.keyCode == 27 || event.keyCode == 13 
                    || (event.keyCode == 65 && event.ctrlKey === true) 
                    || (event.keyCode >= 35 && event.keyCode <= 39)){
                        return;
                }else {
                    // If it's not a number stop the keypress
                    if (event.shiftKey || (event.keyCode < 54 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                        event.preventDefault(); 
                    }
                    
                }
            });
        });

    
    $('#generate').click(function(){
        var number = $('#number').val().trim();
        if(number < 6 || number > 9){
            alert('6 < num ber < 9')
            return;
        }
        var text = generatePass(number);

        $("#password").val(text);
        getID('#confirmPassword','','','');      
        $( "#confirmPassword" ).prop( "disabled", true );
        getID('#messageConfirmPass','','display','none');      
    });
