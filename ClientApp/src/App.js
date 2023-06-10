import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";

const App = () => {
    const [tareas, setTareas] = useState([])

    const mostrarTareas = async () => {
        const response = await fetch("api/tarea/lista");

        if (response.ok) {
            const data = response.json();
            setTareas(data);
        }
        else {
            console.log("status code: ", response.status)
        }
    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleDateString();

        return fecha + " | " + hora
    }

    useEffect(() => {
        mostrarTareas();
    }, [])

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12"></div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5>{item.descripcion}</h5>
                                        <small className="text-muted"> {formatDate(item.fechaRegistro)} </small>
                                        <button className="btn btn-sm btn-outline-danger">Cerrar</button>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default App;
