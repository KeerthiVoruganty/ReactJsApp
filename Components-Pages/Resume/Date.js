import React from 'react';

const minOffset = 0;
const maxOffset = 60; 

class DatePicker extends React.Component {
  constructor() {
    super();
    
    const thisYear = (new Date()).getFullYear();
    
    this.state = {
      thisYear: thisYear,
      selectedYear: thisYear
    }
  }
  
  onHandleChange = (evt) => {
    // Handle Change Here
    // alert(evt.target.value);
    this.setState({ selectedYear: evt.target.value });
  };

  render() {
    const { thisYear, selectedYear } = this.state;
    const options = [];
    
    options.push(<option value ="Present" style={{fontSize:'15px'}}>Present</option>);
    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option value={year} style={{fontSize:'15px'}}>{year}</option>);
    }
    return (
      <div>
        <select value={this.selectedYear} onChange={this.onHandleChange} style={{fontSize:'15px'}}> 
          {options}
        </select>
      </div>
    );
  }
}

/*
 * Render the above component into the div#app
 */
export default DatePicker;