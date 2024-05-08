const { execute } = require("../config/queryWrapperMysql")

class BlogPostService{
    async getAllPost(){
        try {
            const query = 'select * from post;'
            const result = await execute(query,[]);
            if(result.length>0){
                return {"success":true, "data":result, "message":"Fetching successfull"}
            }else{
                return {"success":false, "message":"Error while finding the Posts"}
            }
        } catch (error) {
            throw(error)
        }
    }

    async getPostById(id, category){
    try{
        const query = 'SELECT * FROM post where id = ? and category_id = ?';
        const result = await execute(query, [id, category]);
        if(result.length > 0){
            return {"success":true, "data":result, "message":"Fetching successfull"}
        }else{
            return {"success":false, "message":"Error while finding the Posts"}
        }
    } catch (error) {
        throw(error)
    }
    }

    async createPost(postData){
        const query = 'INSERT INTO post (title, content, category_id) VALUES(?, ?, ?)'
        const result = await execute(query, [postData.title, postData.content, postData.category])
        if(result.affectedRows > 0){
            return {"success":true, "data":result, "message":"Fetching successfull"}
        }else{
            return {"success":false, "message":"Error while finding the Posts"}
        }
    }

    async createCategory(categoryData){
        try{
            const query = 'INSERT INTO post (name) VALUES(?)'
            const result = await execute(query, [categoryData.name])
            if(result.affectedRows > 0){
                return {"success":true, "data":result, "message":"Fetching successfull"}
            }else{
                return {"success":false, "message":"Error while finding the Posts"}
            }
        }catch (error){
            throw(error)
        }

    }

    async updatePost(postData, id){
        try{
            const query = 'UPDATE post SET ? where id = ?'
            const result = await execute(query, [postData, id])
            if(result.affectedRows > 0){
                return {"success":true, "data":result, "message":"blog Updated Successfully"}
            }else{
                return {"success":false, "message":"Error while finding the Posts"}
            }
        }catch (error){
            throw(error)
        }
    }

    async deletePost(id){
        try{
            const query = 'delete from post where id = ?'
            const result = await execute(query, [id])
            if(result.length > 0){
                return {"success":true, "data":result, "message":"Fetching successfull"}
            }else{
                return {"success":false, "message":"Error while finding the Posts"}
            }
        }catch (error){
            throw(error)
        }
    }
}

module.exports = new BlogPostService()