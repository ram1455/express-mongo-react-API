import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useParams  } from "react-router-dom";
import './index.scss';

const port = process.env.PORT || 3000

const Detail = () => {
  let [edi, setEdi] = useState('')
  let [name, setName] = useState('')
  let [price, setPrice] = useState('')
  let [stock, setStock] = useState('')

  useEffect(() => {
    getDataById()
  }, [])
  
  
  const {id} = useParams();

  const getDataById =  async()=> {
      const response = await axios.get(`http://localhost:${port}/api/v4/product/${id}`);
      let theData = response.data
      setName(theData.name)
      setEdi(theData._id)
      setPrice(theData.price)
      setStock(theData.stock)
  }

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {edi}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;