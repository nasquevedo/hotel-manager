import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addRoomData } from '../slice/roomDataSlice'

const Table = () => {
    const [ hotelRooms, setHotelsRooms ] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:8000/api/v1/hotel/rooms")

            if (response.ok) {
                const result = await response.json()

                setHotelsRooms(result.hotel_rooms)
            }
        })()
    }, [])

    const handleEdit = async (id) => {
        const response = await fetch(`http://localhost:8000/api/v1/hotel/rooms/${id}`)

        if (response.ok) {
            const result = await response.json()

            dispatch(addRoomData(result.hotel_room[0]))
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8000/api/v1/hotel/rooms/delete/${id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            const result = await response.json()

            console.log(result)
        }
    }

    return (
        <table className="table">
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
    )
}

export default Table