// export default DateRange;
import React from "react";
import DateRangePicker from "react-daterange-picker";
import "../User/DateRange.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

const today = moment();
class DateRange extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
      value: this.props.value !== null && this.props.value !== undefined ? moment(this.props.value): today,
    };
  }
  
  // reassigns id to the calling control
  componentDidMount(){
    let ele = document.getElementById('cal');
    ele.id = this.props.id;
  }

  onSelect = (value, states) => {
    // value = value.format("DD/MM/YYYY")
    this.setState({ value, states });
    // console.log("-----------" + this.state.valuec+ "--state---" + states + "---value--"+ value);
    this.onToggle();
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // User for date range
  renderSelectionValue = () => {
    return (
      <div>
        {/* <div>Selection</div> */}
        {this.state.value.start.format("DD/MM/YYYY")}
        {" - "}
        {this.state.value.end.format("DD/MM/YYYY")}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          <input
            className="calendar"
            id="cal"
            type="button"
            value={this.state.value.format("DD/MM/YYYY")}
            onClick={this.onToggle}
          />
        </div>

        {this.state.isOpen && (
          <DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            selectionType="single"
            maximumDate={this.props}
          />
        )}
      </div>
    );
  }
}

export default DateRange;
