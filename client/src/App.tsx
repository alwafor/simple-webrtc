import { useEffect, useState } from 'react';
import './assets/styles/reset.css';
import socket from './core/socket';
import { ACTIONS } from './../../server/socket/actions';
import { useNavigate } from 'react-router-dom';
import v4 from 'uuid4';

function App() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      setRooms(rooms);
    });
  });

  const createNewRoom = () => {
    navigate(`/room/${v4()}`);
  };

  const navigateToRoom = (id: string) => {
    navigate(`/room/${v4()}`);
  };

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((roomId) => (
          <li key={roomId}>
            {roomId}
            <button onClick={() => navigateToRoom(roomId)}>JOIN ROOM</button>
          </li>
        ))}
      </ul>

      <button onClick={createNewRoom}>Create new room</button>
    </div>
  );
}

export default App;
