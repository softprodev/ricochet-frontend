import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { usdcMaticStartFlow, usdcMaticStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const UsdcMaticFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [usdcMatic, setUsdcMatic] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcMatic('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdcMatic]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUsdcMatic(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!usdcMatic || Number(usdcMatic) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcMaticStartFlow(usdcMatic, callback));
  }, [dispatch, usdcMatic, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcMaticStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://docs.ricochet.exchange/docs/network-directory"
          className={styles.link}
        >
          {'USDC >> MATIC'}
          <span className={styles.badge}>🚰</span>
        </a>
      )}
      isLoading={isLoading}
    >
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="USDCx"
        value={usdcMatic}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};
