import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Image } from 'react-native'
import { Avatar, Icon, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { fetchLogout } from '../stores/actions/user'

export default function TopNavBar () {
  const [menuVisible, setMenuVisible] = React.useState(false)
  const navigation = useNavigation()
  const { family, loading, error } = useSelector((state) => state.family)
  const { role } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('>>>> ini family:', family)
  }, [])

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
    dispatch(fetchLogout())
    navigation.navigate('Login')
  }

  const goToMyProfile = () => {
    navigation.navigate('EditProfile')
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
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
        <MenuItem
          accessoryLeft={ProfileIcon}
          title='My Profile'
          onPress={() => goToMyProfile()}
        />
        <MenuItem
          accessoryLeft={LogoutIcon}
          title='Logout'
          onPress={() => handleLogOut()} />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../assets/FamTrack_vector.png')}
      />
      {
        role === 'family' ? <Text {...props}>{family.name}'s family</Text> :
          <Text {...props}>Admin</Text>
      }
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

