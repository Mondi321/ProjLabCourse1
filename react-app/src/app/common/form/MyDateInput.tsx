import { useField } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {

    const [ field, meta, helpers ] = useField(props.name!);

    return (
        <Form.Group className='mb-1 mt-4'>
            <DatePicker  
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
                className='form-control'
            />
            {meta.touched && meta.error ? (
                <Form.Text style ={{color: 'red'}}>
                    {meta.error}
                </Form.Text>
            ): null}
        </Form.Group>
  )
}
