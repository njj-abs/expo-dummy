import { NavigationContainer } from '@react-navigation/native';
import { Button, View, StyleSheet } from 'react-native';
import Location from './location';

const Components = (context) =>
	<View>
		<NavigationContainer>
			<Button title='Hello'></Button>
		</NavigationContainer>
		<Location { ...context }></Location>
	</View>

export default Components;
