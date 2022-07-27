import { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { message, type },
    });

    setTimeout(removeAlert, 3000);
  };

  const removeAlert = () => {
    dispatch({ type: 'REMOVE_ALERT' });
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
