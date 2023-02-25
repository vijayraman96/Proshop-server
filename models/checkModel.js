import mongoose from 'mongoose';

const checkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const checkMongo = mongoose.model('Check', checkSchema);

export default checkMongo