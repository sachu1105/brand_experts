import { motion } from 'framer-motion';
import ProductMainImage from '../../assets/images/productpagemainimage.png'

const productCategories = [
  {
    id: 1,
    title: 'Acrylic Signs',
    description: 'We provide a range of polishing and cutting options for the perfect shine and custom look. Choose from various thicknesses.',
    image: 'https://cdn.squaresigns.com/images/media/dental-clinic-custom-acrylic-signs.jpg'
  },
  {
    id: 2,
    title: 'Aluminum Signs',
    description: 'Are you trying to achieve your branding goals for outdoors? Go for aluminum signs that provide elegance, durability and weather resistance.',
    image: 'https://falcon-signs.com/wp-content/uploads/2023/03/brushed-aluminum-signs.jpg'
  },
  {
    id: 3,
    title: 'Foam Board Signs',
    description: 'Foam board signs present a perfect outlook for indoor displays. These signs are lightweight and cost-effective.',
    image: 'https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/india%20lob/sun%20boards/in_sun_boards_002'
  },
  {
    id: 4,
    title: 'Tabletop Retractable Banners',
    description: 'Perfect mini table banners are a classy way to promote your brand at events or trade shows.',
    image: 'https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-ie/S001124169/tabletop-retractable-banner-011'
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 bg-gray-900 text-white"
      >
        <div className="absolute inset-0">
          <img 
            src={ProductMainImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Custom Signs for Branding,
            <br />
            Promotions and Decor
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg"
          >
            Distinguish your brand and showcase your personality with custom signs and graphics.
          </motion.p>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8">Custom sign printing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;