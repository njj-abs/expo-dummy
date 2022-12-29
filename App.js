import React from 'react';
import { useState } from 'react';
import { Button, View } from 'react-native';
import Main from './src/index';

export default function App() {
	const [ state, setState ] = useState();

	const context = { state, setState };

	return (
		<View>
			<Main { ...context }></Main>
		</View>
	);
}
