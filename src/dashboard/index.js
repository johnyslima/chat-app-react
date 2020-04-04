import React from "react";
import ChatList from "../chatlist";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard page</h1>
        <ChatList></ChatList>
      </div>
    );
  }
}

export default Dashboard;
