import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export const ContactList = () => {
    // Ejemplo de contactos iniciales
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const createAntoninoAgenda = () => {
        fetch('https://playground.4geeks.com/contact/agendas/Antonino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (!resp.ok) throw new Error('Error al cargar los datos');
                return resp.json();
            })
            .then((data) => {
                alert('Contacto Creado!!!');
            })
            .catch((err) => {
                console.error('Error en el loader:', err.message || err);
            });
    }


    useEffect(() => {
        loader();
    }, [])

    const loader = () => {
        fetch('https://playground.4geeks.com/contact/agendas/Antonino/contacts')
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return resp.json();
            })
            .then((data) => {
                dispatch({ type: 'contactListData', payload: data });
            })
            .catch((err) => {
                createAntoninoAgenda();
                console.error('Error en el loader:', err);
            });
    };

    const goToEditPage = (id) => {
        navigate(`/EdditContact/${id}`);
    };

    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/Antonino/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (!resp.ok) throw new Error('Error al eliminar el contacto');
            })
            .then((data) => {
                loader();
            })
            .catch((err) => {
                console.error('Estoy en el CATCH Error en el proceso:', err.message || err);
            });
    };

    return (
        <div className="container text-center my-5">
            <h2 className="my-2">Contacts</h2>
            <div className="row">
                <ul className="list-group list-group-flush p-0 align-items-center">
                    {store.contacts &&
                        store.contacts.map((element) => (
                            <li
                                className="list-group-item mt-1 px-0 d-flex w-75 flex-column align-items-center col-12 col-md-8 col-lg-6"
                                key={element.id}
                            >
                                <div className="zoom-div">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                                            <img
                                                className="userImg"
                                                src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png"
                                                alt="userImage"
                                            />
                                        </div>
                                        <div className="col-12 col-md-8 text-start">
                                            <p className="m-0"><strong>Nombre:</strong> {element.name}</p>
                                            <p className="m-0"><strong>Phone:</strong> {element.phone}</p>
                                            <p className="m-0"><strong>Email:</strong> {element.email}</p>
                                            <p className="m-0"><strong>Address:</strong> {element.address}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center justify-content-md-end mt-3">
                                        <span
                                            onClick={() => handleDelete(element.id)}
                                            className="mx-3 text-danger fa-solid fa-eraser fa-lg spamIcon"
                                        ></span>
                                        <span
                                            onClick={() => goToEditPage(element.id)}
                                            className="mx-3 text-dark fa-solid fa-user-pen fa-lg spamIcon"
                                        ></span>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            <Link to="/addContact">
                <button type="button" className="btn btn-dark text-white mt-3">Create new contact</button>
            </Link>
        </div>
    );
}