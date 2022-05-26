'use strict';

const { numToDay } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

export function dateScheduleCaseDetailTemplates(_data) {
    const {
        orderNo,
        caseContents,
        caseTitle,
        patientGenger,
        patientAge,
        patientId,
        patientName,
    } = _data;

    return `
    <div class="case">
        <div>
            <p>Case ${orderNo}.</p>
            <p>${caseTitle}</p>
        </div>

        <div>
            <p class="more">자세히</p>
            <p class="fold">접기</p>

            <div class="img_container">
                <img
                    src="/H-Connect/img/under_arrow.svg"
                    alt="아래 화살표"
                />
            </div>
        </div>
    </div>
    <div class="case_cont">
        <div class="case_inner">
            <div class="title">
                <p>Case 1.</p>
                <div>${caseTitle}</div>
            </div>
            <div class="pati_name">
                <p>환자명.</p>
                <div>
                    ${patientName} (${patientAge}. ${
        patientGenger === 'M' ? '남' : '여'
    }).${patientId}
                </div>
            </div>
            <div class="content">
                <p>협진 내용.</p>
                <div>
                    ${caseContents}
                </div>
            </div>
        </div>
    </div>
    `;
}

export function doctorListTemplates(_data) {
    if (!_data) return;

    const { doctorName } = _data;
    return `<p>${doctorName}</p>`;
}

export function canDateWithTemplates(_data) {
    const { consultEndDatetime, consultStartDatetime } = _data;

    return `
        <div>
            <div class="check">
                <div class="input_wrap">
                    <input
                        type="checkbox"
                        id="time1"
                        class="green_custom"
                    />
                    <label for="time1"></label>
                    <label for="time1"
                        >${moment(consultStartDatetime).format(
                            'YY.MM.DD'
                        )} 월요일 ${moment(consultStartDatetime).format(
        'HH:mm'
    )} ~
                        ${moment(consultEndDatetime).format('HH:mm')}</label
                    >
                </div>

                <span>-명 참석</span>
            </div>

            <div class="people">
                
            </div>
        </div>
    `;
}
export function canDateWithTemplatesisentnot(_data) {
    const { consultEndDatetime, consultStartDatetime } = _data;
    const dayNum = moment(consultEndDatetime).day();

    return `
    <div>
        <div class="check">
            <input
                type="checkbox"
                id="frist"
                class="green_custom"
            />
            <label for="frist"></label>
            <label for="frist"
                >${moment(consultStartDatetime).format('YY.MM.DD')} ${numToDay(
        dayNum
    )} ${moment(consultStartDatetime).format('HH:mm')} ~
                ${moment(consultEndDatetime).format('HH:mm')}</label
            >
        </div>
        <p class="dupli">
            ※ 외래진료 일정과 중복됩니다.
        </p>
    </div>
    `;
}
