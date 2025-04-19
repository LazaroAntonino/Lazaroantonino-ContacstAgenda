import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectAgenda = () => {

    const [agendas, setagendas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadContact();
    }, []);

    const loadContact = async () => {
        fetch('https://playground.4geeks.com/contact/agendas/')
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return resp.json();
            })
            .then((data) => {
                setagendas(data);
                console.log(data);
            })
            .catch((err) => {
                console.error('Error en el loader:', err);
            });
    }
    const handleDelete = async (slug) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el contacto');
            }

            loadContact(); // Llamar a la función loader() si todo sale bien.
        } catch (err) {
            console.error('Estoy en el CATCH Error en el proceso:', err.message || err);
        }
    };

    return (
        <div className='container'>
            <div className='row d-flex align-items-center flex-column mx-1'>
                <button className='col-auto btn btn-success btn-small mt-4 ms-auto' onClick={() => navigate(`/createagenda`)}>Create new agenda</button>
                <h3 className='text-center p-0 mt-5'><strong><u>AGENDAS</u></strong></h3>
            </div>
            <div className='row d-flex flex-colum mt-3 justify-content-center'>
                {agendas.agendas?.map((el, index) => (
                    <li
                        className="list-group-item d-flex flex-column col-12 col-md-8 col-lg-8"
                        key={index}
                    >
                        <div className="zoom-div text-center">
                            <span className="fa-solid fa-calendar me-5"></span>
                            <p className="m-0 spamIcon" onClick={() => navigate(`/contactlist/${el.slug}`)}><strong>Agenda of:</strong> <u>{el.slug}</u></p>
                            <span className='text-danger fa-solid fa-trash ms-3 spamIcon' onClick={() => handleDelete(el.slug)}></span>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}