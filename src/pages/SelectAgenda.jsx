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

    return (
        <div className='d-flex align-items-center flex-column'>
            <div className='d-flex flex-colum w-100 m-4 justify-content-center'>
                <h3 className='m-5'><strong>AGENDAS</strong></h3>
                <button className='btn btn-success h-25 ms-5'>Create new agenda</button>
            </div>
            {agendas.agendas?.map((el, index) => (
                <li
                    className="list-group-item px-0 d-flex w-75 flex-column align-items-center col-12 col-md-8 col-lg-6"
                    key={index}
                    onClick={() => navigate(`/contactlist/${el.slug}`)}
                >
                    <div className="zoom-div w-50">
                        <div className="row align-items-center w-100">
                            <div className="col-12 col-md-8 text-start d-flex justify-content-around align-items-center justify-content-center">
                                <span class="fa-solid fa-calendar"></span>
                                <p className="m-0"><strong>Agenda of:</strong> {el.slug}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center justify-content-md-end mt-3">
                        </div>
                    </div>
                </li>
            ))}
        </div>
    );
}