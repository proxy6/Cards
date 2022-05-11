const{Board, Comment} = require('../models/board.model')
const makeValidation = require('@withvoid/make-validation')
const { User } = require('../models/user.model')
const boardControler = {
postBoards: async (req, res, next)=>{
    let data = req.body
    let {post, type} = data
 
    const userId = req.params.userId 
    const result = makeValidation(types => {
    
        return {
          payload: req.body,
          checks: {
            post: { type: types.string, options: { empty: false } },
          }
        }
      })
      if (!result.success) {
        return res.status(400).json({ ...result })
      }

    if(req.file){
        console.log(req.file.filename)
        // req.files["media"].forEach(data=> board.media.push(data.filename))
        data.media = req.file.filename

const board = new Board({
    userId,
    post,
    type,
    media: data.media,
})
const comment = new Comment({
    boardId: board._id
})
board.commentId = comment._id
await comment.save()
await board.save()
.then(async data=>{
    //update user borads array
    await User.updateOne({_id: userId},
        {
            $push: {boards: [data]},
            updated_at: new Date()
        }
        )
    res.json({success: 200, message: "Board Created", data: data})})
.catch(e=>{res.json({success: 500, message: "Error creating board", data: e})})
}
 
},
boardComment: async (req, res, next)=>{
    let {boardId, message} = req.body
    let userId = req.params.userId
    let boardComment = {"userId": userId, "message": message};
   await Comment.findOneAndUpdate({boardId:boardId},
        {
             $push : {
                comment : boardComment  
              }
            }     
        )
    .then(data=>{res.json({success: 200, message: "Board Updated", data: boardComment})})
    .catch(e=>{res.json({success: 500, message: "Error updating board", data: e})}) 
},
getSingleBoard: async (req, res, next)=>{
    let {boardId} = req.body
    await Board.findById(boardId).populate("commentId")
    // await Comment.findById()
    .then(async data=>{
      let views = parseInt(data.views + 1)
      await Board.updateOne({_id: id}, {views: views})
      res.json({success: 200, message: "Board Found", data: data})})
    .catch(e=>{res.json({success: 500, message: "Error fetching board", data: e})})
},
getAllBoards: async(req, res, next)=>{
    User.find().select('fname lname').populate('boards').sort({updated_at: -1})
    .then(data=>{
        // if(data.boards.length > 0){
        res.json({success: 200, message: "Boards Found", data: data})
        // }
        // else{
        //     res.json({success: 200, message: "No New Board"})
        // }
    })
    .catch(e=>{res.json({success: 500, message: "Error fetching board", data: e})})
    // let page = req.query.page
    // page = parseInt(page)
    // let ITEMS_PER_PAGE = +10
    // await Board.aggregate([
    //     {
    //         $skip: ITEMS_PER_PAGE * (page -1)
    //     },
    //     {
    //         $limit: ITEMS_PER_PAGE
    //     },
    //     {
    //         $sort:{
    //             'created_at': -1
    //         }
    //     },
    //     {
    //         $group:{
    //             "_id": '$group_id',
    //             Files:{
    //                 $push: "$$ROOT"
    //             }
    //         }
    //     }
    // ])

    // .then(data=>{res.json({success: 200, message: "Board Found", data: data})})
    // .catch(e=>{res.json({success: 500, message: "Error fetching board", data: e})})
},
deleteBoard: async (req, res, next)=>{
  let {boardId} = req.body
  Board.findByIdAndDelete(boardId)
  .then(board=>{
    
  })  
  .catch(e=> res.status(500).json({success: 0, message: "Error deleting Board", data: e}))
}
}
module.exports = boardControler