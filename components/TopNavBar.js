import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Image } from 'react-native'
import { Avatar, Icon, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { fetchLogout } from '../stores/actions/user'

export default function TopNavBar ({ Login }) {
  const [menuVisible, setMenuVisible] = React.useState(false)
  const navigation = useNavigation()
  const { access_token, loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
  )

  const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline' />
  )

  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
  )

  const handleLogOut = () => {
    console.log('>>> logging out')
    dispatch(fetchLogout())
    // di sini hapus asyncstorage
    navigation.navigate('Login')
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={ProfileIcon} title='Profile' />
        <MenuItem 
          accessoryLeft={LogoutIcon} 
          title='Logout' 
          onPress={() => handleLogOut()}/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={{uri: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200'}}
      />
      <Text {...props}>Budi Doremi's family</Text>
    </View>
  )

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
})

