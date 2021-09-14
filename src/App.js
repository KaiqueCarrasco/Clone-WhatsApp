import React,{useState,useEffect} from 'react';
import './App.css';

import ChatListItem from './components/ChatListItem.js';
import ChatIntro from './components/ChatIntro.js';
import ChatWindow from './components/ChatWindow.js';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

    const [chatlist , setChatlist] = useState([
      {chatId:1 , title : 'Fulano doido',image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      {chatId:2 , title : 'Fulano doido',image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      {chatId:3 , title : 'Fulano doido',image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      {chatId:4 , title : 'Fulano doido',image: 'https://www.w3schools.com/howto/img_avatar2.png' }
    ]);
    
    //chat ativo
    const [activeChat,setActiveChat] = useState({});  

  return (
    <div className ="app-window">
       <div className="sidebar">

          <header>
            <img className ="header--avatar" src ="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
            <div className ="header--buttons">
              <div className ="header--btn">
                  <DonutLargeIcon style ={{color:'#919191'}}/>
               </div>
               <div className ="header--btn">
                  <ChatIcon style ={{color:'#919191'}}/>
               </div>
               <div className ="header--btn">
                  <MoreVertIcon style ={{color:'#919191'}}/>
               </div>
            </div>
          </header>

          <div className="search">
            <div className="search--input">
              <SearchIcon fontSize="small" style={{color:'#919191'}} />
              <input type="search" placeholder="Procurar ou começar uma nova conversa" />
            </div>
          </div>
          
          <div className ="chatlist">
            { //monstando os items
              chatlist.map((item,key)=>(
                <ChatListItem 
                //adicionando props
                    key={key}
                    data={item}
                    //indicando qual chat esta ativo 
                    active ={activeChat.chatId === chatlist[key].chatId}
                    //passando o item da chatlist
                    onClick= {()=>setActiveChat(chatlist[key])}
                  />
              ))}
          </div>
       </div>
       <div className ="contentarea">
         {// se chatId  for diferente undefined mostra a tela conversa
           activeChat.chatId !== undefined &&
           <ChatWindow/>
         }
         {// se chatId for igual a undefined mostra a tela de intro
          activeChat.chatId === undefined &&
         <ChatIntro />
         }
       </div>
    </div>
  );
}