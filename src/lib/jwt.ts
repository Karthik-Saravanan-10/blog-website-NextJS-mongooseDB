import jwt from 'jsonwebtoken'

export function signToken(payload: object, option = {}) {
    const secret = process.env.JWT_KEY
    const token: string = jwt.sign(payload, secret as string, option)
    return token
}

export function verifyjwtToken(token: string) {
    try {
        const secret = process.env.JWT_KEY
        const payload = jwt.verify(token, secret as string)
        return payload
    } catch (error) {
        console.log(error);
        return null
    }
}