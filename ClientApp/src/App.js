import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";

const App = () => {
    const [tareas, setTareas] = useState([]) // aprender del useState
    const [descripcion, setDescripcion] = useState("");

    const mostrarTareas = async () => {
        const response = await fetch("api/tarea/lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data);
        }
        else {
            console.log("status code: ", response.status)
        }
    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let hora = new Date(string).toLocaleTimeString();

        return fecha + " | " + hora
    }

    // aprender de useEffect
    useEffect(() => {
        mostrarTareas();
    }, [])

    const guardarTarear = async (e) => {
        e.preventDefault() //Anulo el efecto de recarga que tiene el form por defecto

        const response = await fetch("api/tarea/guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ descripcion: descripcion })
        });

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
    }

    const cerrarTarear = async (id) => {
        const response = await fetch("api/tarea/cerrar/" + id, {
            method: "DELETE"
        });

        if (response.ok) {
            await mostrarTareas();
        }
    }

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarTarear}>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Ingresa el coso"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">AGREGAR</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted"> {formatDate(item.fechaRegistro)} </small>
                                            <button onClick={() => cerrarTarear(item.idTarea)} className="btn btn-sm btn-outline-danger">Cerrar</button>
                                        </div>
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
