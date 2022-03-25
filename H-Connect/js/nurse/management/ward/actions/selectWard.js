'use strict';
import { Create_newWard } from '../renders/insertWardList.js';
import { updateWard } from './updateWard.js';
import { CONSTANT } from '../renders/constant.js';
import { deleteWard } from './deleteWard.js';
import { selectWardList } from '../../../../utils/module/select/selectList.js';

//병동 조회
export async function selectWard() {
    const { wardList } = await selectWardList();
    CONSTANT.wardList = wardList;
    Create_newWard(wardList);
    updateWard(); //병동 수정 이벤트
    deleteWard(); //병동 삭제 이벤트
}

selectWard();
