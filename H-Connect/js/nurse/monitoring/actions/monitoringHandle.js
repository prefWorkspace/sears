const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

const { addDeviceList } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/renders/addDeviceList.js')
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { selectBoxSickRoom, selectBoxWard, selectBoxSickBed } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/addSickBedSelectBox.js'
    )
);

const { InsertMeasurementInfo } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
);

const deviceInfoList = [];

//병상 추가 팝업창 병동, 병실, 병상 셀렉트 박스 셋팅

//장치 추가
function insertDevice() {
    let serial_Reg;
    const deviceName = $(
        '.pop.new_room_pop .new_regi .selectBox2 .label'
    ).text();
    const deviceType = device_NameToType(deviceName);
    const serialNumber = $(
        '.pop.new_room_pop .input_box .input_wrap input'
    ).val();

    deviceName === '심전도 패치'
        ? (serial_Reg = /[A-Z0-9]{6,7}/)
        : (serial_Reg = /[B-Z0-9]{6,7}/);

    if (serial_Reg.test(serialNumber)) {
        const obj = {
            deviceType,
            serialNumber,
            macAddress: getMacaddress(deviceType, serialNumber),
        };
        deviceInfoList.push(obj);
        $('.pop.new_room_pop .input_box .input_wrap input').val('');
        $('.pop.new_room_pop').removeClass('active');
        addDeviceList(deviceInfoList);
    } else {
        $('.pop.new_room_pop .new_regi .input_wrap span').addClass('active');
    }
}

//병상 추가
function insertSickBed() {
    const name = $('.pop.new_room_pop .new_room #patient_name').val();
    const age = +$('.pop.new_room_pop .new_room #patient_age').val();
    const gender =
        $('.pop.new_room_pop .new_room .patient_info .sex_label')
            .text()
            .replaceAll(' ', '')
            .replaceAll('\n', '') === '남자'
            ? 1
            : 2;
    const patientCode = $('.pop.new_room_pop .new_room #patient_MRN').val();
    const wardCode = $('#ward_code').data('wardcode');
    const sickRoomCode = $('#sickroom_code').data('sickroomcode');
    const sickBedCode = $('#sickbed_code').data('sickbedcode');

    const codeObj = {
        wardCode,
        sickRoomCode,
        sickBedCode,
    };

    const patientData = {
        patientCode,
        name,
        gender,
        age,
        deviceInfoList,
        patientStatus: 3,
        ssn: '000000-9999999', //주민등록번호
        foreigner: 0,
        phoneNumber: '010-0000-0000',
        measurementType: 'BM',
        measurementStatus: 2,
        duration: 24,
        startDateTime: request_Date_Data(),
    };

    InsertMeasurementInfo(codeObj, patientData);
}

//병동 추가 셀렉트 박스 이벤트

export async function sickbedSelectBoxHandle() {
    $(
        '.pop.new_room_pop .overlay .new_room .selectBox2 .bed_option .bed_list'
    ).on('click', function () {
        console.log('sss');
        const item = $(this).text();
        const sickBedCode = $(this).data('sickbedcode');
        $(this).parent().parent().find('.label').text(item);
        $(this)
            .parent()
            .parent()
            .find('.label')
            .attr('data-sickbedcode', sickBedCode);
        $(this).parent().parent().toggleClass('active');
    });
}

export async function sickRoomSelectBoxHandle(wardCode) {
    $(
        '.pop.new_room_pop .overlay .new_room .selectBox2 .room_option2 .room_list2'
    ).on('click', async function () {
        const item = $(this).find('p').text();
        const sickRoomCode = $(this).data('sickroomcode');
        $(this).parent().parent().find('.label').text(item);
        $(this)
            .parent()
            .parent()
            .find('.label')
            .attr('data-sickroomcode', sickRoomCode);
        $(this).parent().parent().toggleClass('active');
        await selectBoxSickBed(wardCode, sickRoomCode);
        sickbedSelectBoxHandle();
    });
}

//병상 추가 셀렉트 박스 이벤트
export async function wardSelectBoxHandle() {
    await selectBoxWard();
    $('.pop.new_room_pop .new_room .selectBox2 .ward_option2 .ward_list2').on(
        'click',
        async function () {
            const item = $(this).find('p').text();
            const wardCode = $(this).data('wardcode');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', wardCode);
            $(this).parent().parent().toggleClass('active');
            $('.pop.new_room_pop .new_room .selectBox2 .room_label2').text(
                '병실선택'
            );
            $('.pop.new_room_pop .new_room .selectBox2 .bed_label').text(
                '병상선택'
            );
            await selectBoxSickRoom(wardCode);
            sickRoomSelectBoxHandle(wardCode);
        }
    );
}

wardSelectBoxHandle();

$('.pop.new_room_pop .new_room .btn_list .blf').on('click', insertSickBed);
$('.pop.new_room_pop .overlay .new_regi .check').on('click', insertDevice);
