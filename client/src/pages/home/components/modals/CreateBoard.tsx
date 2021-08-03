import { apiCreateBoard, apiGetTemplates, apiGetUsers } from '@apis'
import CloseIcon from '@assets/icons/close.svg'
import CreateIcon from '@assets/icons/create.svg'
import SelectIcon from '@assets/icons/select.svg'
import { getFirstLetterOfName } from '@common'
import Avatar from '@components/avatar'
import ColorInput from '@components/color-input'
import GridMultiSelect from '@components/grid-multi-select'
import Input from '@components/input'
import LabelInput from '@components/label-input'
import Message from '@components/message'
import Modal from '@components/modal'
import Popover from '@components/popover'
import Select from '@components/select'
import { useAppSelector } from '@stores/index'
import { AddBoardStatus, Template, User } from '@types'
import { Avatar as AvatarAntd } from 'antd'
import { cloneDeep, compact } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import boardImages from '../../../../data/board-images.json'

interface Props {
  openModalCreateBoard: boolean;
  handleCloseModalCreateBoard: () => void;
}

const ModalCreateBoard = (props: Props) => {
  const { openModalCreateBoard, handleCloseModalCreateBoard } = props

  const currentUser = useAppSelector((state) => state.currentUser)

  const [imageSelected, setImageSelected] = useState<number>(-1)
  const [templates, setTemplates] = useState<Template[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [boardName, setBoardName] = useState<string>('')
  const [boards, setBoards] = useState<AddBoardStatus[]>([])
  const [members, setMembers] = useState<string[]>([])

  useEffect(() => {
    if (openModalCreateBoard) {
      const getTemplates = async () => {
        const templates = await apiGetTemplates()
        setTemplates(templates)
      }
      getTemplates()
    }
  }, [openModalCreateBoard])

  useEffect(() => {
    if (openModalCreateBoard) {
      const getUsers = async () => {
        const users = await apiGetUsers()
        setUsers(users)
      }

      getUsers()
    }
  }, [openModalCreateBoard])

  const getBackgroundImageBoard = () => {
    if (imageSelected === -1) {
      return ''
    }

    return boardImages.data.find((el) => el.id === imageSelected)?.image || ''
  }

  const handleChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value)
  }

  const getOptionsTemplate = () => {
    return templates.map((el) => ({
      label: el.name,
      value: el._id,
    }))
  }

  const handleChangeTemplate = (e: string) => {
    const findTemplate = templates.find((el) => el._id === e)
    if (!findTemplate) {
      return setBoards([])
    }

    if (findTemplate.boards.length) {
      setBoards(
        findTemplate.boards.map((el, idx) => ({
          index: idx,
          name: el.name,
          backgroundColor: el.style.backgroundColor,
        }))
      )
    }
  }

  const handleAddBoardStatus = () => {
    setBoards([
      ...boards,
      {
        index: boards.length,
        name: '',
        isEdit: true,
      },
    ])
  }

  const handleChangeStatus = (
    value: string,
    key: 'name' | 'backgroundColor',
    idx: number
  ) => {
    const newBoards = cloneDeep(boards)
    if (!newBoards[idx]) {
      return
    }

    if (!value) {
      newBoards[idx] = null
      setBoards(newBoards)
      return
    }

    newBoards[idx][key] = value
    setBoards(newBoards)
  }

  const getOptionsMembers = () => {
    return users
      .map((el) => ({
        id: el._id,
        name: el.fullName,
      }))
      .filter((el) => el.id !== currentUser._id)
  }

  const onChangeSelectMembers = (ids: string[]) => {
    setMembers(ids)
  }

  const getDataRenderMembers = () => {
    return users.filter((el) => members.includes(el._id))
  }

  const handleCreateBoard = async () => {
    if (!boardName) {
      return
    }

    const createBoardRes = await apiCreateBoard({
      name: boardName,
      image:
        boardImages.data.find((el) => el.id === imageSelected)?.image || '',
      status: compact(boards).map((el) => ({
        index: el.index,
        name: el.name,
        backgroundColor: el.backgroundColor,
      })),
      members,
    })
    if (createBoardRes) {
      Message.success('Create board successfully!')
      setBoardName('')
      setBoards([])
      setMembers([])
      handleCloseModalCreateBoard()
    }
  }

  return (
    <Modal
      visible={openModalCreateBoard}
      isDisabledSubmit={!boardName}
      onOk={handleCreateBoard}
      onCancel={handleCloseModalCreateBoard}
      title="Create Board"
      content={
        <StyledFormCreateBoard>
          <div className="title-wrapper">
            <div
              className="title"
              style={{
                backgroundImage: `url(${getBackgroundImageBoard()})`,
              }}
            >
              <Input
                placeholder="Add board title"
                value={boardName}
                onChange={handleChangeBoardName}
              />
            </div>
            <div className="images">
              {boardImages.data.map((el, index) => (
                <BoardImage
                  key={el.id}
                  id={el.id}
                  image={el.image}
                  selected={el.id === imageSelected}
                  setImageSelected={setImageSelected}
                />
              ))}
            </div>
          </div>
          <div className="board-wrapper">
            <div className="header">
              <div>Board status</div>
            </div>
            <div className="select">
              <Select
                placeholder="Choose template"
                allowClear
                showSearch
                onChange={handleChangeTemplate}
                options={getOptionsTemplate()}
              />
            </div>
          </div>
          <div className="board-content">
            <div>
              {boards.map((el, idx) =>
                el ? (
                  <div key={el.index} className="board-status">
                    <LabelInput
                      value={el.name}
                      isEdit={el.isEdit}
                      style={{
                        backgroundColor: el.backgroundColor,
                        color: el.backgroundColor ? '#fff' : '#000',
                      }}
                      getValue={(value: string) =>
                        handleChangeStatus(value, 'name', idx)
                      }
                    />
                    <ColorInput
                      color={el.backgroundColor}
                      getValue={(value: string) =>
                        handleChangeStatus(value, 'backgroundColor', idx)
                      }
                    />
                    <span onClick={() => handleChangeStatus('', 'name', idx)}>
                      <CloseIcon />
                    </span>
                  </div>
                ) : null
              )}
            </div>
            <div className="add" onClick={handleAddBoardStatus}>
              <CreateIcon />
              <span>Add new board status</span>
            </div>
          </div>
          <div className="board-member-wrapper">
            <div className="header">Board members</div>
            <Popover
              title="Choose members"
              trigger="click"
              placement="topLeft"
              content={
                <GridMultiSelect
                  data={getOptionsMembers()}
                  onChange={onChangeSelectMembers}
                  defaultSelectedIds={members}
                />
              }
            >
              <div className="add-member">
                <CreateIcon />
              </div>
            </Popover>
            <AvatarAntd.Group maxCount={10}>
              {getDataRenderMembers().map((el, idx) => (
                <Avatar key={el._id}>{getFirstLetterOfName(el.fullName)}</Avatar>
              ))}
            </AvatarAntd.Group>
          </div>
        </StyledFormCreateBoard>
      }
    />
  )
}

export default ModalCreateBoard

const BoardImage = (props: {
  id: number;
  image: string;
  selected?: boolean;
  setImageSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { id, image, selected, setImageSelected } = props

  const handleSetImageSelected = () => {
    setImageSelected(id)
  }

  return (
    <StyledBoardImage onClick={handleSetImageSelected}>
      <img src={image} />
      {selected && <SelectIcon />}
    </StyledBoardImage>
  )
}

const StyledFormCreateBoard = styled.div`
  & .title-wrapper {
    display: flex;
    justify-content: space-between;

    & .title {
      flex-grow: 1;
      background-color: rgba(2, 106, 167, 0.75);
      background-size: cover;
      background-position: center center;

      & input {
        background-color: transparent;
        width: 80%;
        margin: 15px;
        color: #fff;
        font-weight: 600;
        font-size: 18px;

        &::placeholder {
          color: #fff;
          font-size: 18px;
        }
      }
    }

    & .images {
      display: flex;
      width: 110px;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }

  & .board-wrapper {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    & .header {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.003em;
    }

    & .select {
      width: 280px;
    }
  }

  & .board-content {
    margin-top: 10px;

    & .add {
      display: flex;
      align-items: center;
      cursor: pointer;

      & svg {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        fill: rgba(2, 106, 167);
      }

      & span {
        color: rgba(2, 106, 167);
        font-weight: 600;
      }
    }

    & .board-status {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      justify-content: space-between;

      & svg {
        width: 12px;
        height: 12px;
        opacity: 0.5;
        cursor: pointer;
      }
    }
  }

  & .board-member-wrapper {
    display: flex;
    align-items: center;
    margin-top: 20px;

    & .header {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.003em;
    }

    & .add-member {
      padding: 5px;
      border: 1px solid rgba(2, 106, 167);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0 10px;

      & svg {
        width: 15px;
        height: 15px;
        fill: rgba(2, 106, 167);
      }
    }
  }
`

const StyledBoardImage = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 3px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
  }

  & svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
  }
`
