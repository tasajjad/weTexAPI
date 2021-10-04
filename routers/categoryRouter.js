const router = require('express').Router();

// Main Category
router.route('/category/main')
    .post()
    .get()
    .delete()

router.route('/category/main/individual/:id')
    .get()
    .delete()
// Sub Category

module.exports = router