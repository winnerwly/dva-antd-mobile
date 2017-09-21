import request from '../utils/request';

export function ajaxForm() {
    return request('https://cnodejs.org/api/v1/topics', {
        method: 'get',
    });
}
