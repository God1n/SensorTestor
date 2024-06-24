// custom hook for orientation change event

import {useEffect, useState} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

export default function useOrientation() {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'landscape'
      : 'portrait',
  );
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const callback = ({window: {width, height}}: {window: ScaledSize}) => {
      setOrientation(width > height ? 'landscape' : 'portrait');
      setDimensions({width, height} as ScaledSize);
    };

    const listner = Dimensions.addEventListener('change', callback);

    return () => {
      listner.remove();
    };
  }, []);

  return {orientation, dimensions};
}
