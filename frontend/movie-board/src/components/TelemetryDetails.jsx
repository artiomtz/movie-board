import React, { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import IconApp from "../assets/iconApp.png";
import iconIpdata from "../assets/iconIpdata.jpg";
import { motion } from "framer-motion";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";

export default function TelemetryDetails() {
  const { telemetry, getTelemetry } = useContext(ContextPage);

  const iconStyle = {
    objectFit: "contain",
    height: "100px",
    width: "100%",
  };

  const iconTelemetryStyle = {
    opacity: "0.3",
    height: "50px",
    borderRadius: "10px",
  };

  const bigTitleStyle = {
    fontWeight: "bold",
    fontSize: "30px",
  };

  const tooltipStyle = {
    background: "grey",
    padding: "10px",
    textAlign: "left",
  };

  const tooltipImageStyle = {
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "3px",
  };

  const transformData = (data) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    const counts = {};

    data.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= currentDate) {
        const dateString = entryDate.toISOString().split("T")[0];
        counts[dateString] = (counts[dateString] || 0) + 1;
      }
    });

    const last30Days = [];
    for (
      let date = currentDate;
      date <= new Date();
      date.setDate(date.getDate() + 1)
    ) {
      last30Days.push(date.toISOString().split("T")[0]);
    }

    const transformedTelemetry = last30Days.map((date) => {
      const matchingEntries = data.filter((entry) => entry.date === date);
      const entries = matchingEntries.map((entry) => ({
        count: 1,
        flag: entry.country_flag,
        city: entry.city,
        country: entry.country_name,
      }));

      return {
        date,
        totalCount: counts[date] || 0,
        entries,
      };
    });
    return transformedTelemetry;
  };

  const transformedTelemetry = transformData(telemetry);

  const setTooltip = (payload) => {
    if (!payload || payload.length === 0) {
      return null;
    }

    const cityAggregatedEntries = new Map();
    payload.forEach((entry) => {
      entry.payload.entries.forEach((cityEntry) => {
        const { city, flag, country, count } = cityEntry;

        if (cityAggregatedEntries.has(city)) {
          const existingEntry = cityAggregatedEntries.get(city);
          existingEntry.count += count;
        } else {
          cityAggregatedEntries.set(city, {
            city,
            country,
            flag,
            count,
          });
        }
      });
    });

    const aggregatedEntriesArray = Array.from(
      cityAggregatedEntries.values()
    ).sort((a, b) => {
      const countryA = a.country.toLowerCase();
      const countryB = b.country.toLowerCase();
      if (countryA < countryB) return -1;
      if (countryA > countryB) return 1;
      return 0;
    });

    return (
      <div style={tooltipStyle}>
        {aggregatedEntriesArray.length === 0 && "No Visits"}
        {aggregatedEntriesArray.map((cityEntry, cityIndex) => (
          <div key={cityIndex}>
            {cityEntry.count}
            {" from "}
            <img
              src={cityEntry.flag}
              width={30}
              style={tooltipImageStyle}
            />{" "}
            {cityEntry.city}, {cityEntry.country}
          </div>
        ))}
      </div>
    );
  };

  const setChartWidth = (bar) => {
    if (bar) {
      if (window.innerHeight < window.innerWidth) {
        return window.innerWidth > 2000
          ? window.innerWidth * 0.4
          : window.innerWidth * 0.5;
      } else {
        return window.innerWidth * 0.6;
      }
    } else {
      return window.innerHeight < window.innerWidth ? 16 : 7;
    }
  };

  useEffect(() => {
    getTelemetry();
    setChartWidth();
  }, []);

  return (
    <div className="container text-center min-vh-100">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row p-3 pb-4 align-items-center">
          <div className="pb-4">
            <a href="/">
              <img style={iconStyle} src={IconApp} alt="Home" />
            </a>
          </div>
          <div className="p-4" style={bigTitleStyle}>
            Website Visits In The Last Month
          </div>
        </div>
      </motion.div>

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row p-4 justify-content-center shadow">
          <div className="row p-4 m-0 col-12 justify-content-center shadow">
            <BarChart
              width={setChartWidth(true)}
              height={400}
              data={transformedTelemetry}
            >
              <XAxis
                dataKey="date"
                tickCount={4}
                interval={7}
                tickMargin={15}
                tick={{ textAnchor: "middle", fontSize: setChartWidth(false) }}
              />
              <YAxis
                domain={[0, 3]}
                allowDecimals={false}
                label={{
                  value: "Visits",
                  angle: -90,
                  position: "insideLeft",
                }}
                tickFormatter={(tick) => (tick === 0 ? "" : tick)}
                tickMargin={10}
              />
              <Tooltip content={({ payload }) => setTooltip(payload)} />
              <Bar dataKey="totalCount" fill="#8884d8" barSize={20}>
                {transformedTelemetry.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
        <div className="p-3 mt-5">
          <a href="https://ipdata.co/" target="_blank" rel="external">
            <img style={iconTelemetryStyle} src={iconIpdata} alt="ipdata" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
