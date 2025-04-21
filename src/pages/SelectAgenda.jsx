import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contactServices from '../services/contactServices';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const SelectAgenda = () => {

    const {store,dispatch} = useGlobalReducer();
        const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resp = await contactServices.getAgendas();
            dispatch({type: 'get_agendas', payload: resp.agendas})
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAgenda = async (slug) => {
        try {
            const resp = await contactServices.deleteAgenda(slug);
            loadData();
        }catch (error){
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className='row d-flex align-items-center flex-column mx-1'>
                <button className='col-auto btn btn-success btn-small mt-4 ms-auto' onClick={() => navigate(`/createagenda`)}>Create new agenda</button>
                <h3 className='text-center p-0 mt-5'><strong><u>AGENDAS</u></strong></h3>
            </div>
            <div className='row d-flex flex-colum mt-3 justify-content-center'>
                {store.agendas?.map((el, index) => (
                    <li
                        className="list-group-item d-flex flex-column col-12 col-md-8 col-lg-8"
                        key={index}
                    >
                        <div className="zoom-div text-center">
                            <span className="fa-solid fa-calendar me-5"></span>
                            <p className="m-0 spamIcon" onClick={() => navigate(`/contactlist/${el.slug}`)}><strong>Agenda of:</strong> <u>{el.slug}</u></p>
                            <span className='text-danger fa-solid fa-trash ms-3 spamIcon' onClick={() => deleteAgenda(el.slug)}></span>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}