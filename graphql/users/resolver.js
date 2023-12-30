const User = require("../../models/userSchema");

const resolvers = {
    Query: {
        async user(_,{ID}) {
            return await User.findById(ID, { password: 0, emailVerified: 0, refreshToken: 0 });
        },
        async getUsers(_,{amount}) {
            return await User.find({},{password: 0, emailVerified: 0, refreshToken: 0}).limit(amount ?? undefined).sort({createdAt: -1});
        }
    },
}

module.exports = resolvers;