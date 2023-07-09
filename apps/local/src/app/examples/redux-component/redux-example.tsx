import React, { FC } from 'react';

import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { decrement, increment } from './redux-example.state';
import './redux-example.scss';

interface ReduxComponentProps {
  test?: string;
}

const ReduxExample: FC<ReduxComponentProps> = () => {
  const counterValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter Value: {counterValue}</h2>
      <div className="button-wrapper">
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment by 5
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrement by 5
        </Button>
      </div>
    </div>
  );
};

export default ReduxExample;
