import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import s from "./App.module.scss";
import { Button } from "../ui/Button/Button";
import { Select } from "../ui/Select/Select";
import { LinePlot } from "../components/LinePlot";

export const App = () => {
  const [coins, setCoins] = useState([]);
  const [hourlyExchangeVolume, setHourlyExchangeVolume] = useState([]);
  const [timePeriod, setTimePeriod] = useState(1);
  const [selectCoin, setSelectedCoin] = useState("BTC");

  

  const fetchCoins = async () => {
    setCoins(
      (
        await axios.get(
          "https://min-api.cryptocompare.com/data/blockchain/list?api_key=03eb201bfdec57c906ba94138b42cb79c50b4f72e5e2e0b703a4bbfe30fcd7fc"
        )
      ).data.Data
    );
  };

  const fetchHourlyExchangeVolume = async () => {
    setHourlyExchangeVolume(
      (
        await axios.get(
          `https://min-api.cryptocompare.com/data/exchange/histohour?tsym=${selectCoin}&limit=${
            timePeriod * 24
          }&api_key=03eb201bfdec57c906ba94138b42cb79c50b4f72e5e2e0b703a4bbfe30fcd7fc`
        )
      ).data
    );
  };

  useEffect(() => {
    fetchCoins();
    fetchHourlyExchangeVolume();
  }, []);

  useEffect(() => {
    fetchHourlyExchangeVolume();
  }, [selectCoin, timePeriod]);

  const handleChangeTipePeriod = (time) => {
    setTimePeriod(time);
    fetchHourlyExchangeVolume();
  };

  const handleChangeSelect = (e) => {
    setSelectedCoin(e.target.value);
    fetchHourlyExchangeVolume();
  };

  const handleRefresh = () => {
    fetchHourlyExchangeVolume();
  };

  return (
    <div className={s.container}>
      <div className={s.header_wrapper}>
        <div className={s.buttons_wrapper}>
          <Button onClick={() => handleChangeTipePeriod(1)}>Day</Button>
          <Button onClick={() => handleChangeTipePeriod(3)}>3 Days</Button>
          <Button onClick={() => handleChangeTipePeriod(7)}>Week</Button>
          <Button onClick={() => handleChangeTipePeriod(30)}>Month</Button>
        </div>
        <Button onClick={handleRefresh}>Refresh</Button>
        <Select
          options={Object.keys(coins)}
          value={selectCoin}
          onChange={(e) => handleChangeSelect(e)}
        />
      </div>

      <div className={s.plot_wrapper}>
        {hourlyExchangeVolume.Data?.length ? (
          <LinePlot data={hourlyExchangeVolume} timePeriod={timePeriod} />
        ) : (
          <p className={s.text_error}>
            <span className={s.text_error_contrast}>{selectCoin} </span>
            has not been exchanged in the last
            <span className={s.text_error_contrast}>
              {" "}
              {timePeriod} {timePeriod === 1 ? "day" : "days"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
