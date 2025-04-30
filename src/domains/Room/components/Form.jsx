import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRoomDataByValue, addRoomDataAccomodation } from '../slice/roomDataSlice'
import Success from '../../../shared/components/Success'
import Warning from '../../../shared/components/Warning'
import { getHotels } from '../../Hotel/services/hotel'
import { getRooms } from '../Services/room'
import { getAccomodations } from '../Services/accomodation'
import { createHotelRoom } from '../Services/hotelRoom'

const Form = () => {
    const [ hotels, setHotels ] = useState({})
    const [ rooms, setRooms ] = useState({})
    const [ succeed, setSucceed ] = useState(false)
    const [ accomodations, setAccomodations ] = useState({})
    const [ warning, setWatrning ] = useState(false)
    const [ warningMessage, setWarningMessage ] = useState('')
    const roomData = useSelector((state) => state.roomData.data)
    const dispatch = useDispatch()

    const title = roomData.id !== '' ? 'Editar' : 'Crear'

    useEffect(() => {
        /**const getHotels = async() => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/hotels')

                if (response.ok) {
                    const result = await response.json()

                    setHotels(result.hotels)
                }
            } catch(e) {
                console.log(e)
            }
        }*/
        (async () => {
            const hotels = await getHotels({ method: 'GET'})
            setHotels(hotels)

            const rooms = await getRooms({ method: 'GET'})
            setRooms(rooms)
        })()
        
        /*const getRooms = async() => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/rooms')

                if (response.ok) {
                    const result = await response.json()

                    setRooms(result.rooms)
                }
            } catch(e) {
                console.log(e)
            }
        }*/

        //getHotels()
        //getRooms()
    }, [])

    const { room_id } = roomData.room_accomodation;

    useEffect(() => {
        //const getAccomodations = async (room_id) => {
            /*try {
                const response = await fetch(`http://localhost:8000/api/v1/accomodations/${room_id}`)

                if (response.ok) {
                    const result = await response.json()
        
                    setAccomodations(result.accomodations)
                }
            } catch(e) {
                console.log(e)
            }*/
            // return 
           
        //}

        if (room_id !== '') {
            (async (room_id) => {
                const accomodations = await getAccomodations(room_id)
                setAccomodations(accomodations)
            })(room_id)
        }
    }, [room_id])

    const handleChange = async (event) => {
        const { name, value } = event.target
        if (name === 'room_id') {
            dispatch(addRoomDataAccomodation({ name, value }))
            return 
        }

        dispatch(addRoomDataByValue({ name, value}))
        return
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = roomData.id !== '' ? `http://localhost:8000/api/v1/hotel/rooms/update/${roomData.id}` : 'http://localhost:8000/api/v1/hotel/rooms/create'
        const method = roomData.id !== '' ? 'PUT': 'POST'

        /*try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method,
                body: JSON.stringify({
                    hotel_id: roomData.hotel_id,
                    room_accomodation_id: roomData.room_accomodation_id,
                    number_rooms: roomData.number_rooms
                })
            })

            if (response.ok) {
                const result = await response.json()

                if (result.message === 'success') {
                    setSucceed(true)
                } else {
                    setWatrning(true)
                    setWarningMessage(result.message)
                }
            }
        }catch (e) {
            console.log(e)
        }*/
       const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify({
                hotel_id: roomData.hotel_id,
                room_accomodation_id: roomData.room_accomodation_id,
                number_rooms: roomData.number_rooms
            })
        }
    
        const message = await createHotelRoom(url, options)
        if (message === 'success') {
            setSucceed(true)
        }else {
            setWatrning(true)
            setWarningMessage(message)
        }
    }

    return (                    
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="hotel" className="form-label">Hotel</label>
                {succeed && <Success message="Exito!" />}
                {warning && <Warning message={warningMessage} />}
                <select 
                    id="hotel" 
                    className="form-control" 
                    onChange={(event) => {handleChange(event)}} 
                    value={roomData.hotel_id}
                    name="hotel_id"
                >
                    <option value="">-- Seleccione un Hotel --</option>
                    {hotels.length > 0 && hotels.map((hotel) => <option key={hotel.id} value={hotel.id}>{hotel.name}</option>)}
                </select>
            </div> 
            <div className="mb-3">
                <label htmlFor="room" className="form-label">Habitación</label>
                <select 
                    id="room" 
                    className="form-control" 
                    onChange={(event) => handleChange(event)} 
                    value={roomData.room_accomodation.room_id}
                    name="room_id"
                >
                    <option value="">-- Seleccione una Habitación --</option>
                    {rooms.length > 0 && rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="accomodation" className="form-label">Acomodación</label>
                <select 
                    id="accomodation" 
                    className="form-control" 
                    onChange={(event) => handleChange(event)} 
                    value={roomData.room_accomodation.id}
                    name="room_accomodation_id"
                >
                    <option value="">-- Seleccione una Acomodación --</option>
                    {accomodations.length > 0 && accomodations.map((accomodation) => <option key={accomodation.id} value={accomodation.id}>{accomodation.accomodation.name}</option>)}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="number" className="form-label">Número de Habitaciones</label>
                <input id="number" type="number" className="form-control" onChange={(event) => handleChange(event)} value={roomData.number_rooms} name="number_rooms"/>
            </div>
            <button type="submit">{title}</button>
            <button type="button">Limpiar</button>
        </form>
    )
}

export default Form