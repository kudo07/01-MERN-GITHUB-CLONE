import { toast } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
export const AuthContext = createContext();

// make a hook to call and pass the AuthContext gives the value authUser and setAuthUser
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
// it can be any name
const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //when the user refresh so it goes to the home page that is profile page so whatever the page is navigate to the profile page page
  // because when the user refresh it first initially null anfter the user get because of this useEffect
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/check');
        // this is coming from backedn database

        const data = await res.json();
        setAuthUser(data.user);
        console.log('user authContext', data.user);
        //null or authenticated user object which were logged in from this endpoin in the backend by the passport
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
