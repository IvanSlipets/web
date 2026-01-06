import "./MainBanner.css";
// import { Aperture } from 'lucide-react'; 
import car1 from "../images/car1.png"; ;

const MainBanner = () => (
    <section className="main-banner-section"> 
        {/* <div className="main-banner-image-placeholder"> 
            <Aperture size={80} color="#aaaaaa" />
        </div> */}
        <img src={car1} alt="Main Banner" className="main-banner-image" />

        <div className="main-banner-content"> 
            
            <h1 className="main-banner-title">Dream cars</h1> 
            
            <p className="main-banner-text">
                Here you will see cars that you want to dirive at least once
            </p>
        </div>
    </section>
);

export default MainBanner;