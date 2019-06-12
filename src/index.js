import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactGlobe from 'react-globe';
import markers from './markers';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function getTooltipContent(marker) {
  return `${marker.city}`;
}

function App() {
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  const background1 = 'background.jpg';
  const [background, setBackground] = useState(background1)
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: {x: event.clientX, y: event.clientY},
    });
    setDetails(getTooltipContent(marker));
  }

  function onDefocus(previousCoordinates, event) {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: {x: event.clientX, y: event.clientY},
    });
    setDetails(null);
  }

  return (
    <div style={{fontFamily: 'arial', color: 'transparent', fontWeight: 'bold', width: '100vw', height: '100vh'}}>
      <ReactGlobe
      globeOptions={{
        backgroundTexture: `https://rawcdn.githack.com/arghjun/heritage_threads/10f672f9eda13c1d92310e7bc28f2e98411c945b/animation.jpghttps://rawcdn.githack.com/arghjun/heritage_threads/64aea5fa01fced26c7348c7695c2cadcdcbb5b05/background.png`,
      }}
        markers={markers}
        markerOptions={{
          getTooltipContent,
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
      {details && (
        <div
          style={{
            background: 'transparent',
            position: 'absolute',
            fontSize: 20,
            top: 320,
            right: 320,
            padding: 12,
          }}
        >
          <p>{details}</p>
          <p>
            <meta http-equiv="Refresh" content="0; url=https://heritagethreadco.myshopify.com/collections/frontpage/products/india-hoodie?variant=28471519084624"/>
          </p>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
