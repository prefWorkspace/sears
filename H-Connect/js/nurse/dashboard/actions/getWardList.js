import { serverController } from '../../../utils/controller/serverController.js';
import { commonRequest } from '../../../utils/controller/commonRequest.js';

/* s : 모니터링 대상 데이터 가져오기 */
export async function getWardList() {
    //병동, 병실, 병상 가져오기
    let result = {};
    await serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickRoom: true,
        }),
        (res) => {
            if (res.result) {
                result = res.wardList;
            }
        }
    );
    return result;
}
