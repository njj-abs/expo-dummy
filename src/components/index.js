import { NavigationContainer } from '@react-navigation/native';
import { Button, View } from 'react-native';
import DeepLinking from './DeepLinking';
import Location from './location';
import Notification from './notification';
import ShareButton from './ShareButton';

const Components = (context) =>
	<View>
		<NavigationContainer>
			<Button title='Hello'></Button>
		</NavigationContainer>
		<Notification { ...context}></Notification>
		<DeepLinking { ...context }></DeepLinking>
		<ShareButton></ShareButton>
		<Location { ...context }></Location>
	</View>

export default Components;
