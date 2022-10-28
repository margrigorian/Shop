import React, { useState, useEffect } from 'react';
import style from "./ProductPage.module.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from '../../store/slices/slice-products';
import { add } from '../../store/slices/slice-products';
import { addToBasket } from '../../store/slices/slice-basket';
import { selectBasket } from '../../store/slices/slice-basket';
import { NavLink } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Reviews from '../../components/reviews/Reviews';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import request from '../../store/request/request';
import { currentProductLink } from '../../store/request/link';
import { addRemoveProductLink } from '../../store/request/link';
import { rateLink } from '../../store/request/link';

export default function ProductPage({openBasketNavBar}) {
  const [product, setProduct] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const allProducts = useSelector(selectProducts);
  const basketProducts = useSelector(selectBasket);
  const basketProduct = basketProducts.basket.products.find(item => item.id === product.id);
  // ДЛЯ ЗАПРОШЕННОГО МАССИВА
  // const [productIndex, setProductIndex]= useState(null);

  useEffect(() => {
    if(id.length === 1) {
      const currentProduct = allProducts.massimoProducts.find(item => item.id === +id);
      // const currentProductIndex = allProducts.massimoProducts.findIndex((item, i) => item.id === currentProduct.id)
      setProduct(currentProduct);
      // setProductIndex(currentProductIndex);
    }else{
      async function getProduct() {
        const product = await request("GET", currentProductLink(id), undefined, basketProducts.token);
        if(product.data.data.reactions.yourReaction === "like") {
          setProduct(product.data.data);
          setLike(true);
        }else if (product.data.data.reactions.yourReaction === "dislike") {
          setProduct(product.data.data);
          setDislike(true);
        }else {
          setProduct(product.data.data);
        }
      }

      getProduct();
    }

  }, [id, allProducts, basketProducts.token])

  console.log(product);

  async function addProducts(productId) {
    const add = await request("POST", addRemoveProductLink, {"product_id": productId}, basketProducts.token);
    console.log(add);
  }

  async function sendRaiting(yourRate, action) {
    const rate = await request("POST", rateLink, {"product_id": product.id, "type": yourRate, "action": action}, basketProducts.token);
    console.log(rate);
  }
  
  return (
    <div className={style.container}>
      <div className={style.navigate}>
        <NavLink to={"/"} className={`${style.buttonBack} ${style.hover}`}>
          <p>Back</p>
        </NavLink>

        <div className={style.arrows}>
          <NavLink 
            to={`/product/${product.id !== 1 ? product.id - 1 : product.id}`} 
            // to={`/product/${product.id.length === 1 ? (product.id !== 1 ? product.id - 1 : product.id) : ...}`} 
            // ДЛЯ РАБОТЫ С ЗАПРОШЕННЫМ МАССИВОМ
            // to={`/product/${productIndex !== 0 ? productIndex - 1 : productIndex}`} 
            style={{color: "rgb(52, 51, 51)"}}
          >
            <button disabled={product.id === 1 ? "disabled" : undefined} className={style.arrowButton}> 
              <KeyboardArrowLeftIcon className={`${style.leftArrows} ${style.hover}`} />
            </button>
          </NavLink>
          <NavLink 
            to={`/product/${product.id !== allProducts.massimoProducts.length ? product.id + 1 : product.id}`}
            style={{color: "rgb(52, 51, 51)"}}
          >
            <button 
              disabled={product.id === allProducts.massimoProducts.length ? "disabled" : undefined} 
              className={style.arrowButton}
            > 
              <KeyboardArrowRightIcon className={style.hover}/>
            </button>
          </NavLink>
        </div>
      </div>

      <div className={style.contentContainer}>
        <div className={style.imageContainer}>
          <div style={{backgroundImage: `url(${product.src})`}} className={style.productImage}></div>
          <div style={{backgroundImage: `url(${product.src})`}} className={style.productImage}></div>
        </div>

        <div className={style.productInfo}>
          <div className={style.titleContainer}>
            <p className={style.title}>{product.title}</p>
            <div className={style.priceContainer}>
              <p className={style.price}>{product.price} AMD</p>
            </div>
          </div>

          <div className={style.gradeContainer}>
            <div className={style.grade}>
                <StarIcon sx={{fontSize: "18px", marginRight: "4px"}} />
                <p>0</p>
                <FiberManualRecordIcon sx={{fontSize: "5px", margin: "0 20px"}} />
                <AnchorLink href='#review' style={{color: "grey", textDecoration: "none"}}>
                  <p className={style.reviewText}>
                      {product.comments ? product.comments.length : 0} 
                      <span style={{fontSize: "13px"}}> reviews</span>
                  </p>
                </AnchorLink>
            </div>

            {
              like ? 
                <div className={style.likeCountContainer}>
                  <p className={style.likeCount}>{product.reactions ? +product.reactions.likes + 1 : 0}</p>
                  <ThumbUpIcon 
                    sx={{color: "rgb(52, 51, 51)", fontSize: "18px", cursor: "pointer"}} 
                    onClick={() => {
                      setLike(false);
                      if(typeof product.id !== "number") {
                        sendRaiting("like", "add");
                      }
                    }}
                  /> 
                </div> :
                <div className={style.likeCountContainer}>
                  <p className={style.likeCount}>{product.reactions ? product.reactions.likes : 0}</p>
                  <ThumbUpOffAltIcon 
                    sx={{fontSize: "18px", cursor: "pointer"}} 
                    onClick={() => {
                      setLike(true);
                      setDislike(false);
                      if(typeof product.id !== "number") {
                        sendRaiting("like", "remove");
                      }
                    }}
                  />
                </div>
            }

            {
              dislike ? 
                <div className={style.dislikeCountContainer}>
                    <p className={style.likeCount}>{product.reactions ? +product.reactions.dislikes + 1 : 0}</p>
                    <ThumbDownIcon 
                      sx={{color: "rgb(52, 51, 51)", fontSize: "18px", cursor: "pointer"}} 
                      onClick={() => {
                        setDislike(false);
                        if(typeof product.id !== "number") {
                          sendRaiting("dislike", "add");
                        }
                      }}
                    /> 
                </div> : 
                <div className={style.dislikeCountContainer}>
                  <p className={style.likeCount}>{product.reactions ? product.reactions.dislikes : 0}</p>
                  <ThumbDownOffAltIcon 
                    sx={{fontSize: "18px", cursor: "pointer"}} 
                    onClick={() => {
                      setDislike(true);
                      setLike(false);
                      if(typeof product.id !== "number") {
                        sendRaiting("dislike", "remove");
                      } 
                    }}
                  />
                </div>
            }
              
            {/* <p className={style.rateText}>Rate</p> */}
          </div>

          <div className={style.sizeContainer}>
            <p className={style.sizeText}>Size</p>
            <ul className={style.sizeList}>
              <li>XS</li>
              <li >S</li>
              <li>M</li>
              <li>L</li>
              <li>XL</li>
            </ul>
          </div>

          <div className={style.guideContainer}>
            <div className={`${style.sizeGuideTextContainer} ${style.guideHover}`}>
              <CheckroomIcon sx={{fontSize: "20px"}} />
              <p className={style.sizeGuideText}>Size guide</p>
            </div>
            <BookmarkBorderOutlinedIcon sx={{fontSize: "20px"}} className={style.hover} />
          </div>

          <button 
            className={!basketProduct ? style.button : `${style.button} ${style.addButton}`}
            onClick={() => {
              if(typeof product.id === "number") { // В СЛУЧАЕ MASSIMOPRODUCTS
                dispatch(add(product.id));
                dispatch(addToBasket(product));
              }else {
                addProducts(product.id);
                dispatch(addToBasket(product));
              }
            }}
          >
            Add to basket
          </button>

          {
            basketProduct && 
              <NavLink to="/basket">
                <button 
                  className={`${style.button} ${style.orderButton}`}
                  onClick={() => openBasketNavBar(true)}
                >
                  Process order
                </button>
              </NavLink>
          }

          <div className={`${style.storeAvailabilityContainer} ${style.guideHover}`}>
            <RoomOutlinedIcon sx={{fontSize: "20px"}} />
            <p className={style.storeAvailabilityText}>In-store availability</p>
          </div>
        </div>
      </div>

      <section id="review">
        <Reviews product={product} />
      </section>
    </div>
  )
}
