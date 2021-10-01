
const router = require('express').Router()
const {
    createAdmin,
    getAdminById,
    deleteAdminById,
    editAdminById,
    loginAdminById,
    changePasswordByAdminId
} = require('../controllers/admin/admin')


router.route('/admin/:id')
    .get(getAdminById)
    .put(editAdminById)
    .delete(deleteAdminById)


router.route('/admin')
    .post(createAdmin)

router.route('/admin/login/')
    .post(loginAdminById)

router.route('/admin/change/password/:id')
    .put(changePasswordByAdminId)


module.exports = router