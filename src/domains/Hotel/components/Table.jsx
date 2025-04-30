import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addFormData } from "../slice/formDataSlice"
import { getHotels, getHotel, deleteHotel } from '../services/hotel'

const Table = () => {
    const [ hotels, setHotels ] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const hotels = await getHotels({ method: 'GET'});
            setHotels(hotels)
        })()
       
    }, [])

    const handleEdit = async (id) => { 
       const hotel = await getHotel(id, { method: 'GET'})
       dispatch(addFormData(hotel)) 
    }

    const handleDelete = async (id) => {
        deleteHotel(id, { method: 'DELETE'})
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