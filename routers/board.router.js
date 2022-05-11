const router = require('express').Router();
const { postBoards, boardComment, getSingleBoard, getAllBoards, deleteBoard } = require("../controllers/board.controller");
const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/boards',
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
}).single("media");
const upload_multiple = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|webpmp4|WEBPmp4|mpeg-4|MPEG-4|MP4|mp4|mkv|MKV)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
  }).fields([
    {
      name: 'media',
      maxCount: 5
    },
  ]);
 
router.post('/post/:userId', upload, postBoards)
// router.get('/comment', getBoardComments)
router.post('/comment/:userId', boardComment)
router.post('/getSingle/:userId', getSingleBoard)
router.get('/all', getAllBoards)
router.delete('/delete', deleteBoard)
  module.exports = router