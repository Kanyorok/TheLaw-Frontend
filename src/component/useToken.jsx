import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
      const localUser = JSON.parse(localStorage.getItem('user'));
      const accessToken = localUser && localUser.access_token;
      return accessToken;
      };
    
      const [token, setToken] = useState(getToken());
    
      return {
        token
      }
}