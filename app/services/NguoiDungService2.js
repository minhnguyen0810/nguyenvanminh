function NguoiDungService(){
    this.LayDanhSachNguoiDung = function(){
        return $.ajax({
            url: "http:///svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })

    }
    this.ThemNguoiDung = function(NguoiDungMoi){
        return $.ajax({
            url: "http:///svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: NguoiDungMoi,
        })
    }
    this.XoaNguoiDung = function(id){
        return $.ajax({
            url: `http:///svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE",
        })
    }
}