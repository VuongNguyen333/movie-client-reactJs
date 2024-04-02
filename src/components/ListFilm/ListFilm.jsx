import Carousel from 'react-multi-carousel'
import Film from '~/components/Film/Film'
import { productData, responsive } from '~/mock_data'
import 'react-multi-carousel/lib/styles.css'
import 'react-multi-carousel/lib/styles.css'
import './ListFilm.css'
function ListFilm() {

  const product = productData.map((item) => (
    <Film
      key={`Film${item.id}`}
      name={item.name}
      url={item.imageurl}
      description={item.description}
    />
  ))
  return (
    <div>
      <h1 >Phim đang chiếu</h1>
      <Carousel showDots={true} responsive={responsive} swipeable={false} draggable={false}>
        {product}
      </Carousel>
    </div>
  )
}

export default ListFilm