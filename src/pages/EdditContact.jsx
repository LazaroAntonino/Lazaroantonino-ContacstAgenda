import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const EdditContact = () => {

    const navigate = useNavigate();
    const { slug, id } = useParams();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        loader();
    }, [])

    const loader = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return resp.json();
            })
            .then((datos) => {
                const filteredData = datos.contacts.filter(el => el.id === Number(id));
                if (filteredData.length !== null) {
                    setData({
                        name: filteredData[0].name,
                        email: filteredData[0].email,
                        phone: filteredData[0].phone,
                        address: filteredData[0].address
                    });
                }
            })
            .catch((err) => {
                console.error('Error en el loader:', err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.name.length > 3) {
            fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
                method: 'PUT',
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
                    console.log(data);
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
        <div className="container">
            <div className="row">
                <button type="button" className=" col-auto btn btn-dark text-white my-5 mx-1" onClick={() => navigate(`/contactlist/${slug}`)}>Come back</button>
            </div>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className='row d-flex justify-content-center p-3 pt-0 bg-light rounded border m-1' >
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                            <label htmlFor="exampleInputName" className="form-label">Name <span className='text-danger'>*</span></label>
                            <input type="text" maxLength='40' className="form-control" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} id="exampleInputName" aria-describedby="nameHelp" />
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                            <input type="email" maxLength='40' className="form-control" value={data.email}  onChange={(e) => setData({ ...data, email: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                            <input type="number" maxLength='40' className="form-control" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} id="exampleInputPhone" aria-describedby="phoneHelp" />
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 m-4'>
                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                            <input type="text" maxLength='40' className="form-control" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })}
                                id="exampleInputAddress" aria-describedby="addressHelp" />
                        </div>
                        <input type="submit" className="col-12 col-sm-6 col-md-4 col-lg-4 btn btn-secondary my-4" value={'Edit contact'} />
                    </div>
                </form>
            </div>
        </div>
    )
}