import React,{useState,useEffect} from 'react';
import './App.css';

import Api from './Api.js';

import ChatListItem from './components/ChatListItem.js';
import ChatIntro from './components/ChatIntro.js';
import ChatWindow from './components/ChatWindow.js';
import NewChat from './components/NewChat.js';
import Login from './components/Login.js';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

    const [chatlist , setChatList] = useState([]);
    //chat ativo
    const [activeChat,setActiveChat] = useState({});  
    //conteudo do usuario logado
    const [user, setUser] = useState(null);
    const [showNewChat , setShowNewChat] = useState(false);
    
  
    useEffect(() => {
      if(user !== null){
        //monstrando lista de chat
        let unsub = Api.onChatList(user.id, setChatList);
        return unsub;
      }
    },[user]);

    const handleNewChat = () =>{
       setShowNewChat(true);
    }

   const handleLoginData = async (u) =>{
      let newUser = {
        id: u.uid,
        name:u.displayName,
        avatar:u.photoURL
      };
      //adicionando novo usuario 
      await Api.addUser(newUser);
      setUser(newUser);
   }

    //monstrando componente de login
    if(user === null){
       return(<Login  onReceive ={handleLoginData} />);
    }

  return (
    <div className ="app-window">
       <div className="sidebar">
         <NewChat
              chatlist={chatlist}
              user={user}
              show={showNewChat}
              setShow={setShowNewChat}
         />
          <header>
            <img className ="header--avatar" src ={user.avatar} alt="" />
            <div className ="header--buttons">
              <div className ="header--btn">
                  <DonutLargeIcon style ={{color:'#919191'}}/>
               </div>
               <div onClick ={handleNewChat} className ="header--btn">
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
           <ChatWindow
              user={user}
              data={activeChat}
           />
         }
         {// se chatId for igual a undefined mostra a tela de intro
          activeChat.chatId === undefined &&
         <ChatIntro />
         }
       </div>
    </div>
  );
}