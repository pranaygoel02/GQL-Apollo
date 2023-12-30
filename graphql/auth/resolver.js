const User = require("../../models/userSchema");
const {generateAccessToken, validateAccessToken} = require("../../middleware/accessToken");
const validatePassword = require("../../middleware/password");

const resolvers = {
    Query: {
        async getAccount(_ , _$args, context) {
            if(!context?.user) throw new Error("No user provided")
            const requestingID = context?.user['$id'];
            if(!requestingID) throw new Error("No user ID provided")
            const account = await User.findById(requestingID, { refreshToken: 0 });
            return {
                ...account._doc,
                id: account._id
            };
        },
    },
    Mutation: {
        async createUser(_,{input: {name, email, password, isSeller, isAdmin, isPrimeMember, emailVerified}}) {
            const existingUser = User.findOne({email});
            if (existingUser) throw new Error("User already exists");
            const user = new User({name, email, password, isSeller, isAdmin, isPrimeMember, emailVerified});
            await user.save();
            return {
                id: user._id,
                ...user._doc
            };
        },
        async deleteUser(_,$args, context) {
            if(!context?.user) throw new Error("No user provided")
            const requestingID = context?.user['$id'];
            const deletedUser = await User.findByIdAndDelete(requestingID);
            return deletedUser;
        },
        async loginUser(_,{email, password}) {
            const user = await User.findOne({email});
            if (!user) throw new Error("User does not exist");
            const validPassword = await validatePassword(password, user.password);
            if (!validPassword) throw new Error("Invalid password");
            const accessToken = await generateAccessToken({email, password, $id: user._id, type: 'ACCESS'});
            const refreshToken = await generateAccessToken({email, password, $id: user._id, type: 'REFRESH'});
            await User.updateOne({_id: user._id}, {$set: {refreshToken}});
            return {
                accessToken,
                refreshToken
            };
        },
        async refreshToken(_,$args, context) {
            if(!context?.user) throw new Error("No user provided")
            const user = context?.user;
            const userRefreshTokenInDB = await User.find({_id: user['$id'], refreshToken: user.token});
            if (userRefreshTokenInDB?.length === 0) throw new Error("Invalid refresh token");
            const accessToken = await generateAccessToken({email: user.email, password: user.password, $id: user['$id'], type: 'ACCESS'});
            return {
                accessToken
            };
        },
        async logoutUser(_, $args, context) {
            try {
                if(!context?.user) throw new Error("No user provided")
                const requestingID = context?.user['$id'];
                await User.updateOne({_id: requestingID},{$set:{refreshToken: null}});
                return true
            }
            catch (err) {
                return false
            }
        }
    }
}

module.exports = resolvers;