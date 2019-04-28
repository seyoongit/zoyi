import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    TextField,
    Input,
} from "@material-ui/core";

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
    return (
        <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom} />
    )
}

class CreateForm extends Component {
    required = value => value || typeof value === 'number' 
        ? undefined
        : 'Required'
    number = value => value && isNaN(Number(value)) 
        ? 'Must be a number' 
        : undefined
    numbersSplitedBySpace = value => value && value.split(/ +/).some(part => isNaN(part)) 
        ? "Must be a numbers splited by white space" 
        : undefined
    pass = () => undefined

    render() {
        const { schema, handleSubmit, pristine, submitting } = this.props;
        const textFields = Object.keys(schema).map(col => (
            <Field  
            name={col}
            label={col} 
            key={col}
            component={renderTextField}
            validate={[
                this.required,
                schema[col] === "number" ? this.number : this.pass,
                schema[col] === "array" ? this.numbersSplitedBySpace : this.pass
            ]}
            fullWidth
            placeholder={schema[col]==="array" ? "이 필드는 Array 타입입니다. 두개 이상의 입력값들은 띄어쓰기로 구분하세요." : col} />
        ))
        
        return (
            <form onSubmit={handleSubmit}>
                {textFields}
                <Input type="submit" fullWidth disabled={pristine||submitting} />
            </form>
        );
    }
}

export default reduxForm({
    form: 'createData',
})(CreateForm);

