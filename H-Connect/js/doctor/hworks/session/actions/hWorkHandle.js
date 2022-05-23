'use strict';

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const {
    selectScheduleCount,
    selectRemoteSessionList,
    selectRealTimeAndOpinionAndEmergencyConsultView,
} = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/actions/hWorksAPI.js')
);

const { hworkSessionList } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/renders/hWorkRender.js')
);

const { mok } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

// 일정 및 알림 카운트 표시
async function init() {
    const { result, list } = await selectScheduleCount();
    if (result) {
        const { sessionCount, myScheduleCount, consultCount, notConfirmCount } =
            list;

        $('#mySchedule').text(myScheduleCount);
        $('#withSchedule').text(consultCount);
        $('#noChecked').text(notConfirmCount);
        $('#session_count').text(sessionCount);

        // 원활한 작업을 위해서 두개를 바꿨음
        // 나중에 if랑 else랑 바꿀 것.
        if (sessionCount === 0) {
            $('.schedule .btn_section').addClass('active');
            await sessionListHandle();
        } else {
            $('.schedule .btn_today').addClass('active');
            await sessionListHandle();
        }
    }
}

async function sessionListHandle() {
    const { result, list } = await selectRemoteSessionList();

    if (result) {
        hworkSessionList(list);
    } else {
        hworkSessionList(mok);
    }
}

await init();