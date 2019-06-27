import { AuthLoginInterface } from '@/interfaces/authInterface';
import { AuthInterface, ReducersFull } from '@/interfaces/globalInterface';
import { authSignIn } from '@/store/action/authAction';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { Button, Checkbox, Form, Icon, Input, Spin } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import styles from './SignInPage.module.scss';

interface Props extends FormComponentProps {
  auth: AuthInterface;
  signIn: (info: AuthLoginInterface) => void;
}

/**
 * 登陆页面
 */
class SignInPage extends Component<Props> {
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        openNotificationWithIcon('error', '错误', '请填写正确的选项！');
        return;
      }
      this.props.signIn({
        password: values.password,
        username: values.username,
      });
    });
  };

  render() {
    const { form, auth } = this.props;
    const layout = {};
    return (
        <Spin {...layout} wrapperClassName={styles['login-in']} spinning={auth.isLoading}>
          <h4 className={styles['login-title']}>登录</h4>
          <Form {...layout} onSubmit={this.handleSubmit} className={styles['login-form']}>
            <Form.Item {...layout}>
              {form.getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的手机号！' }],
              })(<Input {...layout} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='手机号'/>)}
            </Form.Item>
            <Form.Item {...layout}>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的用户密码！' }],
              })(<Input {...layout} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>} type='password' placeholder='用户密码'/>)}
            </Form.Item>
            <Form.Item {...layout}>
              {form.getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <Link className={styles['login-form-forgot']} to='/auth/forgot-password'>
                找回密码
              </Link>
              <Button {...layout} type='primary' htmlType='submit' className={styles['login-form-button']}>
                登录
              </Button>
              <Link to='/auth/sign-up'>立刻注册</Link>
            </Form.Item>
          </Form>
        </Spin>
    );
  }
}

const SignInForm = Form.create()(SignInPage);

const mapStateToProps = (state: ReducersFull) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signIn: (info: AuthLoginInterface) => dispatch(authSignIn(info)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInForm);
