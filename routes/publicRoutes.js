const Express = require("express");
const publicRoute = Express.Router()
const userController = require("../controllers/AuthenticationController");

publicRoute.get("/api/user", userController.getUsers);
publicRoute.post("/api/login/:type", userController.loginUser);
publicRoute.put("/api/verify-otp", userController.verifyOtp);
publicRoute.get('/api/resend-otp/:id', userController.resendOtp);
publicRoute.post("/api/register", userController.signupNewUser);
publicRoute.patch("/api/updateuser/:id", userController.updateExistingUser);
publicRoute.put("/api/forgot/:id", userController.forgotPassword);
publicRoute.delete('/api/logout',userController.logout);

module.exports = publicRoute