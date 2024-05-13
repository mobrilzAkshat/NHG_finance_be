const BlogPostService = require("../services/BlogPostService")


class BlogPostController{
    async getAllPosts(request, response, next){
        try {const token = request.headers.authorization;
            if(token){
            const blogsData = await BlogPostService.getAllPost()
            return blogsData.success ? response.status(200).json(blogsData):response.status(203).json(result)
            }else{
                return response.status(400).json({result, "message":"token does not exist"})
            }
        } catch (error) {
            throw(error)
        }finally{
            next()
        }
    }

    async createPost(request, response, next) {
        try {
            const token = request.headers.authorization;
            if(token){
                const result = await BlogPostService.createPost(token);
                return result.success ? response.status(201).json(result) : response.status(400).json(result);
            }else{
                return response.status(400).json({result, "message":"token does not exist"})
            }
        } catch (e) {
            return response.status(500).json({ success: false, error: e });
        } finally {
            next(); 
        }
    }    
}

module.exports = new BlogPostController()