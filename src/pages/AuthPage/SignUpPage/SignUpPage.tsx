import { AuthSignUpInterface } from '@/interfaces/authInterface';
import { authSendCodeSignUp, authSignUn } from '@/store/action/authAction';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { Button, Checkbox, Col, Form, Icon, Input, Modal, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { History } from 'history';
import React, { Component, FormEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import styles from './SignUpPage.module.scss';

interface Props extends FormComponentProps {
  history: History;
  signUn: (info: AuthSignUpInterface) => void;
  seedCode: (params: string) => void;
}

interface State {
  loading: boolean;
  visible: boolean;
}

/**
 * 注册页面
 */
class SignUpPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  sendCode = () => {
    const phone = this.props.form.getFieldsValue(['phone']);
    this.props.seedCode(phone.phone);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.remember) {
          openNotificationWithIcon('error', '请阅读平台条约！');
          return;
        }
        this.props.signUn(values);
      }
    });
  };

  clause = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      remember: true,
    });
    this.setState({ visible: false });
  };

  handleCancel = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      remember: false,
    });
    this.setState({ visible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, visible } = this.state;
    const layout = {};
    return (
        <Spin {...layout} wrapperClassName={styles['sign-up']} spinning={loading}>
          <h4 className={styles['sign-up-title']}>注册</h4>

          <Form {...layout} onSubmit={this.handleSubmit} className={styles['sign-up-form']}>
            <Form.Item {...layout}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的用户名！' }],
              })(<Input {...layout} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='用户名'/>)}
            </Form.Item>
            <Form.Item {...layout}>
              <Row gutter={8}>
                <Col span={15}>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入你的手机号码！' }],
                  })(<Input {...layout} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='手机号'/>)}
                </Col>
                <Col span={9}>
                  <Button {...layout} htmlType='button' onClick={this.sendCode}>
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...layout}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入你的验证码！' }],
              })(<Input {...layout} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='验证码'/>)}
            </Form.Item>
            <Form.Item {...layout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的用户密码！' }],
              })(<Input {...layout} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} type='password' placeholder='用户密码'/>)}
            </Form.Item>
            <Form.Item {...layout}>
              {getFieldDecorator('remember', {
                rules: [{ required: true, message: '请阅读平台条款！' }],
                valuePropName: 'checked',
                initialValue: false,
              })(
                  <Checkbox>
                    平台
                    <span className={styles['remember']} onClick={this.clause}>
                  条款
                </span>
                  </Checkbox>,
              )}

              <Button {...layout} type='primary' htmlType='submit' className={styles['sign-up-form-button']}>
                注册
              </Button>
              <Link to='/auth/sign-in'>已有账号？</Link>
            </Form.Item>
          </Form>

          <Modal {...layout}
                 visible={visible}
                 title='平台条款'
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
                 footer={[
                   <Button {...layout} htmlType='button' key='back' onClick={this.handleCancel}>
                     取消
                   </Button>,
                   <Button {...layout} htmlType='button' key='submit' type='primary' loading={loading} onClick={this.handleOk}>
                     确认
                   </Button>,
                 ]}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Spin>
    );
  }
}

const SignUpForm = Form.create()(SignUpPage);

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUn: (info: AuthSignUpInterface) => dispatch(authSignUn(info)),
    seedCode: (params: string) => dispatch(authSendCodeSignUp(params)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpForm);
