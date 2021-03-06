import { useEffect } from 'react';
import { addRoute, Route } from '../service/Router$';


const useAddRoute = (route: Route) => {
  useEffect(() => {
    addRoute(route);
  }, []);
}

export default useAddRoute;