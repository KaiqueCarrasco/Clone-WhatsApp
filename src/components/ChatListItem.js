import React from 'react';
import './ChatListItem.css';

export default ({onClick,active,data}) => {
    return (
        // se active for true muda o background
      <div className ={`chatListItem ${active?'active':''}`}
      //evento de click
      onClick={onClick}
      >
          
          <img className="chatListItem--avatar" src={data.image} alt="" />
          <div className="chatListItem--lines">
              <div className="chatListItem--line">
                  <div className="chatListItem--name">{data.title}</div>
                  <div className="chatListItem--date">02:06</div>
              </div>
              
              <div className ="chatListItem--line">
                  <div className="chatListItem--lastMsg">
                    <p>Hello  world</p>
                  </div>
              </div>
          </div>
      </div>
    );
}