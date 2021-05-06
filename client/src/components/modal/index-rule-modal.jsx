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

                    <Text className='h1'>活动说明</Text>
                    <Text className='text'>1）活动期间，凡成功完成“旧衣捐赠”、“变废为宝”、“环保沙龙”任意一项任务，并根据提示将活动海报转发分享至好友的用户，可获得公益勋章、公益证书及公益抽奖资格，公益抽奖奖品如下：</Text>
                    <Text className='text'>一等奖1名，奖品为平安银行“美丽乡村 平安启橙”乡村旅游名额1个</Text>
                    <Text className='text'>二等奖3名，奖品为助农产品酸奶1箱</Text>
                    <Text className='text'>三等奖6名，奖品为助农产品芒果干3袋</Text>
                    <Text className='text'>2）符合参与条件同一用户在整个活动期间仅有1次领奖机会，奖品由平安银行提供，奖品品牌、内容、规格以实际发放为准</Text>
                    <Text className='text'>您可以进入环保沙龙列表，选择离您最近的一家平安银行线下网点，报名线下环保沙龙并完成现场签到，视为完成本任务</Text>

                    <View className='margin-40' />
                    <Text className='h1'>奖品发放</Text>
                    <Text className='text'>中奖名单将在活动结束后公布在活动页中，届时平安银行95511客户服务热线将在7个工作日内与获奖用户联系，确认收件人、邮寄地址等相关信息，以上信息仅用于本次活动发放奖品使用</Text>

                    <View className='margin-40' />
                    <Text className='h1'>图书捐赠</Text>
                    <Text className='text'>每10名用户完成公益勋章解锁，平安银行将配捐1本图书至“希望工程幕天同阅”项目，捐赠图书上限为1200本，由“广州市幕天青少年教育发展服务中心“提供执行效果及捐赠反馈</Text>

                    <View className='margin-40' />
                    <Text className='h1'>其他说明</Text>
                    <Text className='text'>平安银行有权在法律允许的范围内对活动规则进行解释、变更和调整，变更及调整将公布在活动页上</Text>

                    <View className='margin-40' />
                    <Text className='text'>如有任何疑问，您可以拨打全国统一客服电话95511联系</Text>
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
