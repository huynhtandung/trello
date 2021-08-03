export interface User {
	_id: string
	email: string
	password: string
	fullName: string
}

export interface RegisterRequest {
	email: string
	password: string
	fullName: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	access_token: string
	user: User
}