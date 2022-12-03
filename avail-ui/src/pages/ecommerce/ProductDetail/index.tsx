import React, { useEffect } from "react";
import ProductImageSlide from "./ProductImageSlide";
import { useDispatch, useSelector } from "react-redux";
import AppCard from "../../../@crema/core/AppCard";
import Header from "./Header";
import ProductView from "./ProductView/index";
import AppGridContainer from "../../../@crema/core/AppGridContainer";
import SimilarProduct from "./SimilarProduct";

import AppInfoView from "../../../@crema/core/AppInfoView";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { getProductDetail } from "../../../redux/actions";
import { AppState } from "../../../redux/store";
import { Params, useParams } from "react-router-dom";

const ProductDetail: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<Readonly<Params>>();
  const { currentProduct } = useSelector<AppState, AppState["ecommerce"]>(
    ({ ecommerce }) => ecommerce
  );
  useEffect(() => {
    dispatch(getProductDetail(+id! as number));
  }, [dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <AppGridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </AppGridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ProductDetail;
