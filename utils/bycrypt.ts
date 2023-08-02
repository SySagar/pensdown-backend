import { compare, hash } from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string)

export const hashPassword = async (plainPassword:string) => {
	const hashedPassword =  await hash(plainPassword, saltRounds)
	return hashedPassword
}

export const comparePasswords = async (plainPassword: string | Buffer, hashedPassword: string) => {
	return await compare(plainPassword, hashedPassword)
}