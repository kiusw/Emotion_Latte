import '../css/autoSlider.css'

function AutoSlider() {
  return(
    <>
      <div className="autoSlider">
        <img src="http://placehold.it/300x300" id="autoSliderImg1" alt="sliderImg"/>
        <img src="http://placehold.it/300x300" id="autoSliderImg2" alt="sliderImg"/>
        <img src="http://placehold.it/300x300" id="autoSliderImg3" alt="sliderImg"/>
        <img src="http://placehold.it/300x300" id="autoSliderImg4" alt="sliderImg"/>
      </div>
      <div>
        <button className="prevBtn">&lt;</button>
        <button className="nextBtn">&gt;</button>
      </div>
    </>
  )
};

export default AutoSlider;