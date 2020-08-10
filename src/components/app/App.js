import React from 'react';
import styles from './App.module.scss';
import packages from '../../globals/packages';
import Card from '../card/Card';
import Distributer from '../distributer/Distributer';
import Header from '../header/Header';
import Toast from '../toast/Toast';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.determinePackage = this.determinePackage.bind(this);
    this.clearToast = this.clearToast.bind(this);
    this.state = {
      activeCard: 0,
      pointsDistributed: 0,
      toastMessage: ''
    };
  }

  setActiveCard(name) {
    const packageId = packages.findIndex((pack) => pack.name === name);
    if (packages[packageId]) {
      this.setState({
        activeCard: packageId
      });

      this.pointsWarning(packages[packageId].points, this.state.pointsDistributed);
    }
  }

  determinePackage(points) {
    this.pointsWarning(packages[this.state.activeCard].points, points);

    this.setState({
      pointsDistributed: points
    });
  }

  pointsWarning(packagePoints, distributedPoints) {
    const nextPackage = packages.find((pack) => pack.points > distributedPoints)
    if (packagePoints < distributedPoints) {
      this.setActiveCard(nextPackage.name);
      this.setState({
        toastMessage: `We hebben je pakket aangepast naar "${nextPackage.name}" zodat je genoeg punten hebt om te verdelen.`
      });
      return true;
    }
    return false;
  }

  clearToast() {
    this.setState({
      toastMessage: ''
    });
  }

  render() {
    const cards = packages.map((pack, index) =>
      <Card
        package={pack}
        key={`card-${index}`}
        active={this.state.activeCard === index}
        onCardClick={this.setActiveCard} />
    );
    return (
      <div>
        <Header />
        <div className={styles.app}>
          <div className={styles.packages}>
            { cards }
          </div>
          <Distributer
            points={packages[this.state.activeCard].points}
            packageName={packages[this.state.activeCard].name}
            pointsDistributed={this.state.pointsDistributed}
            onPointsUpdate={this.determinePackage} />
          <Toast message={this.state.toastMessage} onClose={this.clearToast} />
        </div>
      </div>
    );
  }
}

export default App;
