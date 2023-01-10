import { NavigationContainer } from '@react-navigation/native';
import { Button, View, StyleSheet } from 'react-native';
import Location from './location';

const Components = () =>
	<View>
		<NavigationContainer>
			<Button title='Hello'></Button>
		</NavigationContainer>
		<Location></Location>
	</View>

export default Components;
