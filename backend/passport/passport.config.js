import passport from "passport"
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

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
                    return done(null, false, { message: "Incorrect username" });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, user);
            } catch (err){
                return done(err);
            }
        })
    )
}