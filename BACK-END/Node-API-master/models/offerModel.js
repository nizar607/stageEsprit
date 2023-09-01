const mongoose = require('mongoose')

const offerSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true//[true, "Please enter a offer name"]
        },
        company_id: {
            type: Number,
            required: true
            //default: 0
        },
        type: {
            type: [String],
            required: true,
        },
        profile_insights: {
            type: [String],
            required: false,
        },
        job_details: {
            type: [String],
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        about:{
            type: String,
            required:false ,
        },
        min_salary: {
            type: String,
            required: true,
            default:0
        },
        max_salary: {
            type: String,
            required: true,
            default:0
        },
        rating: {
            type: Number,
            required: false,
            default: 0
        },
        location: {
            type: String,
            required: true,
        },
        number_of_people: {
            type: Number,
            required: true,
        },
        profile_image: {
            type: String,
            required: false,
        },
        background_image: {
            type: String,
            required: false,
        },
        schedules: {
            type: [String],
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;