import Taro from '@tarojs/taro'
// 内核
import cloudbase from "@cloudbase/js-sdk/app";
// 登录模块
import "@cloudbase/js-sdk/auth";
// 云函数模块
import "@cloudbase/js-sdk/functions";
// 云存储模块
import "@cloudbase/js-sdk/storage";
// 数据库模块
import "@cloudbase/js-sdk/database";


Taro.cloud = cloudbase.init({
    env: "nonprofit-8g11k5jj7aa730f7"
})

Taro.cloud
    .auth({
        persistence: "local"
    })
    .anonymousAuthProvider()
    .signIn()
    .then((res) => {
        // 登录成功
        console.log('res :>> ', res);

        const db = Taro.cloud.database()

        // const collection = db.collection("user")
        // collection.where({
        //     _openid: '8cea6dcc3cfd485199daf373c70419c6' // 填入当前用户 openid
        // }).count().then(res => {
        //     console.log(res.total)
        // })

        db.collection("user")
            .count().then(res => {
                console.log(res)
            })

        // db.collection('user').limit(10)
        //     .get()
        //     .then(console.log)
        //     .catch(console.error)
    })
    .catch((err) => {
        // 登录失败
        console.log('err :>> ', err);
    });

// const db = Taro.cloud.database()

// const collection = db.collection("user")
// collection
//     .add({
//         name: "Ben"
//     })
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((e) => {
//         console.log(e)
//     });
