

function deleteSickRoomHandle(wardCode){
    let sickRoomCode;
    $('.nurse .hospital_room .cont .ward_list .btn_list .btn_delete').on('click', function () {
        $('.pop.delete_room .overlay').fadeIn();
        sickRoomCode = $(this).data("sickroomcode");
    });

    $('.pop.delete_room .overlay .btn_list .btn_cut').on("click", function(){
        
        const req = JSON.stringify({
            requester,
            organizationCode,
            wardCode,
            sickRoomCode,
            ...commonRequest()
        })
    
        serverController.ajaxAwaitController("API/Manager/DeleteSickRoom", "POST", req, (res) => {
            console.log(res);
            if(res.result){
                $("div").remove(".section.right.hospital_room .container .cont .container .ward_list");
                selectSickRoom(wardCode);
            }
        }, (err) => {console.log(err)})

    })
}

