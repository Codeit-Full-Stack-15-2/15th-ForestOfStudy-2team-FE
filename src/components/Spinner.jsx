import { ClipLoader } from 'react-spinners';

function Spinner({ color = '#99c08e', size = '36px' }) {
  return <ClipLoader color={color} size={size} />;
}

export default Spinner;
