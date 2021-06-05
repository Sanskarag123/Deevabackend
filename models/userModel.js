//model  File 
const yup = require('yup');
userModel = new yup.ObjectSchema({
    name:yup.string(),
    phonenumber:yup.number().required("Phone Number is Required"),
    password:yup.string(),
    email:yup.string(),
    addresses:yup.array(),
    // addresses:yup.array().of({
    //     addressline1:yup.string().required('Address line 1 is required'),
    //     addressline2:yup.string(),
    //     city:yup.string().required('City is required'),
    //     state:yup.string().required('State is required'),
    //     pincode:yup.number().required('Pincode is reuired')
    // }).optional(),
defaulAddressIndex:yup.number().default(1),
referralCode:yup.string().required().default('name'),
orderhistory:yup.array().default([]),
cart:yup.array().default([]),
description:yup.string().default("")


})
module.exports = userModel;
// console.log(userModel.isValid({name:'Sanskar',phonenumber:'1234567891',password:'123'}).then((res)=>{
//     console.log(res);
// }));