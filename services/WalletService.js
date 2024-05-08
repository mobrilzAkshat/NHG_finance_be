const { execute } = require("../config/queryWrapperMysql")

class WalletService {
    async getWalletDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = "SELECT * FROM wallet WHERE user_id = ?";
                const result = await execute(query, [id]);
                if (result.length > 0) {
                    resolve({ "success": true, "data": result[0], "message": "Wallet details found successfully" });
                } else {
                    reject({ "success": false, "message": "No balance exists for this user" });
                }
            } catch (error) {
                reject({"success":false, "message":`Error Occured while fetching details of Wallet: ${error.message}`});
            }
        });
    }
}

module.exports = new WalletService()