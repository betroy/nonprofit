const cloudbase = require("@cloudbase/node-sdk");
const got = require("got");
const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});
const db = app.database();
exports.main = async (event, context) => {
    console.log("event:", event)
    const { userId, task, env } = event
    return await addTaskInfoForPA(userId, task, env)
};

//调平安接口更新任务状态
async function addTaskInfoForPA(userId, task, env) {
    const URL = '0' == env ? 'https://iclient-stg.pingan.com.cn//brcp/ac/emp/wdyx/benefit/addTaskInfo' :
        'https://iclient.pingan.com.cn//brcp/ac/emp/wdyx/benefit/addTaskInfo'
    console.log("userId:", userId)
    console.log("URL:", URL)
    console.log("task", task)
    try {
        let postResponse = await got(URL, {
            method: 'POST', //post请求
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ //把json数据（对象）解析成字符串
                userId: userId,
                taskName: task.taskName,
                taskType: task.taskType,
                finishDate: task.finishDate,
            })
        })

        postResponse = JSON.parse(postResponse.body) //返回数据

        console.log('addTaskInfo success :>>', postResponse)
        if (postResponse && postResponse.responseCode == '0000') {
            return queryTask(userId, task)
        }
        return postResponse
    } catch (error) {
        console.log('addTaskInfo error :>> ', error)
        throw error
    }

}

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

//查询任务
async function queryTask(userId, task) {
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
}