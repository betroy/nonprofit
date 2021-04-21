const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});
const db = app.database();
exports.main = async (event, context) => {
    const { userId, task } = event
    console.log("userId:", userId)
    console.log("task:", task)

    //先查询当前任务是否已经存在
    const res = await db
        .collection("user")
        .where({
            userId: userId
        })
        .get()
    if (res.data.lenth() > 0) {
    }
    return res
};