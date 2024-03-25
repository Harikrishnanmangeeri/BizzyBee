'use client'
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosInstance from '@/axios/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  ProductName: string;
  Quntatity: number;
  Price: number;
  Image: string;
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>('user/showproducts');
        setProducts(response.data); 
      } catch (error) {
        toast.error('An error occurred while fetching products.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ToastContainer/>
      {products.map(product => (
        <Card key={product?._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={product?.ProductName}
            height="140"
            image={product?.Image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.ProductName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.Quntatity} available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${product?.Price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default AllProducts;
