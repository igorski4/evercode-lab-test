import * as d3 from "d3";
import { useRef, useEffect } from "react";

export const LinePlot = ({ data, width = 912, height = 570, timePeriod }) => {
  const volume = data.Data.map((el) => el.volume);
  const time = data.Data.map((el) => el.time * 1000);

  const gx = useRef();
  const gy = useRef();

  const x = d3.scaleTime(d3.extent(time), [100, width - 100]);
  const y = d3.scaleLinear(d3.extent(volume), [height - 20, 20]);
  const line = d3.line(
    (d) => x(d.time*1000),
    (d) => y(d.volume)
  );


  useEffect(
    () =>
      void d3.select(gx.current).call(
        d3
          .axisBottom(x)
          .tickFormat(d3.timeFormat("%b/%d/%y"))
          .ticks(timePeriod > 12 ? 7 : timePeriod)
      ),
    [gx, x]
  );

  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - 20})`} />
      <g ref={gy} transform={`translate(${100},0)`} />
      <path fill="none" stroke="black" strokeWidth="1.5" d={line(data.Data)} />
    </svg>
  );
};
