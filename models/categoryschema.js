const yup = require('yup');
const categorychema = new yup.ObjectSchema({
    categoryid:yup.number().default( '_' + Math.random().toString(36).substr(2, 9)),
    category_name:yup.string().required('Name isrequired'),
    category_image:yup.string()

})
module.exports = categorychema;