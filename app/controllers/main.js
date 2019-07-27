/* 
Lấy danh sách người dùng từ backend về
*/
$(document).ready(function () {
    var mangNguoiDung = [];
    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();
    ajaxNguoiDung
        //js khong cho chay tiep ->mang rong
        .done(function (result) {
            mangNguoiDung = result;
            //Luu vao local storage
            HienThi(mangNguoiDung);
        })
        .fail(function (err) {
            console.log(err);
        })
    function HienThi(mangNguoiDung) {
        var tbodyDanhSach = $("#tblDanhSachNguoiDung");
        var content = "";
        mangNguoiDung.map(function (nguoiDung,index) {
            content += `
                <tr>
                    <td>${index+1}</td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td>${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td>
                    <td>
                    <button class="btn btn-danger btnXoa" data-id ="${nguoiDung.TaiKhoan}">Xóa</button>
                    </td>
                </tr>
                `
        })
        tbodyDanhSach.html(content);
    }
    $("#btnThemNguoiDung").click(function(){
        $("#modal-title").html("Thêm người dùng");
        var btn = `
            <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
        `
        $("#modal-footer").html(btn);
    })
    //delegate: đảm bào cái btnThem có trên trình duyệt
    $("body").delegate("#btnThem","click",function(){
        //Lay thong tin
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var maLoai = $("#maLoaiNguoiDung").val();
        //Tao doi tuong
        var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDienThoai,maLoai);
        //Them vao database(API)
        var ajaxThem = nguoiDungService.ThemNguoiDung(nguoiDung);
        ajaxThem
        .done(function(result){
            location.reload();
        })
        .fail(function(err){
            console.log(err);
        })
    })
    $("body").delegate(".btnXoa","click",function(){
        var taiKhoan = $(this).data("id");
        nguoiDungService.XoaNguoiDung(taiKhoan)
        .done(function(){
            location.reload();
        })
        .fail(function(err){
            console.log(err);
        })
    })
})


