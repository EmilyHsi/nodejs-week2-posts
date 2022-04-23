const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  tags: [
    {
      type: String,
      required: [true, '貼文標籤 tags 未填寫']
    }
  ],
  type: {
    type: String,
    enum:['group', 'person'],
    required: [true, '貼文類型 type 未填寫']
  },
  image: {
    type: String,
    default: ""
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫'],
  },
  likes: {
    type: Number,
    default: 0
  },
  comments:{
    type: Number,
    default: 0
  },
});
// Model 是在做處理資料和資料傳輸
const posts = mongoose.model(
  'posts',
  postsSchema
); //collection + Schema(守門員) = model

module.exports = posts;