'use strict';

export function wardListItem(item) {
    return `
        <li class="optionItem ward_list2" data-wardcode="${item.wardCode}">
            <p>${item.ward}</p>
            <span class="bed_count lot"
                >+8 여유</span
            >
        </li>
    `;
}

export function sickRoomListItem(item) {
    return `
        <li class="optionItem room_list2" data-sickroomcode="${item.sickRoomCode}">
            <p><span>${item.sickRoom}</span> 호실</p>
            <span class="bed_count lot"
                >+1 여유</span
            >
        </li>
    `;
}

export function sickBedListItem(item) {
    return `
        <li class="optionItem bed_list" data-sickbedcode="${item.sickBedCode}">
            ${item.sickBed}번 병상
        </li>
    `;
}
