import passport from "passport"
import User from "../models/user.model";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcrypt";

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log('Serializing user')
        done(null, user._id)
    });

    passport.deserializeUser( async (id, done) => {
        console.log('Deserializing user')
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (err) {
            done(err);
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error("Invalid username or password");
                }
                const validPassword = await bcrypt.compare(password, user.password);

                if (!validPassword) {
                    throw new Error("Invalid username or password");
                }
                return done(null, user);
            } catch (err){
                return done(err);
            }
        })
    )
}