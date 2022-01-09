import React from "react";
import classes from "./Home.module.css";
import Table from "../Table/Table";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "../../services/axios";
import Loader from "../Loader/Loader";
import { Context } from "../Provider";
import Panel from "./Panel";

class Home extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      city: "MUMBAI",
      category: "branch",
      data: [],
      loader: false,
      searchText: "",
      currData: [],
    };
  }

  handleCity = (e) => {
    this.setState({
      city: e.target.value,
    });
    this.loadBanks(e.target.value).then((allBanks) => {
      this.setState({
        data: allBanks,
        currData: allBanks,
      });
      this.excuteQuery(allBanks).then((filterdBanks) => {
        this.setState({
          currData: filterdBanks,
        });
      });
    });
  };

  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  componentDidMount() {
    const { banks } = this.context;
    if (banks.length != 0) {
      console.log(banks);
      console.log("cached");
      this.setState({ data: banks, currData: banks, loader: false });
    } else {
      this.loadBanks(this.state.city).then((allBanks) => {
        this.setState({
          data: allBanks,
          currData: allBanks,
        });
      });
    }
  }

  excuteQuery = (allBanks) => {
    return new Promise((success, reject) => {
      let res = [];
      res = allBanks.filter((obj) => {
        return obj[this.state.category]
          .toUpperCase()
          .includes(this.state.searchText.trim().toUpperCase());
      });
      success(res);
    });
  };

  handleSearch = (e) => {
    if (!e.target.value.length) {
      this.setState({
        currData: this.state.data,
        searchText: "",
      });
    } else {
      this.setState(
        {
          searchText: e.target.value.trim(),
        },
        () => {
          this.excuteQuery(this.state.data).then((filterdBanks) => {
            this.setState({
              currData: filterdBanks,
            });
          });
        }
      );
    }
  };

  loadBanks = async (city) => {
    this.setState({ loader: true });
    const { updateBanks } = this.context;
    return new Promise((success, reject) => {
      console.log("not cached");
      axios
        .get(`/banks?city=${city}`)
        .then((res) => {
          success(res.data);
          updateBanks(res.data);
          this.setState({ loader: false });
        })
        .catch((err) => {
          this.setState({ loader: false });
          reject(err);
        });
    });
  };

  render() {
    const { banks } = this.context;
    return (
      <div className={classes.home}>
        <Panel />
        <Row>
          <Col sm={2}>
            <div className={classes.sidebar}>
              <Link to="/">All banks</Link>
            </div>
          </Col>
          <Col sm={10}>
            <Container>
              <Row className={classes.filters}>
                <Col lg={3}>
                  <div className={classes.city}>
                    <label> City :</label>
                    <select
                      className="form-control"
                      name="city"
                      value={this.city}
                      onChange={this.handleCity}
                    >
                      <option value="MUMBAI">Mumbai</option>
                      <option value="DELHI">Delhi</option>
                      <option value="PUNE">Pune</option>
                      <option value="BANGLORE">Banglore</option>
                      <option value="AHMEDABAD">Ahmedabad</option>
                    </select>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={classes.city}>
                    <label> Category :</label>
                    <select
                      className="form-control"
                      name="category"
                      value={this.state.category}
                      onChange={this.handleCategory}
                    >
                      <option value="ifsc">IFSC Code</option>
                      <option value="branch">Branch</option>
                      <option value="bank_name">Bank Name</option>
                    </select>
                  </div>
                </Col>
                <Col lg={3}>
                  <div>
                    <label> Search :</label>
                    <input
                      className="form-control"
                      type={"text"}
                      value={this.state.searchText}
                      onChange={this.handleSearch}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Loader isloading={this.state.loader}>
                  <Table banks={this.state.currData} />
                </Loader>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
