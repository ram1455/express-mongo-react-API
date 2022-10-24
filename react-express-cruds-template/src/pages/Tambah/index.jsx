import Input from '../../components/Input';
import './index.scss';
import { useState } from 'react';
import axios from 'axios';

const ShowError = ({errors})=>{
  return  <ul style={{color:'red', marginLeft:'15px', marginBottom:'10px'}}>
            {
              errors.map( (error, index) => <li key={index} style={{color:'red'}}>{error}</li>)
            }
          </ul>
}

const Tambah = () => {
  let [name, setName] = useState('');
  let [price, setPrice] = useState('');
  let [stock, setStock] = useState('');
  let [status, setStatus] = useState(true);

  let [PriceErrors, setPriceErrors] = useState([]);
  let [StockErrors, setStockErrors] = useState([]);
  let [errors, setErrors] = useState([]);

  const saveItems = async (e) =>{
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
        await axios.post('http://localhost:3000/api/v4/product', {
          name, price, stock, status
        });
        alert('tambah data berhasil')
      } catch (error) {
        alert(error)
      }

      setName('');
      setPrice('');
      setStock('');
      setStatus(true);
      setPriceErrors([]);
      setStockErrors([]);
      setErrors([])
    }
  }



  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveItems}>
          <Input name="name" type="text" placeholder="Nama Produk..." value={name} onChange={e => setName(e.target.value)} label="Nama"/>
          {
            errors && <ShowError errors={errors}/>
          }
          <Input name="price" type="number" placeholder="Harga Produk..."  value={price} onChange={e => setPrice(e.target.value)} label="Harga"/>
          {
            PriceErrors && <ShowError errors={PriceErrors}/>
          }
          <Input name="Stock" type="number" placeholder="Stock Produk..."  value={stock} onChange={e => setStock(e.target.value)} label="Stock"/>
          {
            StockErrors && <ShowError errors={StockErrors}/>
          }
          <Input name="status" type="checkbox" label="Active" defaultChecked={status} onChange={e => setStatus(!status)}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )

}

export default Tambah;