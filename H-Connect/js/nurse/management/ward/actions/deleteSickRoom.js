'use strict';
import { serverController } from '../../../../utils/controller/serverController.js';
import { selectSickRoom } from './selectSickRoom.js';
import { CONSTANT } from '../renders/constant.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';

const { userCode: requester, organizationCode } = CONSTANT.userData;
//병실 삭제
export function deleteSickRoom(_wardCode) {
    let sickRoomCode;
    $('.nurse .hospital_room .cont .ward_list .btn_list .btn_delete').on(
        'click',
        function () {
            $('.pop.delete_room .overlay').fadeIn();
            sickRoomCode = $(this).data('sickroomcode');
        }
    );

    $('.pop.delete_room .overlay .btn_list .btn_cut').on('click', function () {
        const req = JSON.stringify({
            requester,
            organizationCode,
            _wardCode,
            sickRoomCode,
            ...commonRequest(),
        });

        serverController.ajaxAwaitController(
            'API/Manager/DeleteSickRoom',
            'POST',
            req,
            (res) => {
                if (res.result) {
                    $('div').remove(
                        '.section.right.hospital_room .container .cont .container .ward_list'
                    );
                    selectSickRoom(_wardCode);
                    $('.pop.delete_room .overlay').fadeOut();
                }
            },
            (err) => {
                console.log(err);
            }
        );
    });
}
