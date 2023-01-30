import 'expo-dev-client';
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Main from './src/index';

export default function App() {
	const [state, setState] = useState({
		location: {
			data: 'loading',
			error: ''
		},
	});

	const context = { state, setState };

	return (
		<View>
			<Main {...context}></Main>
		</View>
	);
}
