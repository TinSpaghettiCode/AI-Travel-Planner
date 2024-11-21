import { createContext } from 'react';

type TripContextType = {
  tripData: any;
  setTripData: React.Dispatch<React.SetStateAction<any>>;
};

export const CreateTripContext = createContext<TripContextType | null>(null);
