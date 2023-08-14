import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import { Oval } from 'react-loader-spinner'

const App = () => {
    const [tareas, setTareas] = useState([]) // aprender del useState
    const [descripcion, setDescripcion] = useState("");
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [rs, setrs] = useState({
        descripcion: '',
        fechaRegistro: '',
        idTarea: ''
    });
    const [descripcionEdit, setDescripcionEdit] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const mostrarTareas = async () => {
        handleShowLoader();
        fetch("api/tarea/lista")
            .then(async response => {
                
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setTareas(data);
                handleCloseLoader();
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let hora = new Date(string).toLocaleTimeString();

        return fecha + " | " + hora
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseLoader = () => setShowLoader(false);
    const handleShowLoader = () => setShowLoader(true);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    // aprender de useEffect
    useEffect(() => {
        mostrarTareas();
    }, [])

    const guardarTarear = async () => {
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
            handleCloseAdd()
        }
    }

    const cerrarIni = async (id) => {
        const response = await fetch("api/tarea/tarea/" + id);

        if (response.ok) {
            const data = await response.json();
            setrs(data)
            handleShowDelete()
        }
        else {
            console.log("status code: ", response.status)
        }
    }

    const agregarIni = async () => {
        handleShowAdd()
    }

    const cerrarTarear = async (id) => {
        const response = await fetch("api/tarea/cerrar/" + id, {
            method: "DELETE"
        });

        if (response.ok) {
            await mostrarTareas();
        }

        handleCloseDelete()
    }

    const editIni = async (id) => {
        const response = await fetch("api/tarea/tarea/" + id);

        if (response.ok) {
            const data = await response.json();
            setrs(data)
            handleShow()
        }
        else {
            console.log("status code: ", response.status)
        }
    }

    const editarTarear = async (id) => {
        //e.preventDefault() //Anulo el efecto de recarga que tiene el form por defecto

        const response = await fetch("api/tarea/editar", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ idTarea: id, descripcion: descripcionEdit })
        });

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
        handleClose()
    }

    function formatDateArg(date) {
        const options = { day: '2-digit', month: 'short' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        const [day, month ] = formattedDate.split(' ');

        return `${day} de ${month}`;
    }

    return (

        <div className="container bg-dark p-4 vh-100">
            

            <div className={showLoader ? `mt-5` : 'row d-none'} style={{ display: 'flex', justifyContent: 'center', padding: 130 }}>
                <Oval
                    height={150}
                    width={150}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
            
            <div className={!showLoader ? `row` : 'row d-none'}>
                <h2 className="text-white">Lista de tareas <button onClick={() => agregarIni()} className="btn btn-sm btn-outline-danger me-1"><Icon.PlusCircleFill /></button></h2>
                
                <div className="col-sm-12">
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Ingresa para buscar..."
                                required
                                onChange={(e) => setDescripcion(e.target.value)} // Aprender que es el evento
                            />
                            <button className="btn btn-success"><Icon.Search /></button>
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
                                            <div>
                                                <button onClick={() => cerrarIni(item.idTarea)} className="btn btn-sm btn-outline-danger me-1"><Icon.Trash3 /></button>
                                                <button onClick={() => editIni(item.idTarea)} className="btn btn-sm btn-outline-danger"><Icon.Bookmarks /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>


            {/*Modals*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre Tarea</Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={rs.descripcion}
                                required
                                onChange={(e) => setDescripcionEdit(e.target.value)} // Aprender que es el evento
                            />
                            <small className="text-muted"> {formatDate(rs.fechaRegistro)} </small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => editarTarear(rs.idTarea)} disabled={!descripcionEdit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Seguro que desea eliminar la tarea <strong>{rs.descripcion}</strong> modificada el {formatDateArg(rs.fechaRegistro)}?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => cerrarTarear(rs.idTarea)}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre Tarea</Form.Label>
                            <input type="text"
                                className="form-control"
                                placeholder="Ingresa el nombre de la tarea"
                                value={descripcion}
                                required
                                onChange={(e) => setDescripcion(e.target.value)} // Aprender que es el evento
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => guardarTarear()}>
                        AGREGAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App;
