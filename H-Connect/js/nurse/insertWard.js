import serverController from "../module/serverController.js";
import commonRequest from "../module/commonRequest.js";
import localStorageController from "../module/localStorage.js";

const ward_Name = document.querySelector(".new_ward .content #ward_Name");
const ward_Insert_Button = document.querySelector(".new_ward .btn_list #ward_Button");

//유저 정보 
const userData = JSON.parse(localStorageController.getLocalS("userData"));


function Insert_New_Ward(){
    
    const req = JSON.stringify({
        requester: userData.userCode,
        organizationCode: userData.organizationCode,
        ward: ward_Name.value,
        orderNumber: 1,
        etc: "",
        ...commonRequest()
    })

    serverController.connectFetchController("API/Manager/InserWard", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            console.log("서버 통신 성공")
        }
    }, (err) => {console.log(err)});
}

ward_Insert_Button.addEventListener("click", Insert_New_Ward);