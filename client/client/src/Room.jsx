import React from 'react';
import TeacherView from './TeacherView';
import StudentView from './StudentView';
import { useParams } from 'react-router-dom';

function Room({ userType }) {
  const { roomId } = useParams();
  
  return (
    userType === 'teacher'
      ? <TeacherView roomId={roomId} />
      : <StudentView roomId={roomId} />
  );
}

export default Room;