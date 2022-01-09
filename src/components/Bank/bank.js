import React, { Component } from "react";
import BankVector from "../../assets/bank-img.jpg";
import Panel from "../Home/Panel";
import classes from "./bank.module.css";
import { Context } from "../Provider";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export class bank extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      currBank: {},
    };
  }

  componentDidMount() {
    const { banks } = this.context;
    let ifsc_code = this.props.match.params.ifsc_code;
    console.log(banks);
    let res = banks.filter((bank) => {
      return bank.ifsc == ifsc_code;
    });
    this.setState({
      currBank: res[0],
    });
  }

  render() {
    return (
      <div>
        <Panel />
        <div className={classes.father}>
          <div className={classes.child}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={BankVector}
                className={classes.bankImg}
              />
              <Card.Body>
                <Card.Title>{this.state.currBank.bank_name}</Card.Title>
                <Card.Text>{this.state.currBank.address}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <b>District</b>: {this.state.currBank.district}
                </ListGroupItem>
                <ListGroupItem>
                  <b>State</b>: {this.state.currBank.state}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Branch</b>: {this.state.currBank.branch}
                </ListGroupItem>
                <ListGroupItem>
                  <b>IFSC</b>: {this.state.currBank.ifsc}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default bank;
