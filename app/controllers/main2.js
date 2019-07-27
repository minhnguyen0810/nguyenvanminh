$(document).ready(function () {
    var mangNguoiDung = [];
    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();

    ajaxNguoiDung
        .done(function (result) {
            mangNguoiDung = result;
            var jsondata = JSON.stringify(mangNguoiDung);
            localStorage.setItem("danhsachnguoidung", jsondata);
            HienThi(mangNguoiDung);
        })
        .fail(function (err) {
            console.log(err);
        })
    function HienThi(mangNguoiDung) {
        var content = "";
        var tbodydanhsach = $("#tblDanhSachNguoiDung");
        mangNguoiDung.map(function (nguoiDung, index) {
            content += `
            <tr>
                <td>${index + 1}</td>
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
        tbodydanhsach.html(content);
    }

    $("#btnThemNguoiDung").click(function () {
        $("#modal-title").html("Thêm người dùng");
        var btn = `
            <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
        `
        $("#modal-footer").html(btn);
    })
    $("body").delegate("#btnThem", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#maLoaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);

        var ajaxNguoiDung = nguoiDungService.ThemNguoiDung(nguoiDung);
        ajaxNguoiDung
            .done(function (result) {
                var jsondata = localStorage.getItem("danhsachnguoidung");
                mangNguoiDung = JSON.parse(jsondata);
                mangNguoiDung.push(result);
                jsondata = JSON.stringify(mangNguoiDung);
                localStorage.setItem("danhsachnguoidung",jsondata);
                HienThi(mangNguoiDung);
            })
            .fail(function (err) {
                console.log(err);
            });
    })
    $("body").delegate(".btnXoa", "click", function () {
        var tk = $(this).data("id");
        var ajaxNguoiDung = nguoiDungService.XoaNguoiDung(tk);
        ajaxNguoiDung
            .done(function (result) {

            })
            .fail(function (err) {
                console.log(err);
            })
    })
})