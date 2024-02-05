
import axios from 'axios';
import { getEvents } from '../reducers/eventsReducer';

const getEventsCall = ()=>{
    return(dispatch)=>{
       axios.get('/events')
      .then((res)=>{
       dispatch(getEvents(res?.data))
      }).catch((error)=>{
        dispatch(getEvents([]))
      })
    }
}

export { getEventsCall }