import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addRoomData } from '../slice/roomDataSlice'
import { deleteHotelRoom, getHotelRoom, getHotelRooms } from '../Services/hotelRoom'
import Toast from '../../../shared/components/Toast'

const Table = () => {
    const [ hotelRooms, setHotelsRooms ] = useState({})
    const [ deleted, setDeleted ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
           const hotelRooms = await getHotelRooms({ method: 'GET' })
           setHotelsRooms(hotelRooms)
        })()
    }, [])

    const handleEdit = async (id) => {
       const hotelRoom = await getHotelRoom(id, { method: 'GET'})
       dispatch(addRoomData(hotelRoom))
    }

    const handleDelete = async (id) => {
        const message = await deleteHotelRoom(id, { method: 'DELETE'})

        if (message === 'success') {
            setDeleted(true)
        }
    }

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Habitación</th>
                        <th>Acomodación</th>
                        <th># de Habitaciones</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {hotelRooms.length === 0 && 
                    <tr>
                        <td colSpan="6">No se encontraron datos</td>
                    </tr>}
                    {hotelRooms.length > 0 && hotelRooms.map((room) => {
                        return (
                            <tr key={room.id}>
                                <td>{room.hotel.name}</td>
                                <td>{room.room_accomodation.room.name}</td>
                                <td>{room.room_accomodation.accomodation.name}</td>
                                <td>{room.number_rooms}</td>
                                <td><i className="bi bi-pencil" onClick={() => handleEdit(room.id)}></i></td>
                                <td><i className="bi bi-trash3" onClick={() => handleDelete(room.id)}></i></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {deleted && <Toast message="Eliminacion exitosa" />}
        </>
    )
}

export default Table