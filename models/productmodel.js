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
    seller:yup.array().min(1).optional()

})
module.exports = productschema;
