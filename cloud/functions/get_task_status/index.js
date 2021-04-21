const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});
const db = app.database();
exports.main = async (event, context) => {
    const { userId } = event
    console.log("userId:", userId)
    try {
        const res = await db
            .collection("user")
            .where({
                userId: userId
            })
            .get()
        return res
    } catch (error) {
        console.log('get_task_status error :>> ', error)
        throw error
    }
};