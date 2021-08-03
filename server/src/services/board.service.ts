import { Board, IBoard, IBoardParams, ICreateBoard, IUser, IBoardPopulate } from '@models'

export const getBoardById = async (_id: string): Promise<IBoard> => {
  const board = await Board.findOne({
    _id,
    isDeleted: false
  })
  return board
}

export const getBoardByName = async (name: string): Promise<IBoard> => {
  const board = await Board.findOne({
    name,
    isDeleted: false
  })
  return board
}

export const createBoard = async (payload: ICreateBoard): Promise<IBoard> => {
  const { name, image, status, members, createdBy } = payload
  const board = new Board({
    name,
    image,
    status,
    members,
    createdBy,
  })
  await board.save()
  return board
}

export const getBoards = async (
  params: IBoardParams,
  currentUser: IUser
): Promise<IBoard[]> => {
  const { page, limit } = params
  const boards = await Board.find({
    isDeleted: false,
    $or: [
      {
        createdBy: currentUser._id,
      },
      {
        members: currentUser._id,
      },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(+limit)
    .skip((+page || 0) * +limit)
    .populate('createdBy')
  return boards
}

export const deleteBoardById = async (_id: string): Promise<boolean> => {
  const board = await Board.updateOne(
    { _id },
    {
      $set: {
        isDeleted: true,
      },
    }
  )

  return board.ok === 1
}

export const getBoardByIdAndPopulate = async (_id: string, path: string[]): Promise<IBoard> => {
  const board = await Board.findOne({
    _id,
    isDeleted: false
  }).populate(path.join(' '))
  return board
}