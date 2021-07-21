import * as React from "react";
import {IHomeProps, IHomeState, IListData} from "../../../../types/components/home/IHome";
import {fetchData} from "../../services/rest";
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


class Home extends React.Component<IHomeProps, IHomeState>
{

    private _map: any = null
    constructor(props: IHomeProps)
    {
        super(props);
        this.state = {
           list: null,
           selectedRestorantIndex: 0
        };

    }


    componentDidMount()
    {
        this.getList();
    }


    componentDidUpdate()
    {
        mapboxgl.accessToken =
            "pk.eyJ1IjoiZ2F5YW5laGFrb2J5YW4iLCJhIjoiY2tyZGV4M2FmNHY3bDJ3bnhuNmRxZzhvbCJ9.nEg9iw04kDVP_-ZLzT2D8Q";
        this._map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.state.list[1].center,
            zoom: 12
        });

        this._map.addControl(new mapboxgl.NavigationControl());

        this._map.on('click',() => {
            this.onItemClick(this.state.selectedRestorantIndex)
        })
    }

    render(): JSX.Element
    {
      const {list, selectedRestorantIndex} = this.state;

        return (
            <div className="home-section">
                <header> Yerevan Restaurants </header>
                {
                    list !== null ? (
                    <div className="restorants-info">
                       <div className="restornats-list">
                            <ol>
                                {
                                    list.map((item, i) => (
                                        <div  key={i} >
                                            <li className={`${item._id === list[selectedRestorantIndex]._id ? "selected" : "" }`} onClick={() => this.updateSelectedRestoran(i)}>
                                                <div> <span>Name: </span>  {item.name}</div>
                                                <div> <span>Address:</span> {item.address}</div>
                                            </li>
                                            <button onClick= {(e) => this.onItemClick(i)}> Go To Restorant page </button>
                                        </div>
                                    ))
                                }
                            </ol>
                       </div>
                        <div className="mapouter" >
                            <div id="map"> </div>
                            <div >
                                <div onClick= {(e) => this.onItemClick(selectedRestorantIndex)}> <button > go to restorant page </button></div>
                                <iframe  src={`${list[selectedRestorantIndex].map_address}`} width="600" height="450"  loading="lazy"></iframe>
                            </div>
                        </div>

                    </div>
                    )  : <div className = "loader" />
                }
            </div>
        );
    }


    private getList = async () =>
    {
        try {
            const list = await fetchData(`${HOST}/list`, "GET");
            const modifedData = this.modifyData(list.data)
              this.setState({
                list: modifedData,
              })
          }
          catch (err) {
            console.log(err);
          }
    };

    private updateSelectedRestoran: (index: number) => void = (index: number): void =>
    {
      this.setState({
          selectedRestorantIndex: index
      }, () => {
          this.updateMapLocation();
      })
    };


    private onItemClick: (index: number) => void = (index: number): void =>
    {
        this.props.history.push(`/${this.state.list[index]._id}`)
    };


    private modifyData: (data: IListData[]) => IListData[] = (data: IListData[]): IListData[] =>
    {
      return   data.sort((a, b) => {
            return b.rate - a.rate;
        });
    };

    private updateMapLocation: () => void = (): void =>
    {
        this._map.center = this.state.list[this.state.selectedRestorantIndex].center
    };

}

export default Home;
