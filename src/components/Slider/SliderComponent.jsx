import Box from '@mui/material/Box'
import Slider from 'react-slick'
import './SliderCssCustom.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red', mr:'100px' }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  )
}

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
          <img key={`image${index}`} src={img}/>
        )
      })}
    </Slider>
  )
}

export default SliderConponent