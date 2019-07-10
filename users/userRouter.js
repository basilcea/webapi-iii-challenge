const express = require("express");
const User = require("./userDb");
const Posts = require("../posts/postDb");
const validate = require("../index");
const router = express.Router();

const status = (res, data, status) => {
  return res.status(status).json(data);
};

router.post("/", validate.validateUser, async (req, res) => {
  const { name } = req.body;
  try {
    const data = await User.insert({ name });
    status(res, data, 201);
  } catch (err) {
    status(res, "Cannot create user", 500);
  }
});

router.post(
  "/:id/posts",
  validate.validateUserId,
  validate.validatePost,
  async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    try {
      const data = await Posts.insert({ text, user_id: id });
      status(res, data, 201);
    } catch (err) {
      status(res, "Cannot get user posts", 500);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const data = await User.get();
    status(res, data, 200);
  } catch (err) {
    status(res, "Cannot get users", 500);
  }
});

router.get("/:id", validate.validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.getById(id);
    status(res, data, 200);
  } catch (err) {
    status(res, "Cannot get user", 500);
  }
});

router.get("/:id/posts", validate.validateUserId , async(req, res) => {
    const {id} = req.params;
    try{
        const data = await Post.getUserPosts(id);
        status(res , data, 200)
    }
    catch(err){
        status(res, 'Cannot retrieve posts', 500)
    }
});

router.delete("/:id", validate.validateUserId , async(req, res) => {
    const {id} = req.params;
    try{
        await Users.remove(id);
        status(res, 'Deleted Successfully',200)
    }
    catch(err){
        status(res , 'Cannot delete user', 500)
    }

});

router.put("/:id", validate.validateUserId , validate.validateUser, async(req, res) => {
    const {id} = req.params;
    const {name} = req.body
    try{
         await User.update(id , {name} )
        const  data = await User.getById(id)
        status(res , data , 201)
    }catch(err){
        status(res , 'Cannot Update User' , 500)
    }
});

//custom middleware

module.exports = router;
