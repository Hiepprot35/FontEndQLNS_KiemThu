import { isValid, parse } from 'date-fns';

export default function DateExist(dateString) {
    if (dateString) {
        const date = parse(Object.values(dateString), 'yyyy/M/d', new Date());
        if (!isValid(date)) {
            return "Ngày tháng năm không tồn tại"
        }
        return ""

    }
}