const validatorFunction = {
    isMinute: (value) => {
        if (0 <= parseInt(value) && parseInt(value) < 60) {
            return true;

        }
        if (0 > parseInt(value) || parseInt(value) >= 60) {

            return false
        }
    },
    isHour: (value) => {
        if (0 <= parseInt(value) && parseInt(value) < 24) {
            return true;

        }
        if (0 > parseInt(value) || parseInt(value) >= 24) {

            return false
        }
    },
    isDay: (value) => {
        if (0 < parseInt(value) && parseInt(value) < 32) {
            return true;

        }
        if (0 > parseInt(value) || parseInt(value) > 32) {

            return false
        }
    },
    isMonth: (value) => {
        if (0 < parseInt(value) && parseInt(value) < 13) {
            return true;

        } if (0 > parseInt(value) || parseInt(value) > 13) {

            return false
        }
    },
    isYear: (value) => {
        if (999 < parseInt(value) && parseInt(value) <= 9999) {
            return true;

        }
        if (999 > parseInt(value) || parseInt(value) >= 9999) {
            return false;

        }
    },
    isCharacter: (value) => {
        if (/^[a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹđĐÁ\s]+$/.test(value)) {
            return true;
        }
        return null; // Không có lỗi, trả về null
    },
    isNumeric: (value) => {

        if (/^[0-9]+$/.test(value)) {
            return "Giá trị là số. Vui lòng nhập lại.";
        }
        return null; // Không có lỗi, trả về null
    },
    isLength: (value) => {
        if (value.length != 10) {
            return "Giá trị là chữ. Vui lòng nhập lại.";
        }
        return null
    },
    containsSpecialCharacter: (value) => {
        if (/[`!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(value)) {
            return "Giá trị chứa ký tự đặc biệt. Vui lòng nhập lại.";
        }
        return null; // Không có lỗi, trả về null
    },
    isFirstLetterUpperCase(value) {
        // Kiểm tra nếu chuỗi rỗng
        if (value) {

            // Tách chuỗi thành các từ bằng dấu cách
            const words = value.split(" ");
            // Kiểm tra xem ký tự đầu tiên của từng từ có viết hoa không
            for (let i = 0; i < words.length; i++) {
                const inputString = words[i];
                if (inputString.charAt(0) !== inputString.charAt(0).toUpperCase()) {
                    return false; // Trả về false nếu có ít nhất một từ viết thường
                }
            }
        }

        return true; // Trả về true nếu tất cả các từ đều viết hoa
    }



};

export default validatorFunction;
