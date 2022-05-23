'use strict';

const { selectConsultAlarmsList, selectOpinionConsultList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

const { fakeConsultAlarmList } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { remoteAlarmRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/renders/remoteAlarmRender.js'
    )
);

async function init() {
    const { result, list: consultAlarmList } = await selectConsultAlarmsList();
    if (result && consultAlarmList.length > 0) {
        remoteAlarmRender(consultAlarmList);
        $('#alram_count').text(consultAlarmList.length);
    } else {
        remoteAlarmRender(fakeConsultAlarmList);
        $('#alram_count').text(fakeConsultAlarmList.length);
    }
}

await init();