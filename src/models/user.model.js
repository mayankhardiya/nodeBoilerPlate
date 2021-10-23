const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const {Schema} = mongoose;

const userSchema = new Schema(
    {
        userId: { type: String, unique: true, required: true },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        contactNumber: { type: String, required: true, unique: true },
        address: { type: String },
        active: { type: Boolean, default: false },
        password: { type: String, required: true },
        
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },

        emailToken: { type: String, default: null },
        emailTokenExpires: { type: Date, default: null },

        referralCode: { type: String, unique: true },
        referrer: { type: String, default: null },

        accessToken: { type: String, default: null },

    },
    {
      timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
    }
);

const User = mongoose.model("user", userSchema);
module.exports = User;


module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error("Comparison failed", error);
    }
};