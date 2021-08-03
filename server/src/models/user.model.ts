import { generateUUID } from '@utils'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
	_id: {
		type: String,
		require: true,
    default: () => generateUUID()
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	fullName: {
		type: String,
		require: true
	},
})

export const User = model<IUser>('users', UserSchema)

export interface IUser {
	_id: string
	email: string
	password: string
	fullName: string
}

export interface ICreateUser {
	email: string
	password: string
	fullName: string
}

export interface IUserLogin {
	email: string
	password: string
}

