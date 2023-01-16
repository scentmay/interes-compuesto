/* BORRADO EL ARCHIVO DE TEST, DA PROBLEMAS Y NO FUNCIONA LA APP*/
import { useState } from 'react'
import { Formik, Form } from 'formik'
import Input from './Components/Input'
import Button from './Components/Button'
import Container from './Components/Container'
import Section from './Components/Section'
import Balance from './Components/Balance'
import * as Yup from 'yup'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++){
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}


const formatter = new Intl.NumberFormat('en-US', {
  style:'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }



  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          // yup llama a la función object que recibe un objeto de configuración que van a ser las propiedades que tiene que tener mi objeto para que pase la validación
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio depósito inicial').typeError('Debe ser un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            years: Yup.number().required('Obligatorio los años').typeError('Debe ser un número'),
            rate: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(0, 'El valor mínimo es 0')
              .max(1, 'El valor máximo es 1'),
          })}
        >
          <Form>
            <Input name='deposit' label='Depósito inicial' />
            <Input name='contribution' label='Contribución anual' />
            <Input name='years' label='Años' />
            <Input name='rate' label='Interés estimado' />
            <Button type='submit '>Calcular</Button>
          </Form>
        </Formik>
        { balance !== '' ? <Balance>Balance final: {balance}</Balance> : null }
      </Section>
    </Container>
  );
}

export default App;
  