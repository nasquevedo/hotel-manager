import Form from "./components/Form"
import Table from "./components/Table"
import store from "./store/store"
import  { Provider } from 'react-redux'

const Hotel = () => {
    return (
        <Provider store={store}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <Form />
                    </div>
                    <div className="col-sm-8">
                        <Table />
                    </div>
                </div>
            </div>
        </Provider>
    )
}

export default Hotel