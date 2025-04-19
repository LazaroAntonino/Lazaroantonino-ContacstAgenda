import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateAgenda = () => {
    const [agendaName, setAgendaName] = useState();
    const navigate = useNavigate();

    const handlePost = () => {
        if (agendaName !== null && agendaName.length > 1) {
            fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}`, {
                method: 'POST',
            })
                .then((resp) => {
                    if (!resp.ok) throw new Error('Error al cargar los datos');
                    return resp.json();
                })
                .then((data) => {
                })
                .catch((err) => {
                    console.error('Error en el loader this agenda already exist');
                });
        }
        else {
            alert('Name must have at least 1 letter')
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        handlePost();
        setAgendaName('');
        navigate(`/`);
    }


    return (
        <div className="container text-center">
            <div className="row">
                <button type="button" className="col-auto btn btn-dark text-white  m-5" onClick={() => navigate(`/`)}>Come back</button>
            </div>
            <div>
                <h3 className="my-4">Create Your Own Agenda!!!!</h3>
            </div>
            <div className="row mx-1">
                <form onSubmit={handleSubmit} className="bg-light rounded border text-center p-4 d-flex justify-content-center align-content-center">
                    <input className="col-auto mx-2 rounded border-1"type="text" value={agendaName}  placeholder="Name your agenda"  onChange={e => setAgendaName(e.target.value)} />
                    <input className='col-auto btn btn-success mx-2' type="submit" value={'Create agenda'} />
                </form>
            </div>
        </div>
    )
}