const yup = require('yup');
const productschema = new yup.ObjectSchema({
    productId:yup.number().default( '_' + Math.random().toString(36).substr(2, 9)),
    name:yup.string().required('Name isrequired'),
    type:yup.string(),
    price:yup.number().min(0).default(0),
    manufactureAddress:yup.string(),
    imageUrls:yup.array().of(yup.string().default(" ")),
    length:yup.number().min(0).default(0),
    width:yup.number().min(0).default(0),
    quantityLeft:yup.number().min(0).default(0),
    clothmaterial:yup.string().default('Cotton'),
    seller:yup.array().min(1).optional(),
    categoryid:yup.string().required().default(1),
    discountprice:yup.number().required().default(0),
    brandid:yup.string().required().default(1),
    comment:yup.array().default([{username:"Ankush",description:"Vergy good quality"}]),
    comment_count:yup.string().required().default(0),
    maincolor:yup.array().required().default([]),
    wardrobeid:yup.string().required().default("shfjdf")
})
module.exports = productschema;
