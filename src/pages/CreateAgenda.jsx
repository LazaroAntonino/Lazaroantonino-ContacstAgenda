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
                <div className="col-12">
                    <button
                        type="button"
                        className="btn btn-dark text-white my-3"
                        onClick={() => navigate(`/`)}
                    >
                        Come back
                    </button>
                </div>
            </div>
            <div>
                <h3 className="my-4">Create Your Own Agenda!</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-light rounded border p-4 d-flex flex-column flex-md-row justify-content-center align-items-center"
                    >
                        <input
                            className="form-control mx-2 my-2 my-md-0 rounded border-1"
                            type="text"
                            value={agendaName}
                            placeholder="Name your agenda"
                            onChange={(e) => setAgendaName(e.target.value)}
                        />
                        <input
                            className="btn btn-success mx-2 my-2 my-md-0"
                            type="submit"
                            value="Create agenda"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}