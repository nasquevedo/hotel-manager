import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addFormDataByValue, addFormData, addErrors, clearErrors } from "../slice/formDataSlice"
import ErrorField from "../../../shared/components/ErrorField"
import { validator } from "../services/validator"
import Success from "../../../shared/components/Success"

const initialState = {
    id: "",
    name: "",
    address: "",
    city_id: "",
    nit: "",
    number_rooms: ""
}


const Form = () => {
    const [ cities, setCities ] = useState({})
    const [ succeed, setSucceed ] = useState(false)
    const formData = useSelector((state) => state.formData.data)
    const errors = useSelector((state) => state.formData.errors)
    const dispatch = useDispatch()

    const title = formData.id !== '' ? 'Editar' : 'Crear'

    useEffect(() => {
        (async() => {
            const response = await fetch('http://localhost:8000/api/v1/cities')
            if (response.ok) {
                const result = await response.json()

                setCities(result.cities)
            }
        })()
    }, [])


    const handleChange = (event) => {
        const  { name , value } = event.target

        dispatch(addFormDataByValue({name, value}))
        dispatch(clearErrors())
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { isValid, errors } = validator(formData)

        if (!isValid) {
            dispatch(addErrors(errors))
            return
        }

        const url = formData.id !== '' ? `http://localhost:8000/api/v1/hotels/update/${formData.id}`: 'http://localhost:8000/api/v1/hotels/create'
        const method = formData.id !== '' ? 'PUT' :  'POST'

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            const result = await response.json()

            if (result.message === 'success') {
                setSucceed(true)
            }
        }
    }

    const handleClear = () => {
        dispatch(addFormData(initialState))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h6 className="display-6">{title} Hotel</h6>
            {succeed && <Success message="Exito!"/>}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input 
                    className="form-control" 
                    id="name" 
                    type="text" 
                    name="name" 
                    placeholder="Hotel Decameron" 
                    onChange={handleChange} 
                    value={formData.name} 
                />
                {errors.name && <ErrorField message={errors.name} />}
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">Ciudad</label>
                <select id="city" className="form-control" name="city_id" onChange={handleChange} value={formData.city_id}>
                    <option>-- Seleccione una ciudad --</option>
                    {cities.length > 0 && cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)}
                </select>
                {errors.city && <ErrorField message={errors.city} />}
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input 
                    id="address" 
                    className="form-control" 
                    type="text" 
                    name="address" 
                    placeholder="Calle 1 # 1 - 1" 
                    onChange={handleChange} 
                    value={formData.address} 
                />
                {errors.address && <ErrorField message={errors.address} />}
            </div>
            <div className="mb-3">
                <label htmlFor="nit" className="form-label">Nit</label>
                <input 
                    id="nit" 
                    className="form-control" 
                    type="text" 
                    name="nit" 
                    onChange={handleChange} 
                    placeholder="12345678-9" 
                    value={formData.nit}
                />
                {errors.nit && <ErrorField message={errors.nit} />}
            </div>
            <div className="mb-3">
                <label htmlFor="number-rooms" className="form-label">Número de habitaciones</label>
                <input 
                    id="number-rooms" 
                    className="form-control" 
                    type="number" 
                    name="number_rooms" 
                    placeholder="20" 
                    onChange={handleChange} 
                    value={formData.number_rooms}
                />
                {errors.number_rooms && <ErrorField message={errors.number_rooms} />}
            </div>
            <button type="submit">{title}</button>
            <button type="button" onClick={() => handleClear()}>Limpiar</button>
        </form>
    )
}

export default Form