 import React from 'react';
 import './Login.css';
 import Api from '../Api.js';

export default ({onReceive}) => {
  
   const handleGmailLogin = async() =>{
    //salvando o resultado
    let result = await Api.fbPopup();
    //verificado seu deu certo
    if(result){
        onReceive(result.user);
    }
    else {
      alert("Erro!");
    }
  }

   return(
     <div className="login">
          <button onClick={handleGmailLogin}>Logar com a conta do Gmail</button>
     </div>
   );
}