const yup = require('yup');
const storychema = new yup.ObjectSchema({
    storyid:yup.number().default( '_' + Math.random().toString(36).substr(2, 9)),
    story_name:yup.string().required('Name isrequired'),
    story_image:yup.string()

})
module.exports = storychema;