function NguoiDungService() {
    //Lấy dah sách người dùng
    this.LayDanhSachNguoiDung = function () {
        //ajax nhan vao doi tuong {}
        //request ve server
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
    }
    //Them nguoi dung
    this.ThemNguoiDung = function (nguoiDungMoi) {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDungMoi,
        })
    }
    this.XoaNguoiDung = function (id) {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE",
        })
    }
}