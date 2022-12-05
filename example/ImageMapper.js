import styles from './Home.module.sass';

import { useEffect, useState } from 'react';
import ImageMapper from 'react-image-mapper';

export default function Home({ tab, ...props }) {
	const [widthMap, setWitdhMap] = useState<number>(0);

	const areas = [
		{ id: 10, shape: 'circle', coords: [310, 240, 130] },
		{ id: 1, shape: 'circle', coords: [1410, 220, 120] },
		{ id: 2, shape: 'circle', coords: [380, 630, 150] },
		{ id: 6, shape: 'circle', coords: [210, 480, 110] },
		{ id: 9, shape: 'circle', coords: [540, 420, 110] },
		{ id: 5, shape: 'circle', coords: [840, 370, 130] },
		{ id: 7, shape: 'circle', coords: [810, 640, 150] },
		{ id: 8, shape: 'circle', coords: [1090, 420, 110] },
		{ id: 4, shape: 'circle', coords: [1360, 410, 80] },
		{ id: 3, shape: 'circle', coords: [1350, 600, 220] },
	];

	const [mapAreas, setMapAreas] = useState({
		name: 'homeMap',
		areas: areas,
	});

	const ratio = 1.97;
	let responseRatio = 1;

	function widthSet(e) {
		setWitdhMap(e.target.innerWidth);

		responseRatio = window.innerWidth / window.innerHeight / ratio;

		const copyArr = [];

		for (let i = 0; i < areas.length; i++) {
			const item = areas[i];

			const copy = Object.assign({}, item);
			copy.coords = [item.coords[0], item.coords[1] / responseRatio, item.coords[2]];
			copyArr.push(copy);
		}

		setMapAreas({
			name: 'homeMap',
			areas: copyArr,
		});
	}

	useEffect(() => {
		responseRatio = window.innerWidth / window.innerHeight / ratio;

		const copyArr = [];

		for (let i = 0; i < areas.length; i++) {
			const item = areas[i];

			const copy = Object.assign({}, item);
			copy.coords = [item.coords[0], item.coords[1] / responseRatio, item.coords[2]];
			copyArr.push(copy);
		}

		setMapAreas({
			name: 'homeMap',
			areas: copyArr,
		});
	}, []);

	useEffect(() => {
		setWitdhMap(window.innerWidth);

		window.addEventListener('resize', (e) => widthSet(e));

		return () => {
			window.addEventListener('resize', (e) => widthSet(e));
		};
	}, []);

	return (
		<div className={styles.containerMap} {...props}>
			<ImageMapper
				src={'/images/homeMap.webp'}
				map={mapAreas}
				width={widthMap}
				imgWidth={1700}
				onClick={(area) => {
					tab(area.id);
				}}
				active={false}
			/>
		</div>
	);
}
