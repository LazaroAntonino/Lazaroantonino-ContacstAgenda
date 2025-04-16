import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const EdditContact = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputAddressRef = useRef(null);
    const inputPhoneRef = useRef(null);

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
                const filteredData = data.contacts.filter(el => el.id === Number(id)); // Filtramos antes de asignar.
                if (filteredData.length > 0) { // Usamos el array filtrado directamente.
                    inputNameRef.current.value = filteredData[0].name; // Asignamos el nombre al useRef.
                    inputEmailRef.current.value = filteredData[0].email; // Asignamos el nombre al useRef.
                    inputPhoneRef.current.value = filteredData[0].phone; // Asignamos el nombre al useRef.
                    inputAddressRef.current.value = filteredData[0].address; // Asignamos el nombre al useRef.
                }
            })
            .catch((err) => {
                console.error('Error en el loader:', err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactData = {
            name: inputNameRef.current.value.trim(),
            phone: inputPhoneRef.current.value.trim(),
            email: inputEmailRef.current.value.trim(),
            address: inputAddressRef.current.value.trim(),
        };
        if (contactData.name.length > 3) {
            fetch(`https://playground.4geeks.com/contact/agendas/Antonino/contacts/${id}`, {
                method: 'PUT',
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
                    console.log(data);
                    inputNameRef.current.value = '';
                    inputEmailRef.current.value = '';
                    inputPhoneRef.current.value = '';
                    inputAddressRef.current.value = '';
                    navigate('/contactlist');
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
        <div className="container">
            <Link to='https://solid-chainsaw-q744qx7q99qr3vp5-3000.app.github.dev/contactlist'>
                <button type="button" className="btn btn-dark text-white  m-5">Come back</button>
            </Link>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className='row d-flex justify-content-center p-3 pt-0 bg-light rounded border' >
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                            <label for="exampleInputName" class="form-label">Name <span className='text-danger'>*</span></label>
                            <input type="text" maxLength='40' class="form-control" ref={inputNameRef} id="exampleInputName" aria-describedby="nameHelp" />
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
                            <input type="text" maxLength='40' class="form-control" ref={inputAddressRef} id="exampleInputAddress" aria-describedby="addressHelp" />
                        </div>
                        <input type="submit" className="col-12 col-sm-6 col-md-4 col-lg-4 btn btn-secondary my-4" value={'Edit contact'} />
                    </div>
                </form>
            </div>
        </div>
    )
}