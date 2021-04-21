const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});
const db = app.database();
exports.main = async (event, context) => {
    console.log("event:", event)
    const { userId, task } = event
    //先查询当前任务是否已经存在
    try {
        const userRes = await db
            .collection("user")
            .where({
                userId: userId
            })
            .get()
        console.log('query_user_info success===>', userRes)

        if (userRes.data.length > 0) {
            return await updateTask(userId, task)
        } else {
            return await addTask(userId, task)
        }
    } catch (error) {
        console.log('query_user_info error :>> ', error)
        throw error
    }
};

//更新任务
async function updateTask(userId, task) {
    try {
        const command = db.command
        const res = await db
            .collection("user")
            .where({
                userId: userId
            })
            .update({
                taskList: command.push(task)
            })
        console.log('updateTask success===>', res)
        return res
    } catch (error) {
        console.log('updateTask error :>> ', error)
        throw error
    }
}

//增加任务
async function addTask(userId, task) {
    try {
        const res = await db
            .collection("user")
            .add({
                userId: userId,
                taskList: [task]
            })
        console.log('addTask success===>', res)
        return res
    } catch (error) {
        console.log('addTask error :>> ', error)
        throw error
    }
}