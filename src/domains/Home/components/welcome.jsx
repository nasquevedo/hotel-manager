import { Link } from "react-router-dom"

const Welcome = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 d-flex justify-content-center align-items-center">
                    <h6 className="display-6">Bienvenido, aquí puedes gestionar tus <Link to="/hotels">hoteles</Link></h6>
                </div>
            </div>
        </div>
    )
}

export default Welcome