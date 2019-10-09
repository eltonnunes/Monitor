import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import randomColor from "randomcolor";
import moment from "moment";
import faker from "faker";

import "./styles.css";
moment.locale("pt-BR");
const groups = [
  { id: 1, title: "CABANA BURGER" },
  { id: 2, title: "REDE JAGUAR" },
  { id: 3, title: "REDE 90" },
  { id: 4, title: "POSTOS PRESIDENTE" },
  { id: 5, title: "MIX BAHIA" },
  { id: 6, title: "PETROX" }
];

let randomSeed = Math.floor(Math.random() * 1000);
const daysInPast = 10;
const startDate =
  faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000;

const items = [
  {
    id: 1,
    group: 1,
    title: "1 - iCard - Carga de Venda",
    start_time: moment().add(-3, "hour"),
    end_time: moment().add(1, "hour"),
    className: "item-weekend",
    /*className:
      moment(startDate).day() === 6 || moment(startDate).day() === 0
        ? "item-weekend"
        : "",*/
    bgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 0.6
    }),
    selectedBgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 1
    }),
    color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  },

  {
    id: 4,
    group: 1,
    title: "2 - iCard - Carga de Venda",
    start_time: moment().add(-2, "hour"),
    end_time: moment().add(2, "hour"),
    className: "item-weekend",
    /*className:
      moment(startDate).day() === 6 || moment(startDate).day() === 0
        ? "item-weekend"
        : "",*/
    bgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 0.6
    }),
    selectedBgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 1
    }),
    color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  },

  {
    id: 5,
    group: 1,
    title: "2 - iCard - Carga de Venda",
    start_time: moment().add(-1, "hour"),
    end_time: moment().add(3, "hour"),
    className: "item-weekend",
    /*className:
      moment(startDate).day() === 6 || moment(startDate).day() === 0
        ? "item-weekend"
        : "",*/
    bgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 0.6
    }),
    selectedBgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 1
    }),
    color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  },

  // {
  //   id: 15,
  //   group: 1,
  //   title: "iCard - Carga de Venda",
  //   start_time: moment().add(-6, "hour"),
  //   end_time: moment().add(1, "hour"),
  //   className: "item-weekend",
  //   /*className:
  //   moment(startDate).day() === 6 || moment(startDate).day() === 0
  //     ? "item-weekend"
  //     : "",*/
  //   bgColor: randomColor({
  //     luminosity: "light",
  //     seed: randomSeed + 1,
  //     format: "rgba",
  //     alpha: 0.6
  //   }),
  //   selectedBgColor: randomColor({
  //     luminosity: "light",
  //     seed: randomSeed + 1,
  //     format: "rgba",
  //     alpha: 1
  //   }),
  //   color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  // },
  {
    id: 2,
    group: 2,
    title: "iCard - Carga de Venda",
    start_time: moment().add(-6.5, "hour"),
    end_time: moment().add(1.5, "hour"),
    className:
      moment(startDate).day() === 6 || moment(startDate).day() === 0
        ? "item-weekend"
        : "",
    bgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 0.6
    }),
    selectedBgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 1
    }),
    color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  },
  {
    id: 3,
    group: 4,
    title: "iCard - Carga de Venda",
    start_time: moment().add(-9, "hour"),
    end_time: moment().add(10, "hour"),
    className:
      moment(startDate).day() === 9 || moment(startDate).day() === 0
        ? "item-weekend"
        : "",
    bgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 0.6
    }),
    selectedBgColor: randomColor({
      luminosity: "light",
      seed: randomSeed + 1,
      format: "rgba",
      alpha: 1
    }),
    color: randomColor({ luminosity: "dark", seed: randomSeed + 1 })
  }
];

const itemRenderer = ({
  item,
  timelineContext,
  itemContext,
  getItemProps,
  getResizeProps
}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? "red"
      : item.selectedBgColor
    : item.bgColor;
  const borderColor = itemContext.resizing ? "red" : item.color;
  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor,
          color: item.color,
          borderColor,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 4,
          borderLeftWidth: itemContext.selected ? 3 : 1,
          borderRightWidth: itemContext.selected ? 3 : 1
        }
      })}
    >
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

      <div
        style={{
          height: itemContext.dimensions.height,
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {itemContext.title}
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("201910");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://apiadministrativo.atoscapital.com.br/card/tblogcargadetalhe/eNR59cwLDBMqiSvY6qvasoFFXTZAStWKfVq88zMlZVQVShkOHmEMurHbiYZYyKgAlDEexUxtiiQU7Cy54WMrQlNc0aBAFWtKciZhnCcVdznEIqPoObptiGLh57oA/2/?201=${query}`
      );
      setData(result.data.Registros);

      /*console.log(result.data.Registros);
      console.log(result.data.TotalDeRegistros);
      console.log(result.data.ItensPorPagina);
      console.log(result.data.PaginaAtual);*/

      const empresas = result.data.Registros;
      console.log(empresas);
      const { tbLogCargas } = empresas;
      console.log(tbLogCargas);
      /*const array = result.data.Registros.map((item, i) => 
      console.log(item)
    
      );*/
    };
    fetchData();
  }, [query]);

  /*const [data, setData] = useState([]);

  async function fetchUserData() {
    const response = await fetch(
      "https://apiadministrativo.atoscapital.com.br/card/tblogcargadetalhe/eNR59cwLDBMqiSvY6qvasoFFXTZAStWKfVq88zMlZVQVShkOHmEMurHbiYZYyKgAlDEexUxtiiQU7Cy54WMrQlNc0aBAFWtKciZhnCcVdznEIqPoObptiGLh57oA/2/?201=201910"
    );
    setData(await response.json());
    console.log(data);
  }

  useEffect(async () => {
    const result = await fetch(
      "https://hn.algolia.com/api/v1/search?query=redux"
    );
    setData(result.data);
  }, []);*/

  return (
    <div className="App">
      <div>
        <Fragment>
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <ul>
            {data.map((item, i) => (
              <li key={i}>
                <a href={query}>{item.empresa.ds_fantasia}</a>
              </li>
            ))}
          </ul>
        </Fragment>

        <Timeline
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          lineHeight={40}
          showCursorLine={true}
          groups={groups}
          items={items}
          itemRenderer={itemRenderer}
          defaultTimeStart={moment().add(-6, "hour")}
          defaultTimeEnd={moment().add(6, "hour")}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
