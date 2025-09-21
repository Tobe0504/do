import { Dispatch, SetStateAction, useState, createContext } from "react";

interface AppContextValues {
  sideNavIsOpened: boolean;
  setSideNavisOpened: Dispatch<SetStateAction<boolean>>;
}

interface AppContextProviderValues {
  children: React.ReactNode;
}

export const AppContext = createContext({} as AppContextValues);

const AppContextProvider: React.FC<AppContextProviderValues> = ({
  children,
}) => {
  // States
  const [sideNavIsOpened, setSideNavisOpened] = useState(true);

  return (
    <AppContext.Provider value={{ sideNavIsOpened, setSideNavisOpened }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
