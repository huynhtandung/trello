import { SALT } from '@constants'
import { hash, compare } from 'bcrypt'

export const hashPassword = async (rawPass: string): Promise<string> => {
	const hashPass = await hash(rawPass, SALT)
	return hashPass
}

export const comparePassword = async (rawPass: string, hashPass: string): Promise<boolean> => {
	const isValidPass = await compare(rawPass, hashPass)
	return isValidPass
}
