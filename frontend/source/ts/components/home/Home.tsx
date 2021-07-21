import * as React from "react";
import {IHomeProps, IHomeState, IListData} from "../../../../types/components/home/IHome";
import {fetchData} from "../../services/rest";


class Home extends React.Component<IHomeProps, IHomeState>
{
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
       // if( document.getElementsByClassName("mapouter")[0]) {
       //     console.log("mtaaaaaaaaaaaaaaav",document.getElementsByClassName("mapouter")[0])
       //     document.getElementsByClassName("mapouter")[0].addEventListener("click", ()=> {
       //         console.log("haaaaa")
       //     }, false)
       // }

    }

    render(): JSX.Element
    {
      const {list, selectedRestorantIndex} = this.state;

        list

      const sortedList = list ? this.modifyData(list) : null

      console.log("home", this.state, this.props)
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
                       <div className="mapouter"  >
                           <div onClick= {(e) => this.onItemClick(selectedRestorantIndex)}> <button > go to restorant page </button></div>
                           <iframe  src={`${list[selectedRestorantIndex].map_address}`} width="600" height="450"  loading="lazy"></iframe>
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
            // console.log("newdata", modifedData)
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
}

export default Home;
