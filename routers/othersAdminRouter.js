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
module.exports = router;