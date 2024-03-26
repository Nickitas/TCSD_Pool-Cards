import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { Title } from '../../ui/Title';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

import cls from './index.module.scss';

export const data = [
  [
    "День",
    "Кол-во чел.",
    "Число посящений",
    "Срденее отклоненеи",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

export const options = {
  chart: {
    title: "Учет клиентов",
    subtitle: "кол-во людей от различных параметров",
  },
};


const Statistics = () => {


  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMess, setAlertMess] = useState('');

  return (
    <section className={cls.statistics}>
      <div className='container'>
        <div className={cls.frame}>
          <Title type='h1'>Статистика</Title>

          <div>
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;