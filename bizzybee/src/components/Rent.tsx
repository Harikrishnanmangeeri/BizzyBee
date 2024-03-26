"use client";
"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import axiosInstance from "@/axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Product {
  _id: string;
  ProductName: string;
  AvaliableQty:Number;
  Price: number;
  Image: string;
}


interface RentProduct {
  product: Product;
  quantity: number;
}

const AddRent: React.FC = () => {
  const [contact, setContact] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [getDate, setGetDate] = useState<Date>(new Date());
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<RentProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>("user/showproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    const selectedProduct = products.find((product) => product._id === selectedProductId);
    if (selectedProduct) {
      const newSelectedProduct: RentProduct = { product: selectedProduct, quantity };
      setSelectedProducts([...selectedProducts, newSelectedProduct]);
      setQuantity(0); 
    }
  };

  const handleSaveRent = async () => {
    try {
      const response = await axiosInstance.post("user/addrent", {
        contact,
        name,
        location,
        date,
        getDate,
        products: selectedProducts,
      });

      if (response.data === "ok") {
        toast.success("Rent added successfully");
      } else {
        toast.error("Error adding rent");
      }
    } catch (error) {
      toast.error("Error adding rent:", error.message);
    }
  };

  // Calculate total amount
  const totalAmount = selectedProducts.reduce((total, selectedProduct) => {
    return total + selectedProduct.product.Price * selectedProduct.quantity;
  }, 0);
  return (
    <div>
        <ToastContainer />
      <Typography variant="h5" gutterBottom>
        Add Rent
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => setContact(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Get Date"
            type="date"
            value={getDate.toISOString().split("T")[0]}
            onChange={(e) => setGetDate(new Date(e.target.value))}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select Product"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            fullWidth
            margin="normal"
          >
            {products.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={product.Image}
                    alt={product.ProductName}
                    style={{
                      marginRight: "10px",
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                  <span>
                    {product.ProductName} - ${product.Price}
                  </span>
                </div>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          {selectedProducts.map((selectedProduct, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                style={{ padding: "10px", marginBottom: "10px" }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    image={selectedProduct.product.Image}
                    alt={selectedProduct.product.ProductName}
                    style={{ height: 140 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      {selectedProduct.product.ProductName} - Quantity:{" "}
                      {selectedProduct.quantity}
                      {" "}{" "}price/Day :{selectedProduct.product.Price*selectedProduct.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography>Total amount rent per Day : {totalAmount}</Typography>
            <Button variant="contained" color="primary" onClick={handleSaveRent}>
              Save Rent 
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddRent;
