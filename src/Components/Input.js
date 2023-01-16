import styled from 'styled-components'
import { useField } from 'formik'

// el componente div ocupa el 100% por tanto el siguiente elemento irá a la sigueinte línea
// es como tener un brake
const Control = styled.div`
    margin-bottom: 20px;
`

const Label = styled.label`
    color: black;
    display: block;
    margin-bottom: 5px;
`

const MyInput = styled.input`
    outline: none;
    padding: 8px;
    border: solid 1px #b1b3b5;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 5px;
`

const ErrorMessage = styled.div`
    color: #f00;
`

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <Control>
            <Label>{label}</Label>
            <MyInput {...field} {...props} />
            { 
                meta.touched && meta.error ? (
                    <ErrorMessage>{meta.error}</ErrorMessage>
                ) : null
            }
        </Control>
    )
}

export default Input