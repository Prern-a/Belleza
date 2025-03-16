import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/pages/AddProducts.css';
import productNull from '../assets/admin/productNull.png';
import { storage, db } from '../database/storageConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, getDoc, doc, updateDoc } from 'firebase/firestore';

function AddProducts(){
    const [productImg, setProductImg] = useState(productNull);
    const [productImg1, setProductImg1] = useState(productNull);
    const [productImg2, setProductImg2] = useState(productNull);

    const [prodImage, setProdImage] = useState(productNull);
    const [prodImage1, setProdImage1] = useState(productNull);
    const [prodImage2, setProdImage2] = useState(productNull);

    const [prodName, setProdName] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodItem, setProdItem] = useState(0);
    const [prodCateg, setProdCateg] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [fav, setFav] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(event.target.files[0]){
          setProdImage(event.target.files[0]);
          console.log(prodImage.name);
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductImg(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        if(event.target.files[0]){
          setProdImage1(event.target.files[0]);
          console.log(prodImage1.name);
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductImg1(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        if(event.target.files[0]){
          setProdImage2(event.target.files[0]);
          console.log(prodImage2.name);
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductImg2(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      
      const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        let tempDiv = document.getElementById('AdminAddProductDetailsDiv');
        tempDiv.style.opacity = 0.1;

        const storageRef = ref(storage, `images/${prodImage.name}`);
        const storageRef1 = ref(storage, `images/${prodImage1.name}`);
        const storageRef2 = ref(storage, `images/${prodImage2.name}`);

        try {
          const snapshot = await uploadBytes(storageRef, prodImage);
          const downloadURL = await getDownloadURL(snapshot.ref);

          const snapshot1 = await uploadBytes(storageRef1, prodImage1);
          const downloadURL1 = await getDownloadURL(snapshot1.ref);

          const snapshot2 = await uploadBytes(storageRef2, prodImage2);
          const downloadURL2 = await getDownloadURL(snapshot2.ref);

          const tempRef = doc(db, "products", "00000");
          const docSnap1 = await getDoc(tempRef);
          const data = docSnap1.data();
          
          let val;

          if(prodCateg === 'cleansers&mists'){
            val = data.cleanserCount + 1;
            await updateDoc(tempRef, {
              cleanserCount: val
            }
          )
          }
          else if(prodCateg === 'moists'){
            val = data.moistCount + 1;
            await updateDoc(tempRef, {
              moistCount: val
            }
          )
          }
          else if(prodCateg === 'serums&essences'){
            val = data.serumCount + 1;
            await updateDoc(tempRef, {
              serumCount: val
            }
          )
          }
          else if(prodCateg === 'sunscreens'){
            val = data.sunscreenCount + 1;
            await updateDoc(tempRef, {
              sunscreenCount: val
            }
          )
          }
          else if(prodCateg === 'toners'){
            val = data.tonerCount + 1;
            await updateDoc(tempRef, {
              tonerCount: val
            }
          )
          } 
    
          await setDoc(doc(db, "products", prodItem.toString()), {
            imgURL: downloadURL,
            extra1URL: downloadURL1,
            extra2URL: downloadURL2,
            name: prodName,
            description: prodDesc,
            price: prodPrice,
            category: prodCateg,
            itemNumber: prodItem,
            bellezaFav: fav
          });
          setLoading(false);
          alert("Product Added Successfully!");
          tempDiv.style.opacity = 1;

          window.location.reload();
        } 
        catch (error) {
          console.error("Error uploading image: ", error);
          alert("Failed to upload image.");
        }
      };

      const loaderStyle = {
        position: "absolute",
        top: "35%",
        left: "68%",
        border: '16px solid #f3f3f3', 
        borderTop: '16px solid #171717',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 2s linear infinite',
        margin: '20px auto',
        boxShadow: '0px 0px 30px 20px rgb(0, 0, 0, 0.25)',
        backgroundColor: 'rgb(0, 0, 0, 0.25)'
      };

    const handleDropdownChange = async(event) => {
        const selectedVal = event.target.value;
        setProdCateg(selectedVal);

        const docRef = doc(db, "products", "00000");
        const docSnap = await getDoc(docRef);

        if(docSnap.exists){
          const data = docSnap.data();

          if(selectedVal === 'cleansers&mists'){
            let val = data.cleanserCount + 1 + 1000;
            setProdItem(val);
          }
          else if(selectedVal === 'moists'){
            let val = data.moistCount + 1 + 2000;
            setProdItem(val);
          }
          else if(selectedVal === 'serums&essences'){
            let val = data.serumCount + 1 + 3000;
            setProdItem(val);
          }
          else if(selectedVal === 'sunscreens'){
            let val = data.sunscreenCount + 1 + 4000;
            setProdItem(val);
          }
          else if(selectedVal === 'toners'){
            let val = data.tonerCount + 1 + 5000;
            setProdItem(val);
          }
        }
    }

    return(
        <div style={{position: "relative", height: "127vh"}}>
        <Navbar />
        <form onSubmit={handleSubmit}>
          <div style={{display: "flex"}}>
              <div id="AdminAddImageDiv">
                  <img src={productImg} id="ProductNull" alt="Product Null"/>
                  <input type="file" name="Product Image" id="AdminImageSelect" onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg"/>
                  <h1 id="UploadProductImage">Upload Product Image</h1>
                  <h1 id="AddImagePlus">+</h1>

                  <div style={{display: "flex", position: "absolute", left: "-35%", top: "100%"}}>

                  <img src={productImg1} id="ProductNull1" alt="Product Null"/>
                  <input type="file" name="Product Image" id="AdminImageSelect1" onChange={handleImageChange1} accept="image/png, image/jpeg, image/jpg"/>
                  <h1 id="UploadProductImage1">Upload Product Extra</h1>
                  <h1 id="AddImagePlus1">+</h1>

                  <img src={productImg2} id="ProductNull2" alt="Product Null"/>
                  <input type="file" name="Product Image" id="AdminImageSelect2" onChange={handleImageChange2} accept="image/png, image/jpeg, image/jpg"/>
                  <h1 id="UploadProductImage2">Upload Product Extra</h1>
                  <h1 id="AddImagePlus2">+</h1>
                  </div>
              </div>
              <div id="AdminAddProductDetailsDiv">
                  <h1 id="AddProductDetailsHeader">Add Product Details</h1>
                  
                  <p id="AddProductDetailsNameLabel">Product Name</p>
                  <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="Enter Product Name..." id="AddProductDetailsName"/>

                  <p id="AddProductDetailsDescLabel">Product Description</p>
                  <textarea value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} placeholder="Enter Product Description..." rows={5} id="AddProductDetailsDesc"/>

                  <p id="AddProductDetailsItemLabel">Product Item Number</p>
                  <input type="text" value={prodItem} onChange={(e) => setProdItem(e.target.value)} placeholder="Retrieving Item Number..." id="AddProductDetailsItem" disabled/>

                  <p id="AddProductDetailsCatLabel">Product Category</p>
                  <select id="CategorySelect" size="1" value={prodCateg} onChange={handleDropdownChange}>
                    <option value="cleansers&mists">Cleansers & Mists</option>
                    <option value="moists">Moisturizers</option>
                    <option value="serums&essences">Serums & Essences</option>
                    <option value="sunscreens">Sunscreens</option>
                    <option value="toners">Toners</option>
                  </select>

                  <p id="AddProductDetailsPriceLabel">Product Price</p>
                  <input type="text" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} placeholder="Enter Product Price...                                                                                                                               ₹" id="AddProductDetailsPrice"/>
                  
                  <div style={{display: "flex", marginTop: "2%"}}>
                    <p id="BelleZaFavQues">BelleZa Favorite?</p>
                    <select id="BelleZaFavSelect" size="1" value={fav} onChange={(e) => setFav(e.target.value)}>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <button id="AddProductButton" type="submit">Add Product</button>
              </div>
              {loading && <div style={loaderStyle}></div>}
          </div>
        </form>
        <Footer />
        </div>
    )
}

export default AddProducts;