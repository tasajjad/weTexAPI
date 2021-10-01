const router = require('express').Router()

const {
    signUp,
    login,
    getAllUsers,
    getUserById,
    deleteUserById,
    editUserById,
    changePasswordById
} = require('../controllers/users/user')


router.route('/user/signup')
    .post(signUp)
router.route('/user/login')
    .post(login)
router.route('/users/all')
    .get(getAllUsers)

router.route('/user/individual/:id')
    .get(getUserById)
    .delete(deleteUserById)
    .put(editUserById)
router.route('/user/change/password/:id')
    .put(changePasswordById)

module.exports = router