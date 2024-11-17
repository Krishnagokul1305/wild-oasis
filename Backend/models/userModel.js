const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "User must have a full name"],
        },
        email: {
            type: String,
            required: [true, "User must have an email"],
            unique: true,
        },
        password: {
            type: String,
            select: false,
            validate: {
                validator: function (val) {
                    // Ensure password is present only for employees
                    return this.role === "employee" ? !!val : true;
                },
                message: "Password is required for employees",
            },
        },
        nationalId: {
            type: String,
        },
        country: {
            type: String,
        },
        confirmPassword: {
            type: String,
            validate: {
                validator: function (val) {
                    // Validate confirmPassword only for employees
                    return this.role === "employee" ? this.password === val : true;
                },
                message: "Passwords do not match",
            },
        },
        role: {
            type: String,
            enum: ["user", "employee"],
            default: "user",
        },
        avatar: String,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordExpireTime: Date,
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to encrypt the password (only for employees)
userSchema.pre("save", async function (next) {
    // Skip middleware if the user is not an employee
    if (this.role !== "employee") {
        this.password = undefined;
        this.confirmPassword = undefined;
        return next();
    }

    // If the password hasn't been modified, proceed to the next middleware
    if (!this.isModified("password")) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);

    // Set confirmPassword to undefined to not store it in the database
    this.confirmPassword = undefined;

    // If the document is not new and the password has been modified, set passwordChangedAt
    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }

    next();
});

// Method to compare the user input password and the user db password
userSchema.methods.isValidPassword = async function (inpPassword, dbPassword) {
    return await bcrypt.compare(inpPassword, dbPassword);
};

// Method to check if the user changed the password after the token was issued
userSchema.methods.hasChangedPassword = function (tokenInitiatedTime) {
    if (!this.passwordChangedAt) return false;
    return new Date(this.passwordChangedAt).getTime() > tokenInitiatedTime * 1000;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
