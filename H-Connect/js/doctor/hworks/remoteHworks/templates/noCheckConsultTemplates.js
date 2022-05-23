'use strict';

export function noCheckConsultTemplates(_data) {
    const { consultId, orderNo, caseTitle, replyCount, endDatetime } = _data;

    return `
        <div
            class="row"
            onclick="location.href='remote_check.html?consultId=${consultId}'"
        >
            <div>
                <p class="time">
                    <span>${moment(endDatetime).format('YY.MM.DD')}</span>&nbsp;
                    <span>${moment(endDatetime).format('HH:mm')}</span> 까지
                </p>

                <p class="case">Case ${orderNo}.</p>

                <p class="discussion">
                    ${caseTitle}
                </p>
            </div>

            <p class="count">
                <span>${replyCount}</span> 개의 소견
            </p>
        </div>
    `;
}