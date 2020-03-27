import React from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {addToCart} from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  // const cart = useSelector(state => state.cart.cart);

  const renderItem = itemData => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        title={itemData.item.title}
        onViewDetail={() => {
          props.navigation.navigate('ProductDetail', {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          });
        }}
        onAddToCart={() => {
          dispatch(addToCart(itemData.item));
        }}
      />
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default ProductsOverviewScreen;
