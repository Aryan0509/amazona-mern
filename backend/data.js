import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'aryan',
      email: 'admin123@gmail.com',
      password: bcrypt.hashSync('123456789'),
      isAdmin: true,
    },
    {
      name: 'suhaniraii',
      email: 'user123@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Nike slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countinstock: 80,
      brand: 'nike',
      rating: 4.5,
      numreviews: 10,
      description: 'high quality product',
    },
    {
      name: 'adidas slim shirt',
      slug: 'adidas-slim-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 150,
      countinstock: 20,
      brand: 'adidas',
      rating: 4.5,
      numreviews: 20,
      description: 'high quality product',
    },
    {
      name: 'Nike slim pant',
      slug: 'nike-slim-pant',
      category: 'pants',
      image: '/images/p3.jpg',
      price: 100,
      countinstock: 20,
      brand: 'nike',
      rating: 4.3,
      numreviews: 15,
      description: 'high quality product',
    },
    {
      name: 'adidas slim pant',
      slug: 'adidas-slim-pant',
      category: 'pants',
      image: '/images/p4.jpg',
      price: 170,
      countinstock: 30,
      brand: 'adidas',
      rating: 4.6,
      numreviews: 40,
      description: 'high quality product',
    },
  ],
};

export default data;
