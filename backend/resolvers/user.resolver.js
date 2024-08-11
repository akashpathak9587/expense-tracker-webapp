import { users } from "../dummyData/data.js"

const userResolver = {
    Query: {
        users: (_, _, {req, res}) => {
            return users
        },
        authUser: () => {
            return users[0]
        },
        user: (_, { userId }) => {
            return users.find(user => user._id === userId)
        }
    }
}

export default userResolver