import { useState } from "react";


// Mock data
const mockData=
{"topTenLines":[{"lineName":"13","count":130},{"lineName":"12","count":129},{"lineName":"119","count":72},{"lineName":"1","count":62},{"lineName":"11","count":60},{"lineName":"118","count":54},{"lineName":"10","count":54},{"lineName":"113","count":53},{"lineName":"117","count":42},{"lineName":"112","count":41}],
"busStopList":["00135","00136","00137","00138","00139","00141","00142","00143","00144","00145","00146","00147","00149","00151","00152","00153","00154","00155","00156","00157","00158","00159","00160","00161","00162","00163","00166","00185","00187","00301","00306","00322","00324","00325","00326","00329","00330","00402","00403","00404","00407","00408","00409","00410","00411","00428","00430","00431","00432","00451","00452","00454","00824","00825","00826","00827","00902","00903","00904","00905","00952","00955","01051","02011","02021","02101","02111","02121","02131","02132","02511","02521","02531","02601","02603","02611","02621","02631","02641","02651","02701","02704","02711","02721","02731","02741","02751","02761","02763","02771","02781","00128","00135","00136","00137","00138","00139","00141","00142","00143","00144","00145","00146","00147","00149","00151","00152","00153","00154","00155","00156","00157","00158","00159","00160","00161","00162","00163","00166","00185","00187","00301","00306","00402","00403","00404","00405","00406","00407","00408"]
};

// config
//        const origUrl = "http://localhost:8080/api/demo/mockinfo";
const mockUrl = "/api/demo/mockinfo";
const realUrl = "/api/demo/trafikinfo";
let url = realUrl;
let mocked = true;


// Components

function ButtonFetch(props) {
    return (
    <button onClick={props.onClickFunction} >
        Press to fetch info!
    </button>
    );
}

const LineHead = () => (
    <table className="center">
        <thead>
        <tr>
        <th>Linjenamn: </th>
        <th>Hållplatser</th>
        </tr>
        </thead>
    </table>
)
const LineInfo = (props) => (
    <div>
    <table className="center">
        <tbody>
        <tr>
            <td>Linje:{props.line}: </td>
            <td>Antal:{props.busStops}</td>
        </tr>
        </tbody>
    </table>
    </div>
);

const BusStopInfo = (props) => (
    <div>
        Hållplats: {props.busStop}
    </div>
);

function TopTenList  (props)  {
    console.log('top ten list:', props.lines);
    const list = props.lines;
    let keyCount=0;

    return (
        <>
            Top tio busslinjer:
            <LineHead ></LineHead>
            <div>
                {list.map(lineData => <LineInfo key={++keyCount} line={lineData.lineName} busStops={lineData.count} />) }
            </div>
        </>
    )
};

function  BusStopList(props)  {
    let keyCount=1;
    console.log('busStops list:',props.stops);
    return (
    <div>
        Största Linjens Busshållplatser:
        {props.stops.map(lineData => <BusStopInfo key={keyCount++} busStop={lineData} />) }
    </div>
    )
};

function TrafikInfo(props) {
    return (
    <div>
        <br/>
        <TopTenList lines={props.trafficLines} ></TopTenList>
        <br/>
        <br/>
        <BusStopList stops={props.busStops} ></BusStopList>

    </div>
    );
}

function TrafikLab() {
    const [dataLines, setDataLines] = useState([]);
    const [dataStops, setDataStops] = useState([]);
    const [mocked, setMocked] = useState(false);

    const fetchInfoMock = () => {
        console.log('setting mock info...');
        setDataLines(mockData.topTenLines);
        setDataStops(mockData.busStopList);
    };

    const fetchInfo = async () => {
        console.log('fetching trafic info...');
        setDataLines([]);
        setDataStops([]);

        const response = await fetch(mocked ? mockUrl : realUrl);
        console.log('response given:', response);
        var data = await response.json()
        .then((data) => {
            console.log('resp data:', data);
            if(response.status == 200) {
                setDataLines(data.topTenLines);
                setDataStops(data.busStopList);
            }
        })
        .catch((reason) => console.log('error:',reason));
    };

    return (
        <div>
        <label className="container">Mocked call
            <input type="checkbox" checked={mocked} onChange={()=> setMocked(!mocked)} />
            <span className="checkmark"></span>
        </label>

        <ButtonFetch onClickFunction={fetchInfo}></ButtonFetch>
        <TrafikInfo trafficLines={dataLines} busStops={dataStops} ></TrafikInfo>
        </div>
    );
}
export default TrafikLab;