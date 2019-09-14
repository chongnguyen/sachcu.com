module.exports.remove = function (req, res, next) {

    if (confirm("Bạn có chắc chắn muốn xóa?") == true) {
        next()
    } else {
        res.redirect('/');
        return;
    }
}