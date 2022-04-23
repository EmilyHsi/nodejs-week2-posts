const HttpControllers = require('../controllers/http');
const PostControllers = require('../controllers/posts')
const routes = async (req, res) => {
  const { url, method } = req;
  console.log(method, url);
  let body = '';
  req.on('data', chunk =>  {
    body += chunk;
  })
  if (url == '/posts' && method == 'GET') {
    PostControllers.getPost({ req, res });
  } else if (url == '/posts' && method == 'POST') {
    req.on('end', () => PostControllers.createdPost({ body, req, res }));
  } else if (url.startsWith('/posts/') && method == 'DELETE') {
    PostControllers.deleteOnePost({ req, res });
  } else if (url == '/posts' && method == 'DELETE') {
    PostControllers.deletePost({ req, res });
  } else if (url.startsWith('/posts/') && method == 'PATCH') {
    req.on('end', () => PostControllers.updatePost({ body, req, res })); 
  } else if(method == 'OPTIONS'){
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
}

module.exports = routes;