import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { usdcMkrStartFlow, usdcMkrStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const UsdcMkrFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [usdcMkr, setUsdcMkr] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcMkr('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdcMkr]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUsdcMkr(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!usdcMkr || Number(usdcMkr) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcMkrStartFlow(usdcMkr, callback));
  }, [dispatch, usdcMkr, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcMkrStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0x47de4Fd666373Ca4A793e2E0e7F995Ea7D3c9A29"
          className={styles.link}
        >
          {'USDC >> MKR'}
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
        value={usdcMkr}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};
