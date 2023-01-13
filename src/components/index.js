import { NavigationContainer } from '@react-navigation/native';
import { Button, View } from 'react-native';
import Location from './location';
import Notification from './notification';

const Components = (context) =>
	<View>
		<NavigationContainer>
			<Button title='Hello'></Button>
		</NavigationContainer>
		<Notification { ...context}></Notification>
		<Location { ...context }></Location>
	</View>

export default Components;
