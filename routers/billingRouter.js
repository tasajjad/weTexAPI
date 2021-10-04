const router = require('express').Router();
const {
    addBilling,
    getBillingByUserId,
    deleteBillingById,
    updateBillingId
} = require('../controllers/billings/billingAddress');

router.route('/billing/create')
    .post(addBilling)
router.route('/billing/individual/:id')
    .get(getBillingByUserId)
    .delete(deleteBillingById)
    .put(updateBillingId)
module.exports = router;