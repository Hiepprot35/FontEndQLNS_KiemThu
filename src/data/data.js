export const inputs = [

    {
        id: 1,
        name: "HoVaTen",
        type: "text",
        placeholder: "Họ và tên",
        label: "Họ và tên",
        pattern: "^[a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹĐÁ\\s]+$",
        viethoa: "true",
        required: true,
        value: "", // Giá trị mặc định
    },


    {
        id: 2,
        name: "NgaySinh",
        type: "text",
        placeholder: "Ngày sinh",
        label: "Ngày sinh",
        required: true,
        value: "", // Giá trị mặc định
        inputcac: "date"

    },

    {
        id: 3,
        name: "CCCD",
        type: "text",
        placeholder: "Số CCCD",
        label: "Số CCCD",
        required: true,
        value: "", // Giá trị mặc định
        length: "10"

    },

    {
        id: 4,
        name: "SDT",
        type: "text",
        placeholder: "Số điện thoại",
        label: "Số điện thoại",
        pattern: "^[0-9]{9,11}$",
        required: true,
        value: "", // Giá trị mặc định
        length: "10"
    },
    {
        id: 5,
        name: "NoiSinh",
        type: "text",
        placeholder: "Nơi sinh",
        label: "Nơi sinh",
        required: true,
        viethoa: "true",
        pattern: "^[a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹĐÁ\\s]+$",


        value: "", // Giá trị mặc định
    },
    {
        id: 6,
        name: "DiaChiThuongChu",
        type: "text",
        placeholder: "Địa chỉ thường chú",
        label: "Địa chỉ thường chú",
        required: true,
        viethoa: "true",
        pattern: "^[a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹĐÁ\\s]+$",


        value: "", // Giá trị mặc định
    },

    {
        id: 7,
        name: "Email",
        type: "email",
        placeholder: "Email",
        label: "Email",
        required: true,
        value: "", // Giá trị mặc định
    },
    {
        id: 8,
        name: "NgayNhanChuc",
        type: "text",
        placeholder: "Ngày nhận chức",
        label: "Ngày nhận chức",
        required: true,
        value: "", // Giá trị mặc định
        inputcac: "date"

    },
    {
        id: 9,
        name: "PhongBan",
        type: "text",
        placeholder: "Phòng ban",
        label: "Phòng ban",
        required: true,
        value: ["Kế toán", "Kính doanh"], // Giá trị mặc định
    },
    {
        id: 10,
        name: "ChucVu",
        type: "text",
        placeholder: "Chức vụ",
        label: "Chức vụ",
        required: true,
        value: ["Quản lý", "Nhân viên", "Bảo vệ"], // Giá trị mặc định
    },
    {
        id: 11,
        name: "TrinhDoHocVan",
        type: "text",
        placeholder: "Trình độ học vấn",
        label: "Trình độ học vấn",
        required: true,
        value: ["Tiến sĩ", "Thạc sĩ", "Cử nhân", "Cao đẳng"], // Giá trị mặc định
    },
    {
        id: 12,
        name: "GioiTinh",
        type: "text",
        placeholder: "Giới tính",
        label: "Giới tính",
        required: true,
        value: ["Nam", "Nữ"], // Giá trị mặc định
    },

];
export const inputs2 = [

    {
        id: 1,
        name: "HoVaTen",
        type: "text",
        placeholder: "Họ và tên",
        label: "Họ và tên",
        pattern: "^[a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹĐÁ\\s]+$",
        viethoa: "true",
        required: true,
        value: "", // Giá trị mặc định
    },


    {
        id: 2,
        name: "MaNhanVien",
        type: "text",
        placeholder: "Mã Nhân Viên",
        label: "Mã Nhân viên",
        required: true,
        pattern: "^[0-9]*$",
        value: "", // Giá trị mặc định

    },




    {
        id: 3,
        name: "NgayQuyetDinh",
        type: "text",
        placeholder: "Ngày Quyết Định",
        label: "Ngày Quyết Định",
        required: true,
        value: "", // Giá trị mặc định
        inputcac: "date"

    },
    {
        id: 4,
        name: "PhanLoai",
        type: "text",
        placeholder: "Phân loại",
        label: "Phân loại",
        required: true,
        value: ["Khen thưởng", "Kỉ luật"], // Giá trị mặc định
    },
    {
        id: 5,
        name: "NoiDung",
        rows: 10,
        cols: 40,
        placeholder: "Nội dung",
        required: true,
        value: "", // Giá trị mặc định

    },


];
export const DonNghiInput = [
    {
        id: 1,
        name: "NgayBatDau",
        type: "text",
        placeholder: "Ngày Bắt Đầu",
        label: "Ngày Bắt Đầu",
        required: true,
        value: "", // Giá trị mặc định
        inputcac: "date"

    },{
        id: 2,
        name: "NgayKetThuc",
        type: "text",
        placeholder: "Ngày Kết Thúc",
        label: "Ngày Kết Thúc",
        required: true,
        value: "", // Giá trị mặc định
        inputcac: "date"

    }, {
        id: 3,
        name: "NoiDung",
        rows: 10,
        cols: 40,
        placeholder: "Nội dung",
        required: true,
        value: "", // Giá trị mặc định

    },
]
export const links = [
    {
        name: "Home",
        hash: "/",
        role: 1
    },
    {
        name: "Home",
        hash: "/",
        role: 2
    },
    {
        name: "Create",
        hash: "/create-user",
        role: 1
    },
    {
        name: "Assessment",
        hash: "/danhgia",
        role: 1
    },
    {
        name: "Đơn nghỉ",
        hash: "/donnghi",
        role: 2
    }
    ,
    {
        name: "Thêm ca làm việc",
        hash: "/calamviec",
        role: 2
    },
    {
        name: "Thêm hợp đồng",
        hash: "/hopdong",
        role: 1
    }
]