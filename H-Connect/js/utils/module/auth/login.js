
const TEN_YEAR_DAY = 10 * 365;

function auto_Login(){
    if(autoLogin_input.checked){
        return;    
    }
};

function get_Saved_Id(){
    const getId = localStorageController.getLocalS("Hconnect-id");  //로컬스토리지에 저장된 id
    if(getId){
        $(".login #id").val(getId);
    }
};

function Login_Fetch(){

    const id_Input = $(".login #id").val();  //아이디 input 값
    const pw_Input = $(".login #pw").val(); //비밀번호 input 값
    const saveId_input = $(".login .check #id_save").is(":checked"); // 아이디 저장 체크 박스 boolean

    const req = JSON.stringify({
            id: id_Input,
            password: pw_Input,
            ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Account/LoginHIS", "POST", req, (res) => {
        if(res.result){
            const userData = res.userAccount; 
            const apiServerinfoList = res.apiServerinfoList;
            
            cookieController.setCookie("accesToken", res.accessToken, TEN_YEAR_DAY);
            localStorageController.setLocalS("userData", userData);

            if(apiServerinfoList){
                localStorageController.setLocalS("apiserverinfoList", apiServerinfoList);
            }
            
            if(saveId_input) {
                localStorageController.setLocalS("Hconnect-id", id_Input);
            }
            
            switch(userData.level){
                case 1: 
                    location.href = "nurse/index.html";
                    break;
                case 2: 
                    location.href = "nurse/index.html";
                    break;
                case 5: 
                    location.href = "doctor/index.html";
                    break;
                case 8: 
                    location.href = "nurse/index.html";
                    break;
                case 14: 
                    location.href = "nurse/index.html";
                    break;
            }
        }else{
            cookieController.removeCookie("accesToken");
        }
    }, (err) => console.log(err));
}

function Enter_Press_Login(e){
    if(e.key === "Enter"){
        Login_Fetch();
    }
}

get_Saved_Id();

$(".login #pw").on("keypress", Enter_Press_Login);

$(".login #login_button").on("click", Login_Fetch);

