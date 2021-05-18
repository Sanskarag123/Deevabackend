const yup = require('yup');
const brandchema = new yup.ObjectSchema({
    brandid:yup.number().default( '_' + Math.random().toString(36).substr(2, 9)),
    brand_name:yup.string().required('Name isrequired'),
    brand_image:yup.string()

})
module.exports = brandchema;