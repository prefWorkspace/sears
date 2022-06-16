'use strict';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const userData = localStorageController.getLocalS('userData');
const {
    userCode: requester,
    organizationCode,
    id: userId,
} = JSON.parse(userData);

//모든 측정 데이터 리스트 select API
export async function selectMeasurementInfoList(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null,
    search
) {
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        includeDeviceStatus: true,
        measurementType: 'BM',
        measurementStatusList: [1, 2],
        search,
    });

    return serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

export async function selectMeasurementInfoPage(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null,
    search
) {
    const obj = {
        ...commonRequest(),
        requester,
        organizationCode,
        wardCode,
        sickRoomCode,
        sickBedCode,
        measurementType: 'BM',
        measurementStatusList: [1, 2],
        includeDeviceStatus: true,
        search,
        startDateTime: null,
        endDateTime: null,
        pageNumber: 1,
        count: 10000,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoPage',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//측정 추가 API
export async function insertMeasurementInfo(codeObj, patientData) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
        requester,
        organizationCode,
        orderNumber: 1,
    };
    //birthday 값이 좀 상이함. 이거는 API 업데이트되는데로 수정

    return serverController.ajaxAwaitController(
        'API/Measurement/InsertMeasurementInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            console.log(res);
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

//측정 상태 종료 API
export async function recodingEndMeasurementInfo(measurementCode, route) {
    const obj = {
        ...commonRequest(),
        requester,
        measurementCode,
        measurementStatus: 3,
        dateTime: request_Date_Data(),
    };

    const routeObj = {
        'SX-API-ROUTE': route,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/UpdateMeasurementInfoStatus',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => {
            console.log(err);
        },
        routeObj
    );
}

// 측정 정보 수정 API
export async function updateMeasurementInfo(codeObj, patientData, route) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
    };

    const routeObj = {
        'SX-API-ROUTE': route,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/UpdateMeasurementInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => {
            console.log(err);
        },
        routeObj
    );
}

//측정 추가 및 수정 시, 장치 조회 API
export async function selectDeviceRegisterUnused(search) {
    const obj = {
        ...commonRequest(),
        requester,
        organizationCode,
        search,
        deviceType: 0,
        pageNumber: 1,
        count: 1000,
    };

    return serverController.ajaxAwaitController(
        'API/Device/SelectDeviceRegisterUnusedPage',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 측정 코드 삭제 API
export async function deleteMeasurementInfo(measurementCode, route) {
    const obj = {
        ...commonRequest(),
        requester,
        measurementCode,
    };

    const routeObj = {
        'SX-API-ROUTE': route,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/DeleteMeasurementInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err),
        routeObj
    );
}

// 병상 정보 수정에서 장치 수정 API
export async function updateMeasurement_updateDeviceInfo(deviceInfo) {
    const obj = {
        ...commonRequest(),
        requester,
        ...deviceInfo,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/UpdateDeviceInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 병상 정보 수정에서 장치 삭제 API
export async function updateMeasurement_deleteDeviceInfo(
    deviceInfoIdList,
    measurementCode
) {
    const obj = {
        ...commonRequest(),
        requester,
        deviceInfoIdList,
        measurementCode,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/DeleteDeviceInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 병상 정보 수정에서 장치 추가  API
export async function updateMeasurement_insertDevice(
    measurementCode,
    deviceInfoList
) {
    const obj = {
        ...commonRequest(),
        measurementCode,
        deviceInfoList,
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/InsertDeviceInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// HIS 환자 정보 검색
export async function selectHisPatientList(patientName = null) {
    const obj = {
        requester,
        userId,
        organizationCode,
        patientName,
        ...commonRequest(),
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisPatientList',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
