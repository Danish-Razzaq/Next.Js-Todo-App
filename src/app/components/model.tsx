import React from 'react';

interface ModelProps{
    modelOpen :boolean,
    setModelOpen: (open:boolean)=> boolean | void,
    children: React.ReactNode
}

const Model: React.FC<ModelProps> = ({modelOpen ,setModelOpen ,children}) => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
<dialog id="my_modal_3" className={`modal ${modelOpen? 'modal-open' : '' }  `}>
  <div className="modal-box">
    <form method="dialog " >
        
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-[#1f2328] hover:bg-black text-white" onClick={()=>setModelOpen(false)}>✕</button>
    </form>
  {children}
  </div>
</dialog>
    </div>
  );
}

export default Model;
