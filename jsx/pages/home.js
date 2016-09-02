import React from 'react';
import { connect } from "react-redux";

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>React Demo App</h1>
                <form>
                    <input type="text" name="demo"/>
                    <button type="submit">Set</button>
                </form>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(Home);
