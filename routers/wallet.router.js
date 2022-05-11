const { adminCreateWallet, getUserWallet, getTransactionLogs, postTransactionsDemo, 
    verifyBankAccountPaystack, getBankList,  createTransferReceipientPaystack, withdrawPaystack} = require('../controllers/wallet.controller');
const multer = require("multer")
const path = require("path");
const router = require('express').Router();
const storage = multer.diskStorage({
    destination: './upload/wallet',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
}).single("image");


router.post('/create/:id', upload, adminCreateWallet)
router.get('/get-wallet-details/:id', getUserWallet)
router.get('/get-transaction-log/:id', getTransactionLogs)
router.post('/post-transaction', postTransactionsDemo)
router.post('/banklist', getBankList)
router.post('/verify-acct-paystack', verifyBankAccountPaystack)
router.post('/paystack-transfer-receiver', createTransferReceipientPaystack)
router.post('/paystack-withdraw', withdrawPaystack )

module.exports = router