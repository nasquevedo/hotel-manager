import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addFormData } from "../slice/formDataSlice"

const Table = () => {
    const [ hotels, setHotels ] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/api/v1/hotels')

            if (response.ok) {
                const result = await response.json()
                setHotels(result.hotels)
            }
        })()
    }, [])

    const handleEdit = async (id) => {
        const response = await fetch(`http://localhost:8000/api/v1/hotels/${id}`)

        if (response.ok) {
            const result = await response.json()

            dispatch(addFormData(result.hotel))
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8000/api/v1/hotels/delete/${id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            const result = await response.json()

            console.log(result)
        }
    }

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Dirección</th>
                    <th>Nit</th>
                    <th># de habitaciones</th>
                    <th>Fecha de Creación</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {hotels.length === 0 && <tr><td colSpan="8">No se encontraron datos</td></tr>}
                {hotels.length > 0 && hotels.map((hotel) => {
                    return (<tr key={hotel.id}>
                        <td>{hotel.name}</td>
                        <td>{hotel.city.name}</td>
                        <td>{hotel.address}</td>
                        <td>{hotel.nit}</td>
                        <td>{hotel.number_rooms}</td>
                        <td>{hotel.created_at}</td>
                        <td><i className="bi bi-pencil" onClick={() => handleEdit(hotel.id)}></i></td>
                        <td><i className="bi bi-trash3" onClick={() => handleDelete(hotel.id)}></i></td>
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

export default Table