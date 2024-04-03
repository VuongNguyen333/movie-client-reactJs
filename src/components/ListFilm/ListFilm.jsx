import Carousel from 'react-multi-carousel'
import Film from '~/components/Film/Film'
import { responsive } from '~/mock_data'
import 'react-multi-carousel/lib/styles.css'
import 'react-multi-carousel/lib/styles.css'
import './ListFilm.css'
function ListFilm({ productData }) {

  const product = productData.map((item) => (
    <Film
      key={`Film${item.id}`}
      id={item.id}
      name={item.name}
      url={item.imageurl}
      description={item.description}
      isActive={item.isActive}
    />
  ))
  return (
    <div>
      { productData[0].isActive ? <h1 >Phim đang chiếu</h1> : <h1 >Phim sắp chiếu</h1>}
      <Carousel showDots={true} responsive={responsive} draggable={false}>
        {product}
      </Carousel>
    </div>
  )
}

export default ListFilm