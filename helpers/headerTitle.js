import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

export default function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

  switch (routeName) {
    case 'Home':
      return 'Track my family'
    case 'News':
      return 'News in Saudi Arabia'
    case 'Schedule':
      return 'Hajj schedule'
    case 'Members':
      return 'My family members'
  }
}
