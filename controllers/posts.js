const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../model/Posts');

const post = {
  async getPost({ req, res }) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPost({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      if (data.content !== undefined) {
        const newPost = await Post.create(
          {
            name: data.name,
            content: data.content,
            tags: data.tags,
            type: data.type
          }
        );
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch(error) {
      handleError(res, error);
    }
  },
  async deletePost({ req, res }) {
    const posts = await Post.deleteMany({});
    handleSuccess(res, posts);
  },
  async deleteOnePost({ req, res }) {
    const id = req.url.split('/').pop();
    await Post.findByIdAndDelete(id);
    handleSuccess(res, null);
  },
  async updatePost({ body, req, res }) {
    try {
      const id = req.url.split('/').pop();
      const data = JSON.parse(body);
      if (data.content !== '') {
        await Post.findByIdAndUpdate(id, data);
        const posts = await Post.find();
        handleSuccess(res, posts);
      } else {
        handleError(res);
      }
    } catch(error) {
      handleError(res, error);
    }
  }
}

module.exports = post;