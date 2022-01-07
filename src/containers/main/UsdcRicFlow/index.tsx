import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import Price from 'components/common/Price';
import { useDispatch } from 'react-redux';
import { usdcRicStartFlow, usdcRicStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const UsdcRicFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [usdcRic, setUsdcRic] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcRic('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdcRic]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUsdcRic(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!usdcRic || Number(usdcRic) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcRicStartFlow(usdcRic, callback));
  }, [dispatch, usdcRic, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcRicStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://docs.ricochet.exchange/docs/network-directory"
          className={styles.link}
        >
          Ricochet (RIC) Launchpad
          <Price />
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
        value={usdcRic}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};
