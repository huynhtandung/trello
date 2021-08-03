import { cloneDeep, isArray } from 'lodash'

export const getFirstLetterOfName = (name: string) => {
  return name.charAt(0)
}

export const removeQueueSocket = (data: any, key: string) => {
  if(!isArray(data)){
    return data
  }

  const newData = cloneDeep(data).filter(el => el.key !== key)
  return newData
}