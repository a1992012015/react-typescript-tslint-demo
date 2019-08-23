import { AuthInterface } from '@/interfaces/globalInterface';
import { Button, Modal } from 'antd';
import React, { Component } from 'react';

import styles from './verifiedTerms.module.scss';

interface Props {
  auth: AuthInterface;
  nextStep: () => void;
}

/**
 * 开店条款
 */
export default class VerifiedTerms extends Component<Props> {
  openFailModal = () => {
    const { auth } = this.props;
    Modal.confirm({
      title: '您上一次的实名认证失败',
      content: `失败原因：${auth.userInfo.real_name_validate.audit_msg}`,
      cancelText: '关闭',
      okText: '确定',
    });
  };

  render() {
    const { auth } = this.props;
    return (
        <div>
          <div className={styles['provisions']}>
            <h4>1、我在天府-TV已经开了个店了，我用别人的身份证再开一个店可以吗？</h4>
            <p>
              答：不可以。未经天府-TV平台同意，将本人天府-TV账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。
            </p>
            <h4>2、我可以把店铺转租给其他人吗?</h4>
            <p>
              答：不可以。未经天府-TV平台同意，将本人天府-TV账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。
            </p>
            <h4>3、我可以开多个天府-TV店吗?</h4>
            <p>
              答：不可以。一张身份证（一张营业执照）只能开一个天府-TV店铺。开店后请保持营业执照存续状态，不得注销；如若发现营业执照被注销、吊销，天府-TV将会对店铺做出永久关闭的处置。
            </p>
            <h4>4、我已经开过天府-TV店，现在想要注销原来的店铺重新开店，可以吗?</h4>
            <p>答：不可以，天府-TV暂时不提供注销店铺的服务。用户一但成功开店就无法再用身份证（营业执照）另开一家天府-TV店铺。</p>
          </div>

          <div className={styles['operation']}>
            <Button htmlType='button' onClick={this.props.nextStep} type='primary'>
              下一步
            </Button>
            {auth.userInfo.real_name_validate && auth.userInfo.real_name_validate.status === 2 && (
                <span className={styles['link']} onClick={this.openFailModal}>
              查看审核失败信息
            </span>
            )}
          </div>
        </div>
    );
  }
}
