import { COLOR } from '@constants'
import { Modal, ModalFuncProps } from 'antd'

const getCustomeButtonStyle = () => {
  return {
    minWidth: 75,
    borderRadius: 5,
  }
}

const { confirm } = Modal

class SubModal {
  static warning(params: ModalFuncProps) {
    confirm({
      ...params,
      centered: true,
      okButtonProps: {
        style: {
          ...getCustomeButtonStyle(),
          backgroundColor: COLOR,
        },
      },
      cancelButtonProps: {
        style: {
          ...getCustomeButtonStyle(),
        },
      },
      maskClosable: true,
      onOk: () => {
        const { onOk } = params
        return new Promise<void>(async (resolve, reject) => {
          if (onOk) {
            const response = await onOk()
            if (!response) {
              return reject('Error')
            }

            resolve()
          }
        })
      },
    })
  }
}

export default SubModal
