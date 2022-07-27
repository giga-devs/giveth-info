import { useEffect, useState } from 'react';
import { brandColors } from '@giveth/ui-design-system';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { formatDate } from '@/utils/numbers';
import useRoundContext from '@/RoundContext';
import api from '@/api/instance';
import { SelectContainer, styles } from './styles';

export interface LabelType {
  value: {
    fromDate: string;
    toDate: string;
  };
  label: string;
}

export function RoundsFilter() {
  const [value, setValue] = useState([]);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setRound } = useRoundContext();

  useEffect(() => {
    api
      .get('/rounds')
      .then((response) => {
        setValue(response.data.rounds);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
        }
      });
  }, []);

  function treatLabel(item) {
    const newLabel = {
      value: {
        fromDate: item.fromDate,
        toDate: item.toDate,
      },
      label: `Round ${item.round} | ${formatDate(item.fromDate)} - ${formatDate(
        item.toDate
      )}`,
    };
    setLabels((prevLabels) => [...prevLabels, newLabel]);
  }

  useEffect(() => {
    setLabels([]);
    value.forEach(treatLabel);
  }, [value]);
  function handleRound(round) {
    if (round === null) {
      setRound({
        fromDate: '',
        toDate: '',
      });
    } else {
      setRound({
        fromDate: round.value.fromDate,
        toDate: round.value.toDate,
      });
    }
  }

  return (
    <SelectContainer>
      {isLoading && (
        <Skeleton
          height={38}
          width={344}
          borderRadius={8}
          highlightColor={brandColors.giv[600]}
          baseColor={brandColors.giv[700]}
        />
      )}
      {!isLoading && (
        <SelectContainer>
          <Select
            options={labels}
            onChange={(e) => handleRound(e)}
            placeholder="Select a round"
            id="long-value-select"
            instanceId="long-value-select"
            isClearable
            isSearchable={false}
            styles={styles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                neutral0: brandColors.giv[700],
                primary25: brandColors.giv[900],
                primary: brandColors.giv[900],
                neutral50: brandColors.deep[100],
              },
            })}
          />
        </SelectContainer>
      )}
    </SelectContainer>
  );
}
