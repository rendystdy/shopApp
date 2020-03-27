import React from 'react';
import {Platform, View, SafeAreaView, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

const defaultScreenOptions = {
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const HeaderButtonCart = navigation => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
    </HeaderButtons>
  );
};

// const HeaderButtonDrawer = navigation => {
//   return (
//     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//       <Item
//         title="Menu"
//         iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//         onPress={() => {
//           console.log(navigation);
//           navigation.toggleDrawer();
//         }}
//       />
//     </HeaderButtons>
//   );
// };

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({route, navigation}) => {
          return {
            headerTitle: 'All Products',
            headerRight: HeaderButtonCart.bind(this, navigation),
            // headerLeft: HeaderButtonDrawer.bind(this, navigation),
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({route}) => {
          return {
            headerTitle: route.params?.productTitle,
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={({route}) => {
          return {
            headerTitle: route.params?.productTitle,
          };
        }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={({route, navigation}) => {
          return {
            headerTitle: 'Orders',
          };
        }}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
    <ShopDrawerNavigator.Navigator>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
      />
      <ShopDrawerNavigator.Screen name="Orders" component={OrdersNavigator} />
    </ShopDrawerNavigator.Navigator>
  );
};
