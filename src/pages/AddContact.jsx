import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const AddContact = () => {

    const navigate = useNavigate();

    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPhoneRef = useRef(null);
    const inputAddresRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactData = {
            name: inputNameRef.current.value.trim(),
            phone: inputPhoneRef.current.value.trim(),
            email: inputEmailRef.current.value.trim(),
            address: inputAddresRef.current.value.trim(),
        };

        if (contactData.name.length > 3) {
            fetch('https://playground.4geeks.com/contact/agendas/Antonino/contacts', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            })
                .then((resp) => {
                    if (!resp.ok) throw new Error('Error al cargar los datos');
                    return resp.json();
                })
                .then((data) => {
                })
                .catch((err) => {
                    console.error('Error en el loader:', err.message || err);
                });

            inputNameRef.current.value = '';
            inputEmailRef.current.value = '';
            inputPhoneRef.current.value = '';
            inputAddresRef.current.value = '';

            navigate("/");
        }
        else {
            alert('Please complete all required fields before submitting.');
        }
    }

    return (
        <div className='container'>
            <button type="button" className="btn btn-dark text-white  m-5" onClick={()=>navigate("/")}>Come back</button>
            <form onSubmit={handleSubmit}>
                <div className='row d-flex justify-content-center p-3 pt-0 bg-light rounded border' >
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label for="exampleInputName" class="form-label">Name <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" maxLength='40' ref={inputNameRef} id="exampleInputName" aria-describedby="nameHelp" />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label for="exampleInputEmail" class="form-label">Email</label>
                        <input type="email" maxLength='40' class="form-control" ref={inputEmailRef} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label for="exampleInputPhone" class="form-label">Phone</label>
                        <input type="number" maxLength='40' class="form-control" ref={inputPhoneRef} id="exampleInputPhone" aria-describedby="phoneHelp" />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                        <label for="exampleInputAddress" class="form-label">Address</label>
                        <input type="text" maxLength='40' class="form-control" ref={inputAddresRef} id="exampleInputAddress" aria-describedby="addressHelp" />
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