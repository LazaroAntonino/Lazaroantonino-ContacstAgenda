import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";


export const AddContact = () => {

    const navigate = useNavigate();
    const { slug } = useParams();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.name.length > 3) {
            fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((resp) => {
                    if (!resp.ok) throw new Error('Error al cargar los datos');
                    return resp.json();
                })
                .then((data) => {
                    setData({ name: '', email: '', phone: '', address: '' })
                    navigate(`/contactlist/${slug}`);
                })
                .catch((err) => {
                    console.error('Error en el loader:', err.message || err);
                });
        }
        else {
            alert('Please complete all required fields before submitting.');
        }
    }

    return (
        <div className='container'>
            <button type="button" className="btn btn-dark text-white my-4 mx-1" onClick={() => navigate(`/contactlist/${slug}`)}>Come back</button>
            <form onSubmit={handleSubmit} className='mx-1'>
                <div className='row d-flex justify-content-center p-3 pt-0 bg-light rounded border'>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label htmlFor="exampleInputName" className="form-label">Name <span className='text-danger'>*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            maxLength='40'
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            maxLength='40'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input
                            type="number"
                            maxLength='40'
                            className="form-control"
                            id="exampleInputPhone"
                            aria-describedby="phoneHelp"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            maxLength='40'
                            className="form-control"
                            id="exampleInputAddress"
                            aria-describedby="addressHelp"
                            value={data.address}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                        />
                    </div>
                    <input
                        type="submit"
                        className="col-12 col-sm-6 col-md-4 col-lg-4 btn btn-secondary my-4"
                        value="Add contact"
                    />
                </div>
            </form>
        </div >
    )
}