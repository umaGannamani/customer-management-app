import React from 'react';

export default function Pagination({ page, setPage }){
  return (
    <div style={{marginTop:12}}>
      <button onClick={()=> setPage(p => Math.max(1, p-1))}>Prev</button>
      <span style={{margin:'0 8px'}}>Page {page}</span>
      <button onClick={()=> setPage(p => p+1)}>Next</button>
    </div>
  );
}
