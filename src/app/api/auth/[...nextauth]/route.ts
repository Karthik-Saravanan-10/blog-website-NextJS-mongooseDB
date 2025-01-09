import User from '@/models/User'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/jwt'
import db from '@/lib/db'


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: "karthik" },
                password: { label: 'password', type: 'text' }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as Record<"email" | "password", string>
                await db.connect()
                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error('Invalid User')
                }

                const comparePass = await bcrypt.compare(password, user.password)

                if (!comparePass) {
                    throw new Error("Invalid Password")
                } else {
                    const { password, ...currentUser } = user._doc;
                    const accessToken = signToken(currentUser, { expiresIn: '1M' })
                    return { ...currentUser, accessToken }
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token._id = user._id
            }
            // console.log(token,"token")
            return token
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.accessToken = token.accessToken
            }
            // console.log(session,"session")
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }