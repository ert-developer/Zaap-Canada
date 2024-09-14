function generateRoomId(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-';
  let roomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomId += characters.charAt(randomIndex);
  }

  return roomId;
}

const randomRoomId = generateRoomId(20);
export default randomRoomId;
