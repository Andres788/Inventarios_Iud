import React from "react";

import { useState, useEffect } from "react";

import {Link, useParams } from "react-router-dom";

import * as API from '../../services/estados-service';
import * as API_U from '../../services/usuarios-services';

import { NavBar } from "../../components/navBar/NavBar";

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';

export function EditarEstado() {

    const { id } = useParams();

    const [estadoEquipo, setEstadoEquipo] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [dataForm, setDataForm] = useState({});

    const {nombre='', usuario='', estado=''} = dataForm;

   const getEstadoEquipo = async () => {
        try {
            const estadoEquipo = await API.getEstado(id);
            setEstadoEquipo(estadoEquipo);
            console.log(estadoEquipo);
        } catch (error) {
            console.log(error);
        }
    }

    const getUsuarios = async () => {
        try {
            const usuarios = await API_U.getUsuarios();
            setUsuarios(usuarios);
            console.log(usuarios);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setDataForm({
            nombre: estadoEquipo.nombre,
            usuario: estadoEquipo.usuario,
            estado: estadoEquipo.estado
        });
    },[estadoEquipo]);

    useEffect(() => {
        getUsuarios();
    },[]);


    useEffect(() => {
        getEstadoEquipo();
    },[id]);

    const handleChange = (e) => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const estadoEquipo = {
            nombre,
            usuario:{
                email: usuario,
            },
            estado
        }
        console.log(estadoEquipo);
        try {
            const response = await API.updateEstado(id, estadoEquipo);
            console.log(response);
            Swal.fire({
                title: 'Marca actualizada',
                text: 'La marca se actualizó correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                showConfirmButton: true
            })
        } catch (error) {
            console.log(error);
        } 
    }

    return(
        <>
            <NavBar />
            <div className="container">
                    <div className="row my-3">
                        <div className="col-12">
                            <h1 className="text-center">Editar Marca</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                                <div class="card border-secondary mb-3" style={{width: 30+ "rem"}}>
                                    <div class="card-body text-secondary text-">
                                        <h5 class="card-title text-center"> {estadoEquipo.nombre} </h5>
                                        <p class="card-text text-center">Editar usuario!</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group my-2">
                                                <label>Nombre</label>
                                                <input type="text" className="form-control" name="nombre" value={nombre} onChange={handleChange} />
                                            </div>
                                            <div className="form-group my-2">
                                                <label htmlFor="usuario" >Usuario</label>
                                                <select className="form-control" name="usuario" value={usuario} onChange={handleChange}>
                                                    <option value="">Seleccione un usuario</option>
                                                    {
                                                        usuarios.map(usuario => (
                                                            <option key={usuario._id} value={usuario.email}>{usuario.nombre}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group my-2">
                                                <label>Estado</label>
                                                <select className="form-control" name="estado" value={estado} onChange={handleChange}>
                                                    <option value="">Seleccione un estado</option>
                                                    <option value="Activo">Activo</option>
                                                    <option value="Inactivo">Inactivo</option>
                                                </select>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary mx-3">Actualizar</button>
                                                <Link to="/estados" className="btn btn-secondary mx-3">Volver</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
        </>
    )
}