import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });
  const dispatch = useDispatch();

  const renderItem = itemData => {
    return (
      <CartItem
        title={itemData.item.productTitle}
        quantity={itemData.item.quantity}
        amount={itemData.item.sum}
        onRemove={() => {
          dispatch(removeFromCart(itemData.item.productId));
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          disabled={cartItems.length === 0}
          title="Order Now"
          onPress={() => dispatch(addOrder(cartItems, cartTotalAmount))}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={renderItem}
        // contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    flex: 1,
  },
  // listContainer: {
  //   // flexGrow: 1,
  //   width: '100%',
  // },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowOpacity: 0.26,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
