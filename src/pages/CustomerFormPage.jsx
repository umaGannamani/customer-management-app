import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import CustomerForm from '../components/CustomerForm';

export default function CustomerFormPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(()=>{
    if(id){ api.get(`/customers/${id}`).then(r=> setInitial(r.data)).catch(err=> console.error(err)); }
  },[id]);

  function handleSubmit(data){
    if(id) api.put(`/customers/${id}`, data).then(()=>{ alert('Updated'); navigate('/customers'); }).catch(err=> console.error(err));
    else api.post('/customers', data).then(()=>{ alert('Created'); navigate('/customers'); }).catch(err=> console.error(err));
  }

  return <CustomerForm onSubmit={handleSubmit} initial={initial} />;
}
