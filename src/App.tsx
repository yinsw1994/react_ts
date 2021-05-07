import React from 'react';
import './App.css';
// import { ProjectListScreen } from 'screens/project-list'
// import { LoginScreen } from 'screens/login'
import { AuthenticatedApp } from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import { useAuth } from 'context/auth-context';


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
     {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;


// 主要描述app本身, index.tsx 主要用来做些准备工作
