import React, { useEffect, useState } from "react";

function ChatBar({ socket }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setOnlineUsers(data);
    });
  }, [socket, onlineUsers]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {onlineUsers.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
