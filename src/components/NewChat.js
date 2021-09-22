import React,{useState,useEffect} from 'react';
import './NewChat.css';

import Api from '../Api.js';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user,chatlist,show,setShow}) => {
    const [list ,setList] =useState([]);

    //quando iniciar a tela
    useEffect(() =>{
        const getList = async () =>{
            //se tem usuario logado
            if(user !== null ){
              //lista de contado  
              let results = await Api.getContactList(user.id);
              //jogando no liste
              setList(results);
            }
        }
        getList();
    },[user]);

    const addNewChat = async (user2)=>{
        //iniciando um conversa
        await Api.addNewChat(user,user2);

        handleClose();
    }

    const handleClose =() =>{
        setShow(false);
    }

  return(
      <div className ="newChat" style ={{left :show?0: -415}}>
          <div className="newChat--head">
              <div onClick ={handleClose} className ="newChat--backbutton">
                  <ArrowBackIcon style={{color: '#FFFFFF'}} />
              </div>
              <div className ="newChat--headtitle">Nova Conversa</div>
          </div>
          <div className="newChat--list">
                {list.map((item,key)=>(
                    <div onClick={()=> addNewChat(item)} className ="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src ={item.avatar} alt ="" />
                        <div className="newchat--itemname">{item.name}</div>
                    </div>
                ))}
          </div>
      </div>
  );
}