import TouchableScale from 'react-native-touchable-scale';
import * as React from 'react';

interface TouchableScaleViewProps extends React.ComponentPropsWithoutRef<typeof TouchableScale> {}

const TouchableScaleView: React.FC<TouchableScaleViewProps> = (props: TouchableScaleViewProps) => {
  return (
    <TouchableScale activeScale={0.92} friction={10} tension={10} {...props}>
      {props.children}
    </TouchableScale>
  );
};
export default TouchableScaleView;
