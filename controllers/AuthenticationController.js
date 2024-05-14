const userService  = require('../services/AuthenticationService')

class UserAuthenticationController{
    async getUsers(request, response, next){
        try{
            const result = await userService.getUsers()
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
            console.log(e);
            next();
        }
    }

    async signupNewUser(request, response, next){
        try{
            const registerData = request.body;
            const result = await userService.register(registerData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
            } catch (e) {
              // Handle unexpected errors
              console.error(e);
              return response.status(500).json({ success: false, error: 500, message: "Internal server error" });
            }
        }catch (e){
           return e
    }

    async loginUser(request,response, next){
        try {
            const loginData = request.body;
            const result = await userService.login(loginData, request.params.type)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async verifyOtp(request, response, next){
        try{
            const result = await userService.verifyOtp(request.body)
            return result.success ? response.status(200).json(result):response.status(400).json(result)
        }catch (error){
            console.log(error)
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally{
            next()
        }
    }

    async resendOtp(request, response, next){
        try{
            const result = await userService.resendOtp(request.params.id)
            return result.success ? response.status(200).json(result):response.status(400).json(result)
        }catch (error){
            console.log(error)
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally{
            next()
        }
    }

    async updateExistingUser(request, response, next){
        try {
            const updateData = request.body;
            const result = await userService.updateUser(updateData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async deletePartner(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.remove(userid)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async forgotPassword(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.forgotPassword(userid, newPassword)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
           return response.status(500).json({ success: false, error: e, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async logout(request, response, next) {
        try {
            const token = request.headers.authorization;
            const result = await userService.logout(token);
            return result.success ? response.status(200).json(result) : response.status(203).json(result);
        } catch (e) {
            return response.status(500).json({ success: false, error: e });
        } finally {
            next(); 
        }
    }    
}

module.exports = new UserAuthenticationController()

