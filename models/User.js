import mongoose, { Schema } from 'mongoose'
import pkg from 'validator'

const { isEmail } = pkg

const User = mongoose.model(
    'User',
    new Schema(
        {
            lastname: {
                type: String,
                required: true,
            },
            firstname: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                validate: {
                    validator: (value) => value.length > 3,
                    messages: '',
                },
            },
            email: {
                type: String,
                required: true,
                validate: {
                    validator: isEmail,
                    messages: '',
                },
            },
            password: {
                type: String,
                validate: {
                    validator: (value) => value.length > 6,
                    messages: '',
                },
            },
            phoneNumber: {
                type: String,
                required: true,
                validate: {
                    validator: (value) => value.length > 9,
                    messages: '',
                },
            },
            birthday: {
                type: Date,
            },
            address: {
                type: String,
            },
            gender: {
                type: String,
                enum: ['Male', 'Female'],
            },
            avatar: {
                type: String,
            },
            note: {
                type: String,
            },
            status: {
                type: Number,
                required: true,
            },
        },
        {
            autoCreate: true,
            autoIndex: true,
        }
    )
)

export default User
