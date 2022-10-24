import Input from "../../components/Input";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom'

const port = process.env.PORT || 3000

const ShowError = ({errors})=>{
  return  <ul style={{color:'red', marginLeft:'15px', marginBottom:'10px'}}>
            {
              errors.map( (error, index) => <li key={index} style={{color:'red'}}>{error}</li>)
            }
          </ul>
}
const Edit = () => {
  let [name, setName] = useState('');
  let [price, setPrice] = useState('');
  let [stock, setStock] = useState('');
  let [status, setStatus] = useState(true);
  const {id} = useParams()

  let [PriceErrors, setPriceErrors] = useState([]);
  let [StockErrors, setStockErrors] = useState([]);
  let [errors, setErrors] = useState([]);

  useEffect(() => {
    getDataById()
  }, [])  
  

  const getDataById = async () => {
    const response = await axios.get(`http://localhost:${port}/api/v4/product/${id}`);
    const theData = response.data;
    setName(theData.name);
    setPrice(theData.price);
    setStock(theData.stock);
    setStatus(theData.status);
  }

  const EditItems = async (e) =>{
    e.preventDefault();
    
    let message = []
    let Pricemessage = []
    let Stockmessage = []
    if (name.length === 0) {
      message = [...message, 'nama produk wajib diisi']
    }
    if (name.length < 3) {
      message = [...message, 'nama produk minimal 3 huruf']
    }
    if (name.length > 50 ) {
      message = [...message, 'nama produk maksimal hanya 50 huruf']
    }

    if (price < 1000) {
      Pricemessage = [...Pricemessage, 'harga produk minimal 1000']
    }
    if (price > 100000000) {
      Pricemessage = [...Pricemessage, 'harga produk maksimal 100000000']
    }

    if( stock.length === 0 ){
      Stockmessage = [...Stockmessage, 'stock wajib diisi']
    }

    if(message.length > 0 || Pricemessage.length > 0 || Stockmessage.length > 0){
      setErrors(message)
      setPriceErrors(Pricemessage)
      setStockErrors(Stockmessage)
    }
    else {
      try {
        await axios.put(`http://localhost:${port}/api/v4/product/${id}`, {
          name, price, stock, status
        });
        alert('edit data berhasil')
      } catch (error) {
        alert(error)
      }
    }
  }
  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={EditItems}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(e)=> setName(e.target.value)} />
          {
            errors && <ShowError errors={errors}/>
          }
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e)=> setPrice(e.target.value)}/>
          {
            PriceErrors && <ShowError errors={PriceErrors}/>
          }
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={(e)=> setStock(e.target.value)}/>
          {
            StockErrors && <ShowError errors={StockErrors}/>
          }
          <Input name="status" type="checkbox" label="Active" defaultChecked={status} onChange={(e)=> setStatus(e.target.value)}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;