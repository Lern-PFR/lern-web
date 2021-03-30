import { useCallback, useState, useRef } from 'react';

export default () => {
	const [isShowing, setIsShowing] = useState(false);

	const showingRef = useRef();
	showingRef.current = isShowing;

	const toggle = useCallback(() => setIsShowing(!showingRef.current), [showingRef, setIsShowing]);

	return {
		isShowing,
		toggle,
	};
};
