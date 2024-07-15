import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authorizedEmails = ["jimenezjordan.pro@gmail.com", "aitmahamedmassi@gmail.com"]

function isAuthorizedUser(email) {
  return authorizedEmails.includes(email)
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("User object:", user)
      console.log("Account object:", account)
      console.log("Profile object:", profile)

      const email = user?.email || profile?.email
      console.log("Email being checked:", email)

      if (email) {
        if (isAuthorizedUser(email)) {
          console.log(`User ${email} is authorized.`)
          return true 
        } else {
          console.log(`User ${email} is not authorized.`)
          return false 
        }
      } else {
        console.log('No email found in user or profile objects.')
        return false 
      }
    },
  },
})