import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsCall } from '../redux/services/events';
import { CardsComponent, DrawerComponent, ModalComponent, MultiSelectDropDownComponent, TitleComponent } from '../components';
import './styles/events.scss'
import { setCities } from '../redux/reducers/eventsReducer';
import moment from 'moment';

const EventsComponent = (props) => {
  const [selectedCities, setSelectedCities] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState({})

  const dispatch = useDispatch();
  const { events, title, cities, selectedCities: updateSelectedCities, allCitiesLabel } = useSelector((state) => state.eventsReducer)

  useEffect(() => {
    dispatch(getEventsCall())
  }, [dispatch])

  useEffect(() => {
    if (cities?.length) {
      setSelectedCities(cities)
    }
  }, [cities])

  const citiesMemo = useMemo(() => {
    return cities?.length ? [updateSelectedCities?.label ? updateSelectedCities : cities[0]] : []
  }, [cities, updateSelectedCities])

  const viewDetailsAction = (value) => {
    setSelectedCardData(value)
    setDrawerOpen(true)
  }


  const prepareDrawerBody = () => {
    const { label = '', type = '', published_at = '', payload: { image = '', event_date = '', event_time = '', items = []} } = selectedCardData;
    const { event_description = '', event_title = '', event_name = '', orig_price = '', sell_price = '' } = items?.length ? items[0] : {}
    const additionalData = {
        'Event Title': event_title,
        'EVent Name': event_name,
        'Event Data': event_date,
        'Event Time': event_time,
        'Original Price': orig_price,
        'Sell Price': sell_price,
        'Published At': published_at

    }

    return <>
      <h2 className='drawer-title'>Details of City</h2>
      <div className='drawer-header'>
        <div className='location'>
          {label}
        </div>
        <div className='type'>{type?.toString()?.toLowerCase()}</div>
      </div>

      <img className='drawer-image' src={image} alt='' />
      <div className='drawer-description'>{event_description}</div>
      <h4 className='additional-data-label'>Additional Data </h4>
      <div className='additional-data-container'>
        {
          Object.keys(additionalData).map((item, key)=>{
            return <div className='event-item-container' key={key}>
                    <div className='event-key'>{item}</div>
                    <div className='divider'>:</div>
                    <div className='event-value'>{additionalData[item]}</div>
            </div>
          })
        }
      </div>


    </>
  }

  return (
    <>
      {/* Page title component */}
      <TitleComponent title={title} />
      {/* Multi select dropdown component */}
      <MultiSelectDropDownComponent
        data={cities}
        label='Locations'
        placeholder='Search Location'
        fullWidth={true}
        defaultValue={citiesMemo}
        onChangeAction={(value) => {
          setSelectedCities(value)
          dispatch(setCities(value))
        }
        }
      />
      {/* Cards component */}
      <div className='events-body'>
        {
          selectedCities?.length ? selectedCities.map((ele, index) => {
            const { payload: { items = [{}], event_date = moment().format(), event_time = '', image = '' } } = ele?.value;
            const { event_title = '', sell_price = 0 } = items[0];
            return ele?.label !== allCitiesLabel ? <CardsComponent
              key={ele+'-'+index}
              selectedCard={{...ele?.value, label: ele?.label}}
              title={event_title}
              subTitle={event_date + ', ' + event_time}
              price={sell_price}
              location={ele?.label}
              image={image}
              linkLabel={'View Details'}
              onLinkAction={viewDetailsAction}
              onClick={viewDetailsAction}
            /> : <></>

          }) : <></>
        }
        {/* Drawer component */}
        {
          drawerOpen ? <DrawerComponent
            open={drawerOpen}
            toggleDrawer={()=> {
              setSelectedCardData({})
              setDrawerOpen(false)
            }
            }
            position='right'
            body={prepareDrawerBody()}
            className={'events-drawer-component-container'}
            enabledCloseIcon={true}
          />
            : <></>
        }

      </div>

    </>
  )
}

export default EventsComponent