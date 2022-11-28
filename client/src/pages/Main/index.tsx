import { useEffect, useState } from 'react';
import { ACTIONS } from '../../../../server/socket/actions';
import { useNavigate } from 'react-router-dom';
import v4 from 'uuid4';
import socket from '../../core/socket';

const MainPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      if (!Array.isArray(rooms)) rooms = [];
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
};

export default MainPage;
