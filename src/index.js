import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'react-circular-progressbar/dist/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css';
import './index.css';
import App from '../src/Components/App/App';
import { MediaProvider } from './Context/Media';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LatestTrail } from './Context/LatestTrails';
import UpcomingTrailer from './Context/Upcoming';
import PopTrailer from './Context/Popular';
import HighRatedProvider from './Context/TopRated';




const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();

root.render(

    <QueryClientProvider client={client}>
      <MediaProvider>
        <LatestTrail>
          <UpcomingTrailer>
            <PopTrailer>
              <HighRatedProvider>
               <App/>
              </HighRatedProvider>
           </PopTrailer>
          </UpcomingTrailer>
        </LatestTrail>
      </MediaProvider>
    </QueryClientProvider>
);


