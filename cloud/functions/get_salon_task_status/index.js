const got = require("got");

exports.main = async (event, context) => {
    //return getResponse.body
    const { userId, env } = event
    const URL = '0' == env ? 'https://iclient-stg.pingan.com.cn/brcp/ac/emp/wdyx/benefit/getSalonTaskStatus' :
        'https://iclient.pingan.com.cn/brcp/ac/emp/wdyx/benefit/getSalonTaskStatus'
    console.log("userId:", userId)
    console.log("URL:", URL)
    let postResponse = await got(URL, {
        method: 'POST', //post请求
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ //把json数据（对象）解析成字符串
            userId: userId,
        })
    })

    return JSON.parse(postResponse.body) //返回数据
};