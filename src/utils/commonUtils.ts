import { notification } from 'antd';

/**
 * 名字转换颜色值
 * @param name 需要转换的名字
 */
export function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

/**
 * 转换颜色的对比色
 * @param hex 需要转换的颜色
 */
export function hexToRgb(hex: string) {
  hex = avatarColor(hex);
  const rgb: string[] = [];

  hex = hex.substr(1); // 去除前缀 # 号

  if (hex.length === 3) {
    // 处理 "#abc" 成 "#aabbcc"
    hex = hex.replace(/(.)/g, '$1$1');
  }

  hex.replace(/../g, (color: string): string => {
    rgb.push(String(255 - parseInt(color, 0x10))); // 按16进制将字符串转换为数字
    return color;
  });

  return 'rgb(' + rgb.join(',') + ')';
}

/**
 * 生成唯一key
 * @param len key的长度
 * @param radix key的位数
 */
export function creatUuid(len = 0, radix = 62) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 36);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

type notification = 'error' | 'success' | 'info' | 'warn' | 'warning';

/**
 * 全局的消息提示
 * @param type 消息提示的类型
 * @param message 消息提示的标题
 * @param description 消息提示的详细内容
 */
export function openNotificationWithIcon(type: notification, message: string, description = '') {
  notification[type]({
    message,
    description,
  });
}
