// import { applyRealNameApi } from '../../../../../../services/authService';
// import { uploadFiles } from '../../../../../../services/registrationWorkService';
import * as config from '@/config/fileTypeConfig';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { Button, Form, Icon, Input, Upload } from 'antd';
import { FormComponentProps } from 'antd/es/form';
// import idcard from 'idcard';
import React, { Component, FormEvent } from 'react';

import styles from './verifiedForm.module.scss';

interface Props extends FormComponentProps {
  nextStep: () => void;
  lastStep: () => void;
}

interface State {
  loadingFront: boolean;
  loadingBack: boolean;
  loadingCard: boolean;
  frontImageUrl: string;
  backImageUrl: string;
  cardImageUrl: string;
}

/**
 * 实名表单
 */
class VerifiedForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loadingFront: false,
      loadingBack: false,
      loadingCard: false,
      frontImageUrl: '',
      backImageUrl: '',
      cardImageUrl: '',
    };
  }

  imageSize = 200;

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { form, nextStep } = this.props;
    const { frontImageUrl, backImageUrl, cardImageUrl } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        values.holding_card = cardImageUrl;
        values.idcard_front = frontImageUrl;
        values.idcard_back = backImageUrl;
        // applyRealNameApi(values).then(response => {
        //   if (response.status_code === 200) {
        //     nextStep();
        //   }
        // });
      }
    });
  };

  beforeUpload = (file: File) => {
    const isJPG = config['PICTURE'].key.includes(file.type);
    if (!isJPG) {
      openNotificationWithIcon('error', '上传失败', '您上传的图片格式不正确，只能上传png，jpg！');
    }
    const isLt2M = file.size / 1024 < this.imageSize;
    if (!isLt2M) {
      openNotificationWithIcon('error', '上传失败', `图像必须小于${this.imageSize}kb!`);
    }
    return isJPG && isLt2M;
  };

  uploadFrontPicture = (e: any) => {
    this.setState({ loadingFront: true });
    const data = new FormData();
    data.append('file', e.file);
    // uploadFiles(data, 'picture').then(res => {
    //   if (res.status_code === 200) {
    //     this.setState({
    //       frontImageUrl: res.message,
    //       loadingFront: false
    //     });
    //   }
    // });
  };

  uploadBackPicture = (e: any) => {
    this.setState({ loadingBack: true });
    const data = new FormData();
    data.append('file', e.file);
    // uploadFiles(data, 'picture').then(res => {
    //   if (res.status_code === 200) {
    //     this.setState({
    //       backImageUrl: res.message,
    //       loadingBack: false
    //     });
    //   }
    // });
  };

  uploadCardPicture = (e: any) => {
    this.setState({ loadingBack: true });
    const data = new FormData();
    data.append('file', e.file);
    // uploadFiles(data, 'picture').then(res => {
    //   if (res.status_code === 200) {
    //     this.setState({
    //       cardImageUrl: res.message,
    //       loadingCard: false
    //     });
    //   }
    // });
  };

  checkIdcard = (rule: any, value: any, callback: any) => {
    // if (idcard.verify(value)) {
    //   callback();
    // } else {
    //   callback('身份证验证失败');
    // }
  };

  render() {
    const { frontImageUrl, backImageUrl, loadingBack, loadingFront, loadingCard, cardImageUrl } = this.state;
    const { form, lastStep } = this.props;
    const formItemLayout = {
      labelCol: { span: 6, offset: 3 },
      wrapperCol: { span: 6 },
    };
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label='真实姓名'>
            {form.getFieldDecorator('real_name', {
              rules: [{ required: true, message: '请填写真实姓名' }],
            })(<Input placeholder='请填写真实姓名'/>)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='身份证号'>
            {form.getFieldDecorator('idcard_no', {
              rules: [{ required: true, message: '请填写身份证号' }, { validator: this.checkIdcard, message: '请填写正确的身份证号' }],
            })(<Input placeholder='请填写身份证号'/>)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='上传身份证正面'>
            {form.getFieldDecorator('idcard_front', {
              rules: [{ required: true, message: '请上传身份证正面！' }],
            })(
                <Upload accept='image/*' name='upload-front' showUploadList={false} customRequest={this.uploadFrontPicture}
                        beforeUpload={this.beforeUpload}>
                  {frontImageUrl ? (
                      <img src={frontImageUrl} alt='avatar' width='300'/>
                  ) : (
                      <div className={styles['avatar-uploader']}>
                        <Icon type={loadingFront ? 'loading' : 'plus'}/>
                        <div className='ant-upload-text'>+身份证正面</div>
                      </div>
                  )}
                </Upload>,
            )}
            <span>支持格式：jpeg，png，文件大小{this.imageSize}kb</span>
          </Form.Item>

          <Form.Item {...formItemLayout} label='传身份证背面'>
            {form.getFieldDecorator('idcard_back', {
              rules: [{ required: true, message: '请上传身份证背面！' }],
            })(
                <Upload accept='image/*' name='upload-back' showUploadList={false} customRequest={this.uploadBackPicture}
                        beforeUpload={this.beforeUpload}>
                  {backImageUrl ? (
                      <img src={backImageUrl} alt='avatar' width='300'/>
                  ) : (
                      <div className={styles['avatar-uploader']}>
                        <Icon type={loadingBack ? 'loading' : 'plus'}/>
                        <div className='ant-upload-text'>+身份证背面</div>
                      </div>
                  )}
                </Upload>,
            )}
            <span>支持格式：jpeg，png，文件大小{this.imageSize}kb</span>
          </Form.Item>

          <Form.Item {...formItemLayout} label='上传免冠正面照'>
            {form.getFieldDecorator('holding_card', {
              rules: [{ required: true, message: '请上传免冠正面照！' }],
            })(
                <Upload accept='image/*' name='upload-card' showUploadList={false} customRequest={this.uploadCardPicture}
                        beforeUpload={this.beforeUpload}>
                  {cardImageUrl ? (
                      <img src={cardImageUrl} alt='avatar' width='300'/>
                  ) : (
                      <div className={styles['avatar-uploader']}>
                        <Icon type={loadingCard ? 'loading' : 'plus'}/>
                        <div className='ant-upload-text'>+免冠正面照</div>
                      </div>
                  )}
                  <span>支持格式：jpeg，png，文件大小{this.imageSize}kb</span>
                </Upload>,
            )}
          </Form.Item>

          <Form.Item className={styles['operation']} wrapperCol={{ span: 12, offset: 6 }}>
            <Button htmlType='button' onClick={lastStep}>
              取消
            </Button>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

export default Form.create()(VerifiedForm);
