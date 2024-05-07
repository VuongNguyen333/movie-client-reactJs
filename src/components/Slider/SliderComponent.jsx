import Slider from 'react-slick'
import './SliderCssCustom.css'

function SliderConponent({ arrImage }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
    nextArrow: <></>
  }
  return (
    <Slider {...settings}>
      {arrImage.map((img, index) => {
        return (
          <img key={`image${index}`} src={img} style={{ height:'700' }}/>
        )
      })}
    </Slider>
  )
}

export default SliderConponent