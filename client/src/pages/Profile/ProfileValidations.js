import validator from 'react-validation';

const required = (value) => {
    if(!value.toString().trim().length) {
        return 'Field is required';
    }
}