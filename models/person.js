const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const collectionName = 'personCollection';

const personSchema = new Schema(
    {
        name: {
            type: String, 
            required: 'Please enter a name'
            },

        ipAddress: {
            type: String,
            required: 'Please enter an IP Address'
            },

        x: {
            type: Number,
            required: 'Please enter a value for x'
            }, 

        y: {
            type: Number,
            required: 'Please enter a value for y'
            },

        Date:{
            type: Date,
            default: Date.now
            },

        wsAddress: {
            type: Number,
            min: 1000,
            unique: true,
        }
    }, 
    {
        versionKey: false 
    })

personSchema.plugin(autoIncrement, {inc_field: 'wsAddress', start_seq: 1000});

module.exports = mongoose.model('person', personSchema, collectionName);
