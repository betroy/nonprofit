/**
 *  通用弹窗
 * 
 *  2020-02-13
*/

import { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types';

import './index-rule-modal.scss'

class IndexRuleModal extends Component {

    //-------------------------------------
    //#region [ui] 
    //-------------------------------------
    render() {
        const { onCloseClick } = this.props
        return (
            <View className='index-rule-mask'>
                <ScrollView
                    className='index-rule-content-wrapper'
                    scrollY
                >
                    <Text className='title'>活动规则</Text>
                    <View className='margin-30' />
                    <Text className='h1'>活动名称</Text>
                    <Text className='text'>环保低碳创益营</Text>

                    <View className='margin-40' />

                    <Text className='h1'>活动时间</Text>
                    <Text className='text'>2021年5月10日-2021年6月30日</Text>

                    <View className='margin-40' />

                    <Text className='h1'>活动任务</Text>
                    <Text className='h1'>1.旧物捐赠</Text>
                    <Text className='text'>您可以选择以下3种方式参与：飞蚂蚁小程序线上旧衣回收/书籍回收预约、社区或学校等线下场所旧衣回收箱投递、参与平安银行环保沙龙进行现场捐赠；完成旧物捐赠后需在任务页上传证明图片视为完成本任务，证明图片可为飞蚂蚁旧衣回收完成截图、线下社区、学校、网点捐赠现场照片</Text>
                    <Text className='h1'>2.变废为宝</Text>
                    <Text className='text'>您可以利用家中旧物参照活动页的旧物改造教程，或发挥想象力完成一次旧物改造，并将变废为宝的成果拍照上传至活动页视为完成本任务</Text>
                    <Text className='h1'>3.环保沙龙</Text>
                    <Text className='text'>您可以进入环保沙龙列表，选择离您最近的一家平安银行线下网点，报名线下环保沙龙并完成现场签到，视为完成本任务</Text>

                    <View className='margin-40' />
                    <Text className='h1'>活动权益</Text>
                    <Text className='text'>1.公益勋章及公益证书：完成旧衣捐赠、变废为宝、线下环保沙龙中任意任务视为完成本次“环保低碳创益营”公益主题活动，可解锁“环保小卫士”公益勋章并获得公益证书，您可以在公益账户首页查看</Text>
                    <Text className='text'>
                        2.公益配捐：每10名用户完成公益勋章解锁，平安银行将配捐1本图书至“希望工程·幕天同阅”项目，并由“广州市幕天青少年教育发展服务中心“提供执行效果及捐赠反馈
                        </Text>
                    <Text className='text'>
                        3.公益抽奖：用户解锁公益勋章后分享本次活动，可获得公益抽奖资格：
                        </Text>
                    <Text className='text'>
                        一等奖1名，奖品为平安银行“美丽乡村 平安启橙”乡村游学名额，
                        </Text>
                    <Text className='text'>
                        二等奖3名，奖品为助农产品酸奶1箱，
                        </Text>
                    <Text className='text'>
                        三等奖6名，奖品为助农产品芒果干3袋，
                        </Text>
                    <Text className='text'>
                        奖品由平安银行提供，奖品品牌、内容、规格以实际发放为准
                        </Text>

                    <View className='margin-40' />
                    <Text className='h1'>其他说明</Text>
                    <Text className='text'>
                        平安银行有权在法律允许的范围内对活动规则进行解释、变更和调整，变更及调整将公布在活动页上。
                        </Text>
                </ScrollView>
                <Image className='image-title' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/index/ic_index_rule_modal_head.png' />
                <Image className='image-close' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/common/ic_close.png' onClick={() => { onCloseClick() }} />
            </View>
        )
    }
    //#endregion
}

IndexRuleModal.defaultProps = {
}

IndexRuleModal.propTypes = {
    onCloseClick: PropTypes.func.isRequired, //关闭弹窗事件
}

export { IndexRuleModal }
