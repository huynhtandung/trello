import { message } from 'antd'

class Message {
  static info(msg: string){
    message.info(msg)
  }

  static success(msg: string){
    message.success(msg)
  }

  static error(msg: string){
    message.error(msg)
  }

  static warning(msg: string){
    message.warning(msg)
  }
}

export default Message