import { AuthInterface } from '@/interfaces/globalInterface';
import { Steps } from 'antd';
import React, { Component } from 'react';
import { match as Match } from 'react-router-dom';
import { compose } from 'redux';

import OpenShopGuard from '../../../../components/higherOrderComponent/OpenShopGuard';
import VerifiedForm from '../component/verifiedForm/verifiedForm';
import VerifiedSuccess from '../component/verifiedSuccess/verifiedSuccess';
import VerifiedTerms from '../component/verifiedTerms/verifiedTerms.Tsx';

import styles from './VerifiedStepPage.module.scss';

interface Props {
  auth: AuthInterface;
  match: Match;
}

interface State {
  stepsValue: number;
}

/**
 * 开店步骤
 */
class VerifiedStepPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepsValue: 0,
    };
  }

  nextStep = () => {
    this.setState({
      stepsValue: Math.min(this.state.stepsValue + 1, 2),
    });
  };

  lastStep = () => {
    this.setState({
      stepsValue: Math.max(this.state.stepsValue - 1, 0),
    });
  };

  render() {
    const { stepsValue } = this.state;
    const { auth } = this.props;
    return (
        <div className={styles['open-shop']}>
          <Steps style={{ width: '80%', margin: '20px auto' }} current={stepsValue}>
            <Steps.Step title='阅读成为作者须知' description='确认自己符合个人作者的相关规定'/>
            <Steps.Step title='申请作者认证' description='需提供认证相关资料，等待审核通过'/>
            <Steps.Step title='提交' description='上传提交相关资料'/>
          </Steps>

          {/*<OpenShopProvision nextStep={this.nextStep} auth={auth}/>*/}
          {/*<OpenShopForm nextStep={this.nextStep} lastStep={this.lastStep}/>*/}
          {stepsValue === 0 ? (
              <VerifiedTerms nextStep={this.nextStep} auth={auth}/>
          ) : stepsValue === 1 ? (
              <VerifiedForm nextStep={this.nextStep} lastStep={this.lastStep}/>
          ) : (
              <VerifiedSuccess/>
          )}
        </div>
    );
  }
}

export default compose(OpenShopGuard)(VerifiedStepPage);
