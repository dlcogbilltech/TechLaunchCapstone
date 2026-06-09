const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minlength: [8, 'Password must be at least 8 characters!'],
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            unique: true,
            validate: {
                validator: val => /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/.test(val),
                message: "Please enter a valid email",
            }
        },
        firstName: {
            type: String,
            minlength: [3, 'First name must be at least 3 characters!'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters!'],
        },
    },
    {
        timestamps: true
    }
);

UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword;
    })
    .set(function(value) {
        this._confirmPassword = value;
    });

UserSchema.pre('validate', function() {
    console.log('PRE VALIDATE', this.password, this._confirmPassword);
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
});

UserSchema.pre('save', async function() {
    console.log('PRE SAVE', this.password);
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.post('save', function(error, doc, next) {
    console.log('POST SAVE ERROR', error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return next(new Error('There was a duplicate key error'));
    }
    next(error);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;