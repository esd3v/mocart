export const GetRandomColor = () => {
  const chars = '0123456789ABCDEF';
	let length = 6;
  let hex = '#';

	while(length--) {
		hex += chars[(Math.random() * 16) | 0];
  }

	return hex;
}
