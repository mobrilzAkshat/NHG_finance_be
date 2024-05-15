const crypto = require("../common/crypto"); 
const { sendMailToUser } = require("../common/sendMail");
const { execute } = require("../config/queryWrapperMysql");
const { v4: uuidv4 } = require('uuid');


// Now, you can use the imported modules as needed
const decryptedData = crypto.decryptedData;
const encryptedData = crypto.encryptedData;
const generateJwtToken = crypto.generateJwtToken;
const decodeToken = crypto.decodeToken

class userAuthenticationService{
    // register api for creation of new user
    async register(registerData) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = 'SELECT email FROM users WHERE email = ?';
                const isUserExist = await execute(checkUser, [registerData.email]);
                if (isUserExist.length > 0) {
                    return resolve({ "success": false, error: 402, "message": "Try with a different email" });
                } else {
                    const cipherText = await encryptedData(registerData.password)
                    const registerquery = `INSERT INTO users (f_name, l_name, email, 
                        mobile, building, street, city, state, postal_code, country, 
                        password, user_type, is_active)  
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                    const insertResult = await execute(registerquery, [
                        registerData.firstName, registerData.lastName, registerData.email, registerData.mobile, registerData.building,
                        registerData.street, registerData.city, registerData.state, registerData.postalCode, registerData.country,
                        cipherText, registerData.user_type, registerData.is_active, ]);

                    if (insertResult.affectedRows > 0) {
                        return resolve({ "success": true, message: "Data inserted successfully"});
                    } else {
                        return resolve({ "success": false, message: "No rows affected" });
                    }
                }
            } catch (e) {
                console.error("Error occurred while signing up:", e);
                reject({ "success": false, "message": `Error occurred while signup: ${e.message}` });
            }
        });
    }    
    // login Api for users
    async login(userData, type) {
        try {
            console.log(type)
            const checkUser = 'SELECT id, email, password FROM users WHERE email = ?';
            const resultUser = await execute(checkUser, [userData.email]);
            if (resultUser.length > 0) {
                const decryptedPassword = await decryptedData(resultUser[0].password);
                if (decryptedPassword === userData.password) {
                    if(type == 1){
                        const otp = crypto.generateOtp()
                        const query = `update users set otp = ? where email = ?`
                        const updateResult = await execute(query, [otp, resultUser[0].email])
                        if(updateResult.affectedRows>0){
                            await sendMailToUser(resultUser[0].email, otp)
                            return { "success": true, message: "OTP sent to registered mail id", id:resultUser[0].id };
                        }
                    }if(type == 2){
                        return { "success": true, message: "Login Successfull" };
                    }
                } else {
                    return { "success": false, message: "Incorrect username/password" };
                }
            } else {
                return { "success": false, message: "User not found" };
            }
        } catch (e) {
            console.error('Error during login:', e);
            return { "status": 500, "success": false, message: "An error occurred during login" };
        }
    }
// Verify OTP of users
    async verifyOtp(verificationData){
        let query = 'select id, email, otp from users where id = ?'
        let result = await  execute(query, [verificationData.id])
        if(result.length > 0){
            const payload = {
                userId: result[0].id,
                email: result[0].email,
                // Add any other data you want to include in the token payload
              };
              console.log(payload)
            const jwttoken = generateJwtToken(payload);
            if(result[0].otp === verificationData.otp){
                query = `INSERT INTO users_authtoken (user_id, auth_token)VALUES (?, ?);
                        UPDATE users SET is_active = ? where id = ?;`
                result = await execute(query, [result[0].id, jwttoken, 1, result[0].id])
                return {"status":true, "data":{"token":jwttoken, "message":"Login Successfull"}}
            }else{
                return {"success": false, message: "OTP verification failed" };
            }
        }
    }
// resend OTP to users mail id
    async resendOtp(id){
        let query = 'select email from users where id = ?'
        let result = await execute(query, [id])
        if(result.length > 0){
            const otp = crypto.generateOtp()
            query = `update users set otp = ? where id = ?`
            const updateResult = await execute(query, [otp, id])
            if(updateResult.affectedRows>0){
                sendMailToUser(result[0].email, otp)
                return {"success": true, message: "OTP sent to registered mail id" };
            }else{
                return {"success": false, message: "error while sending otp to mail id" };
            }
        }
    }

// update users data
    async updateUser(userUpdateData, id){
        return new Promise((resolve, reject)=>{
            try{
                const updateQuery = "update user set ? where id = ?";
                const result = execute(updateQuery, [userUpdateData, id])
                if(result[0]){
                    return resolve({"status":201,"success":true, message:"user updated successfully"})
                }else{
                    return {"status":400,"success":false, message:"user not found"}
                }
            }catch(e){
                return reject(e)
            }
        })
    }
// api for get all users
    async getUsers(){
        return new Promise(async(resolve, reject)=>{
            const userList = "select * from users"
            const result = await execute(userList, [])
            if(result[0]){
                return resolve({"status":200, "data":result ,"success":true})
            }else{
                return reject({"status":204, "success":false})
            }
        })
    }

// Forgot password for users
    async forgotPassword(id, oldPassword, newPassword){
        return new Promise(async(resolve, reject)=>{
            try{
                let query = 'select password from users where id = ?;';
                let result = await execute(query, [id]);
                if(oldPassword === result[0].password){
                    cipherText = encryptedData(newPassword)
                    query = `update users set password = ? where id = ?`;
                    result = execute(updateQuery, [cipherText, id])
                    if(result[0]){
                        return resolve({"status":201,"success":true, message:"user updated successfully"})
                    }else{
                        return {"status":400,"success":false, message:"user not found"}
                    }
                }else{
                    return {"status":400,"success":false, message:"Please enter the correct password"}
                }
            }catch(e){
                return reject(e)
            }
        })
    }
// delete users from users table
    async remove(id){
        return new Promise( async(resolve, reject)=>{
            const deletesQuery = "DELETE FROM users WHERE id = ?"
            const result = await execute(deletesQuery, [id])
            if(result[0]){
                return resolve({"status":200,"success":true, "message":"user deleted successfully"})
            }else{
                return reject({"status":204, "success":false, "message":"No such user found"})
            }

        })
    }
// Logout api for users
    async logout(token){
        return new Promise( async(resolve, reject)=>{
            if (!token) {
                return response.status(401).json({ success: false, message: "Token is missing" });
            }else{
                const userId = decodeToken(token, "##$$ecomm$$##")
                const deletesQuery = `DELETE FROM account_tokens WHERE user_id = ?;`
                const result = await execute(deletesQuery, [userId])
                if(result.affectedRows == 1){
                    return resolve({"success":true, "message":"user deleted successfully"})
                }else{
                    return reject({"success":false, "message":"No such user found"})
                }
            }
        })
    }
}

module.exports = new userAuthenticationService()