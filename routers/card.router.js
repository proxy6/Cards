const router = require('express').Router();
const { createCard, getUserCards, getSingleCard, updateSingleCard, deleteSingleCard,
    getShareQRCode, getCards, addIndustry, getIndustry, searchIndustry, getCreateCardPage, saveCard, searchCards,
    getUserSavedCards, createStoredCard, getAllStoredCards, getStoredCardDetails, UpdateStoredCard, deleteStoredCard,
    
} = require('../controllers/card.controller');
const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/cards',
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
}).single("logo");

const upload_multiple = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
  }).fields([
    {
      name: 'logo',
      maxCount: 1
    },
    {
      name: 'coverPic',
      maxCount: 1
    }
  ]);
  

router.get('/create', getCreateCardPage)
router.post('/create/:id', upload_multiple, createCard)
router.post('/single/', getSingleCard)
router.get('/all/:id', getUserCards)
router.get('/update/:id', getSingleCard)
router.put('/update/:id', upload_multiple, updateSingleCard)
router.delete('/delete/:id', deleteSingleCard)
router.post('/share/:id', getShareQRCode)
router.get('/all-cards', getCards)
router.post('/add-industry', addIndustry)
router.get('/get-industry', getIndustry)
router.get('/search-industry', searchIndustry)
router.post('/save-card/:userId', saveCard)
router.get('/search', searchCards)
router.get('/saved/:userId', getUserSavedCards)
router.post('/saved/details/:userId', getSingleCard)
router.post('/stored/:userId', upload_multiple, createStoredCard)
router.get('/stored/:userId', getAllStoredCards)
router.post('/stored/details/:userId', getStoredCardDetails)
router.post('/stored/update/:userId', getStoredCardDetails)
router.put('/stored/update/:userId', upload_multiple, UpdateStoredCard)
router.delete('/stored/delete', deleteStoredCard)
module.exports = router

