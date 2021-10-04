const router = require('express').Router();
const {
    create,
    login,
    deleteAdmin,
    update,
    changePassword,
    getAdminById,
    getAllAdmin
} = require('../controllers/othersAdmin/othersAdmin')

/**
 * Those route use only super Admin
 */

router.route('/others/admin/create')
    .post(create)
    .get(getAllAdmin)
router.route('/others/admin/login')
    .post(login)
router.route('/others/admin/individual/:id')
    .delete(deleteAdmin)
    .get(getAdminById)
    .put(update)

router.route('/others/admin/change/:id')
    .put(changePassword)
module.exports = router;