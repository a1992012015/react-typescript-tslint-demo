import { AuthForgotPassword } from '@/interfaces/authInterface';
import { authForgot, authSendCodeForgot } from '@/store/action/authAction';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { Button, Col, Form, Icon, Input, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import styles from './ForgotPasswordPage.module.scss';

interface Props extends FormComponentProps {
  sendCode: (phone: string) => void;
  forgotPassword: (body: AuthForgotPassword) => void;
}

interface State {
  loading: boolean;
}

/**
 * 找回密码
 */
class ForgotPasswordPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  sendCode = () => {
    const phone = this.props.form.getFieldsValue(['phone']);
    if (!phone) {
      openNotificationWithIcon('error', '手机号不能为空', '您必须输入一个正确得手机号！');
      return;
    }
    this.props.sendCode(phone.phone);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // this.setState({ loading: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.forgotPassword({
          phone: values.phone,
          code: values.code,
          new_password: values.new_password,
          is_forget: true,
        });
        // forgotPasswordApi(values).then(({ status_code }) => {
        //   if (status_code === 200) {
        //     this.setState({ loading: false });
        //     this.props.history.push('/Auth/SignIn');
        //     openNotificationWithIcon('success', '密码重置成功', '您的密码已经重置完成，请重新登录！');
        //   } else {
        //     this.setState({ loading: false });
        //     let errorMessage = '';
        //     if (status_code === 10601) {
        //       errorMessage = '手机号已注册';
        //     } else {
        //       errorMessage = checkErrorCode(status_code);
        //     }
        //     openNotificationWithIcon('error', '密码重置失败！', errorMessage);
        //   }
        // });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('new_password')) {
      callback('Two different passwords!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
        <Spin wrapperClassName={styles['forgot-password']} spinning={loading}>
          <h4 className={styles['forgot-password-title']}>找回密码</h4>

          <Form onSubmit={this.handleSubmit} className={styles['forgot-password-form']}>
            <Form.Item>
              <Row gutter={8}>
                <Col span={15}>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入你的手机号码！' }],
                  })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='手机号'/>)}
                </Col>
                <Col span={9}>
                  <Button htmlType='button' onClick={this.sendCode}>
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入你的验证码！' }],
              })(<Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='验证码'/>)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('new_password', {
                rules: [{ required: true, message: '请输入你的用户密码！' }],
              })(<Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} type='password' placeholder='用户密码'/>)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: '请确认输入你的用户密码！' },
                  {
                    validator: this.handleConfirmPassword,
                    message: '两次输入得密码必须一致！',
                  },
                ],
              })(<Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} type='password' placeholder='确认密码'/>)}
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className={styles['forgot-password-form-button']}>
                找回密码
              </Button>
              <Link to='/auth/sign-in'>返回登录</Link>
            </Form.Item>
          </Form>
        </Spin>
    );
  }
}

const ForgotPasswordForm = Form.create()(ForgotPasswordPage);
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    forgotPassword: (info: AuthForgotPassword) => dispatch(authForgot(info)),
    sendCode: (params: string) => dispatch(authSendCodeForgot(params)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPasswordForm);
